import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Account extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  devotionPoints: number;
}
