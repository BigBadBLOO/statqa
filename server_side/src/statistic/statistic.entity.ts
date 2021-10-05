import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";
import {Campaign} from "./campaign.entity";

@Entity()
export class Statistic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ nullable: true, default: '' })
  description: string;

  @Column({ nullable: true, default: '' })
  avatar: string;

  @Column({ nullable: true, default: '' })
  tags: string;

  @Column({ nullable: true })
  conversion: number;

  @OneToMany(() => Campaign, (campaign) => campaign.statistic)
  campaigns: Campaign[];

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => User, (user) => user.accessToStatistic)
  accessForUsers: User[]
}