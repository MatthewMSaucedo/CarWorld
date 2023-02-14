import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BaseEntity } from "typeorm"
import { Account } from "./account"
import { Address } from "./address"
import { Commodity } from "./commodity"

@Entity()
export class Transaction extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Commodity)
  @JoinColumn()
  commodity: Commodity

  @Column()
  state: TransactionState

  @OneToOne(() => Address)
  @JoinColumn()
  addressId: number

  @OneToOne(() => Account)
  @JoinColumn()
  accountId: number

  // unique guest token, attribute
  @Column()
  guestToken: string

  @Column()
  miscJson: string
}

// Subclasses of Commodity
export enum CommodityType {
  Ticket,
  StoreItem,
  DevotionPoint
}

export enum TransactionState {
  Shipped,
  Paid,
  Pending,
  Failed
}

// NOTE: I don't think we need this - probably all in same table
//       Need to lookup implications of that on -- empty cols of subclasses?
// @Column()
// commodityType: CommodityType
