import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {IntegrationApp} from "../integration-app/integration-app.entity";
import {User} from "../user/user.entity";

@Entity()
export class IntegrationUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: '' })
  uid: string;

  @Column({ nullable: true, default: '' })
  name: string;

  @Column({ nullable: true, default: '' })
  token: string;

  @Column({ nullable: true, default: '' })
  comment: string;

  @ManyToOne(() => IntegrationApp)
  app: IntegrationApp;

  @Column({ type: 'timestamptz' })
  token_date_update: Date;

  @ManyToOne(() => User)
  user: User;
}
