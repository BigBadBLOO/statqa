import {HttpService} from "@nestjs/common";
import {IntegrationUser} from "../integrtion-user/integration-user.entity";
import {Campaign} from "../statistic/campaign.entity";


export default abstract class AbstractService {
  account: IntegrationUser;
  httpService: HttpService
  protected constructor(account, httpService) {
    this.httpService = httpService
    this.account = account;
  }
  async statusAccount(): Promise<boolean> {
    throw new Error('implement this method');
  }

  async getCampaignsId(): Promise<Campaign[]> {
    throw new Error('implement this method');
  }
}
