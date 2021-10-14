import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TableTemplate } from './table-template.entity';

@Entity()
export class TableColTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TableTemplate, (table) => table.tableCols)
  template: TableTemplate;

  @Column({ nullable: true, default: '' })
  col: string;

  @Column({ nullable: true, default: '' })
  color: string;

  @Column({ nullable: true, default: '' })
  width: string;
}
