import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, TableInheritance } from "typeorm"

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Commodity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  price: number

  @Column()
  stock: number
}

export enum TransactionState {
  Succeeded,
  Pending,
  Failed
}
