import { IUser } from "./IUser";
import { IBase } from "./Base";
import { Item } from "./Item";
import { Field, ObjectType } from "type-graphql";
import { OneToMany, Entity, Column } from "typeorm";

@ObjectType({ implements: [IUser, IBase] })
@Entity()
export class Seller extends IUser {
  @Field(() => String, { nullable: true })
  @Column({ nullable: true }) // TODO probably shouldnt be nullable for stores
  name?: String;

  @Field(() => [Item], { nullable: true })
  @OneToMany(() => Item, (item) => item.seller, { cascade: true })
  items: Item[];
}
