import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";
import {IntegrationApp} from "../integration-app/integration-app.entity";

@Entity()
export class StatisticRow{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz', nullable: true })
  date: Date;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  app: IntegrationApp

  @Column({ default: '-' })
  cabinet: string;

  @Column({ default: '-' })
  campaign: string;

  @Column({ default: '-' })
  adset: string;

  @Column({ default: '-' })
  ad: string;

  @Column({ default: '-' })
  client: string;

  @Column({ nullable: true, default: null })
  spend: number;

  @Column({ default: '-' })
  account: string;

  @Column({ nullable: true })
  shows: number;

  @Column({ nullable: true })
  clicks: number;

  @Column({ nullable: true })
  CTR: number;

  @Column({ nullable: true })
  CPC: number;

  @Column({ nullable: true })
  CR: number;

  @Column({ nullable: true })
  CPM: number;

  @Column({ nullable: true })
  conversion: number;

  @Column({ nullable: true })
  conversion_price: number;

  @Column({ nullable: true })
  income: number;

  @Column({ nullable: true })
  profit: number;

  @Column({ nullable: true })
  roi: number;

  @Column({ default: true })
  status: boolean

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
}
