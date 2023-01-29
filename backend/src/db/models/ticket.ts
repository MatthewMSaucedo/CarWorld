import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ChildEntity } from "typeorm"
import { Commodity } from "./commodity"

@ChildEntity()
export class Ticket extends Commodity {

  @Column()
  event: string
}
