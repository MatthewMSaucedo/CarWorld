import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ChildEntity } from "typeorm"
import { Commodity } from "./commodity"

@ChildEntity()
export class StoreItem extends Commodity {

  @Column()
  imageUrl: string

  @Column()
  description: string
}
