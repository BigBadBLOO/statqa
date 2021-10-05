import AbstractService from './abstractService';
import {IntegrationUser} from "../integrtion-user/integration-user.entity";
import {User} from "../user/user.entity";

type TypeUserFBResponse = {
  id: string;
  name: string;
};

export default class Facebook extends AbstractService {
  constructor(account, httpService) {
    super(account, httpService);
  }
  async statusAccount(): Promise<boolean> {
    let status = false;
    try{
      const url = `https://graph.facebook.com/v${this.account.app.version}/${this.account.uid}?access_token=${this.account.token}`;
      const resp: any = await this.httpService.get(url).toPromise()
      if (!resp.data.error) status = true;
      return status;
    }catch (e) {
      return false
    }

  }

  async loginFB(user_id: number, token: string, appRepository, integrationUserRepository): Promise<IntegrationUser | Message> {
    const app_fb = await appRepository.findOne({
      where: { name: 'Facebook' },
    });
    try {
      const url_access_token = `https://graph.facebook.com/v${app_fb.version}/oauth/access_token?grant_type=fb_exchange_token&client_id=${app_fb.uid}&client_secret=${app_fb.key}&fb_exchange_token=${token}`;
      const response = await this.httpService.get(url_access_token).toPromise();
      const access_token = response.data['access_token'];
      const url = `https://graph.facebook.com/v${app_fb.version}/me?fields=name,id&access_token=${access_token}`;
      const answer = await this.httpService.get(url).toPromise();
      const user_response: TypeUserFBResponse = answer.data;
      const account_fb = await integrationUserRepository.findOne({
        where: {
          uid: user_response.id,
        },
      });
      let answer_user;
      if (account_fb) {
        if (account_fb.token === access_token) {
          return {
            type: 'error',
            message: 'Токен не требует замены, обновите токен позже'
          };
        } else {
          account_fb.name = user_response.name;
          account_fb.token = access_token;
          account_fb.token_date_update = new Date();
          answer_user = await integrationUserRepository.save(account_fb);
        }
      } else {
        const save_user = new IntegrationUser();
        save_user.uid = user_response.id;
        save_user.name = user_response.name;
        save_user.token = access_token;
        save_user.token_date_update = new Date();
        save_user.app = app_fb;
        const temp_user = new User();
        temp_user.id = user_id;
        save_user.user = temp_user;
        answer_user = await integrationUserRepository.save(save_user);
      }
      return answer_user;
    } catch {
      return {
        type: 'error',
        message: 'Не удалось установить соединение с Facebook'
      }
    }
  }

  async getCampaignsId(){
    let result = [];
    const url = `https://graph.facebook.com/v${this.account.app.version}/${this.account.uid}?` + new URLSearchParams({
      access_token: this.account.token,
      fields: 'adaccounts{campaigns{id,name}}',

    });

    const resp: any = await this.httpService.get(url).toPromise()

    if(resp.data.error) return result;
    const adaccounts = resp.data.adaccounts.data
    adaccounts.forEach(adaccount => {

      if(adaccount.campaigns){
        const campaigns = adaccount.campaigns.data
        campaigns.forEach(campaign => {
          result.push({
            type: this.account.app.name,
            uid: campaign.id,
            name: campaign.name
          })
        })

      }
    })
    return result
  }
}
