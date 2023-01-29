import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Transaction extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  commodityId: number

  // I don't think we need this - probably all in same table
  // Need to lookup implications of that on -- empty cols of subclasses?
  // @Column()
  // commodityType: CommodityType

  @Column()
  state: TransactionState

  @Column()
  addressId: number

  @Column()
  accountId: number
}

// Subclasses of Commodity
export enum CommodityType {
  Ticket,
  StoreItem,
  DevotionPoint
}

export enum TransactionState {
  Succeeded,
  Pending,
  Failed
}
