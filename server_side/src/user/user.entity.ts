//core
import {
  Column,
  Entity,
  Index, ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {Statistic, StatisticAccessForUsers} from "../statistic/statistic.entity";

export enum Tariff {
  FREE= 'FREE',
  PAID= 'PAID'
}
@Entity()
@Index(['email'], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: '' })
  username: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: false, default: '' })
  email: string;

  @Column({ nullable: false, default: '' })
  password: string;

  @Column({ default: false })
  isConfirmEmail: boolean;

  @Column({ default: false })
  twoAuth: boolean;

  @Column({ default: 0 })
  balance: number;

  @Column({ default: true })
  status: boolean;

  @Column({
    type: 'enum',
    enum: Tariff,
    default: Tariff.FREE,
  })
  tariff: Tariff;

  @Column({ type: 'timestamptz', nullable: true })
  date_tariff_end: Date;

  @OneToMany(() => Statistic, (user) => user.user)
  statistics: Statistic[];

  @OneToMany(() => StatisticAccessForUsers, (user) => user.user)
  accessToStatistic: StatisticAccessForUsers[]
}

export class UserWithToken extends User {
  token: string;
}
