import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TableColTemplate } from './table-col-template.entity';
import {User} from "../user/user.entity";


@Entity()
export class TableTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: '' })
  name: string;

  @Column({ nullable: true, default: '' })
  table: string;

  @ManyToOne(() => User)
  user: User;

  @Column({ nullable: true, default: false })
  selected: boolean;

  @OneToMany(() => TableColTemplate, (col) => col.template, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  tableCols: TableColTemplate[];
}
