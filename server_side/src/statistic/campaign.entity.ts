import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Statistic} from "./statistic.entity";

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  uid: string;

  @Column({ nullable: true, default: '' })
  name: string;

  @ManyToOne(() => Statistic)
  statistic: Statistic;

  @Column({ default: '' })
  type: 'Facebook' | 'Вконтакте'
}