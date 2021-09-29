//core
import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}

export class UserWithToken extends User {
  token: string;
}
