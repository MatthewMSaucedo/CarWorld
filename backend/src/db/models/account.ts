import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Account extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  type: AccountType

  // salt & peppered
  @Column()
  password: string

  @Column()
  salt: string

  @Column()
  devotionPoints: number
}

export enum AccountType {
  Standard,
  Admin,
  TicketTaker // Rendy validation against list?
}
