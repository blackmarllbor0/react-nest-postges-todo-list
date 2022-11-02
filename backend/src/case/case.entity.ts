import { Category } from 'src/category/category.entity';
import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cases')
export class Case {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @Column()
  public description: string;

  @ManyToOne(() => User, (author: User) => author.cases)
  public author: User;

  @ManyToMany(() => Category, (category: Category) => category.cases)
  @JoinTable()
  public category: Category[];
}
