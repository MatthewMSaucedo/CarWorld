import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Transaction extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: TransactionType

  @Column()
  state: TransactionState

  @Column()
  addressId: number

  @Column()
  accountId: number
}

export enum TransactionType {
  Ticket,
  StoreItem,
  DevotionPoints
}

export enum TransactionState {
  Succeeded,
  Pending,
  Failed
}
