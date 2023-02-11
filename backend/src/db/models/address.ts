import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"
import { Account } from "./account"

@Entity()
export class Address extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Account)
  @JoinColumn()
  accountId: number // optional, empty for guests

  @Column()
  name: string

  @Column()
  line1: string

  @Column()
  line2: string // optional

  @Column()
  zip: string

  @Column()
  city: string

  @Column()
  state: string
}
