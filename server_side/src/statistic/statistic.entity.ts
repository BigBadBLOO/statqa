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

  @Column({ nullable: false, default: false })
  in_archive: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  date_start_in_archive: Date;

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

  @OneToMany(() => StatisticAccessForUsers, (user) => user.statistic)
  accessForUsers: StatisticAccessForUsers[]
}

@Entity()
export class StatisticAccessForUsers {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Campaign, (campaign) => campaign.statistic)
  campaigns: Campaign[];

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Statistic, { onDelete: 'CASCADE' })
  statistic: Statistic;
}