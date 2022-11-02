import { Exclude } from 'class-transformer';
import { Case } from 'src/case/case.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Adress } from './adress.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Exclude()
  @Column()
  public password: string;

  @OneToOne(() => Adress, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public adress: Adress;

  @OneToMany(() => Case, (post: Case) => post.author)
  public cases: Case[];
}
