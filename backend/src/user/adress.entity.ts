import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Adress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public street: string;

  @Column()
  public city: string;

  @Column()
  public country: string;

  @OneToOne(() => User, (user: User) => user.adress)
  public user: User;
}
