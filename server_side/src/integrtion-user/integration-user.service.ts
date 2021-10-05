//core
import {HttpService, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Any, Repository} from "typeorm";

//entity
import {IntegrationUser} from "./integration-user.entity";
import {IntegrationApp} from "../integration-app/integration-app.entity";
import {IntegrationCabinet} from "../integrtion-cabinet/integration-cabinet.entity";

//external service
import Facebook from "../external-service/Facebook";
import FactoryService from "../external-service/factoryService";

//dto
import {DeleteUsersAndCabinetsDto} from "./dto/delete-users-and-cabinets.dto";

@Injectable()
export class IntegrationUserService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(IntegrationApp)
    private appRepository: Repository<IntegrationApp>,
    @InjectRepository(IntegrationUser)
    private integrationUserRepository: Repository<IntegrationUser>,
    @InjectRepository(IntegrationCabinet)
    private integrationCabinetRepository: Repository<IntegrationCabinet>,
  ) {
  }

  async getIntegrationUsers(user_id: number): Promise<IntegrationUser[]> {
    return await this.integrationUserRepository.find({
      where: {
        user: {id: user_id},
      },
      relations: ['app', 'cabinets'],
    });
  }

  async getStatusAccounts(body: number[]): Promise<{ [key: number]: boolean }> {
    const result = {};
    const users = await this.integrationUserRepository.find({
      where: {
        id: Any(body),
      },
      relations: ['app', 'cabinets'],
    });
    const factory = new FactoryService(this.httpService);
    for(let i =0; i < users.length; i++) {
      const user = users[i]
      const service = factory.getService(user);
      result[user.id] = await service.statusAccount()
    }
    return result
  }

  async addIntegrationAccount(
    uid: string,
    name: string,
    token: string,
    app_id: number,
    user_id: number,
  ): Promise<IntegrationUser> {
    const exists_token = await this.integrationUserRepository.findOne({
      where: { token },
      relations: ['user'],
    });
    if (exists_token) {
      throw new Error(
        `Аккаунт с таким токеном интегрирован у пользователя ${exists_token.user.username}`,
      );
    }
    const account = new IntegrationUser();
    account.uid = uid ? uid : '';
    account.name = name;
    account.token = token;
    account.token_date_update = new Date();
    // account.user = {
    //   id: user_id
    // };
    // account.app = {
    //   id: app_id
    // };
    return await this.integrationUserRepository.save(account);
  }

  async loginFB(user_id: number, token: string): Promise<IntegrationUser | Message> {
    const fb = new Facebook(null, this.httpService);
    return  await fb.loginFB(user_id, token, this.appRepository, this.integrationUserRepository);
  }

  async deleteUserAndCabinet(data: DeleteUsersAndCabinetsDto[]): Promise<Message> {
    const user_ids = data.filter(row => row.type === 'user').map(row => row.id)
    const cabinet_ids = data.filter(row => row.type === 'cabinet').map(row => row.id)

    if(user_ids.length > 0) await this.integrationUserRepository.delete(user_ids)
    if(cabinet_ids.length > 0) await this.integrationCabinetRepository.delete(cabinet_ids)

    return  {
      type: 'success',
      message: 'Данные успешно удалены'
    }
  }
}
