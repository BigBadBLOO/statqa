import {Campaign} from "../campaign.entity";
import {User} from "../../user/user.entity";

export class SaveStatisticDto {
  name: string;
  description: string;
  tags: string
  conversion: number;
  campaigns: Campaign[];
  user: User;
  accessForUsers: User[]
}