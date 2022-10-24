import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cases')
export class Case {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;
}
