import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";

export enum NotificationType {
  PAYMENT= 'PAYMENT',
  TARIFF= 'TARIFF',
  ACCESS_TO_STATISTIC = 'ACCESS_TO_STATISTIC',
  INTEGRATION_ERROR = 'INTEGRATION_ERROR',
  REGISTRATION = 'REGISTRATION'
}

@Entity()
export class Notifications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  title: string;

  @Column({ default: '' })
  text: string;

  @Column({ default: false })
  isRead: boolean;

  @Column({
    type: 'enum',
    enum: NotificationType,
    default: NotificationType.PAYMENT,
  })
  type: NotificationType;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

}