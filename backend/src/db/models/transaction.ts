import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Transaction extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  commodityId: number
  // @Column()
  // type: TransactionType

  @Column()
  state: TransactionState

  @Column()
  addressId: number

  @Column()
  accountId: number
}

// replace this concept with generic Commodity class
// each of these would extend that -- this makes sense I think
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
