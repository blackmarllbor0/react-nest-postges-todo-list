import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cases')
export class Case {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public name: string;

  @Column()
  public description: string;
}
