import { Int, Field, Float, ObjectType } from "type-graphql";
import { JoinColumn, Column, Entity, ManyToOne } from "typeorm";
import { IBase } from "./Base";
import { Seller } from "./Seller";

@ObjectType({ implements: IBase })
@Entity()
export class Item extends IBase {
  @Field(() => String)
  @Column()
  displayName!: string;

  @Field(() => String)
  @Column({ length: 1000 })
  description!: string;

  @Field(() => String)
  @Column({ nullable: true })
  brand?: string; // maybe this should be its own type as well

  @Field(() => Float)
  @Column()
  price!: number;

  @Field(() => Int)
  @Column()
  quantity!: number;

  @Field(() => Seller)
  @ManyToOne(() => Seller, (seller) => seller.items)
  @JoinColumn()
  seller!: Seller;

  @Field(() => String)
  @Column({ nullable: true })
  model?: String;

  @Field(() => String)
  @Column()
  condition!: string; // TODO: enum type later

  @Field(() => String)
  @Column({ nullable: true }) // TODO: change later
  refNumber?: string; // not sure if string or int, depends on brand probably

  @Field(() => String)
  @Column({ nullable: true }) // does this have to be unique?
  serial?: string;
}
