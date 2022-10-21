import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('character varying')
  name: string;

  @Column({ unique: true, type: 'character varying' })
  email: string;

  @Column('character varying')
  password: string;
}
