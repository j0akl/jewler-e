import { IUser } from "./IUser";
import { IBase } from "./Base";
import { Field, ObjectType } from "type-graphql";
import { Entity, Column } from "typeorm";

@ObjectType({ implements: [IUser, IBase] })
@Entity()
export class Buyer extends IUser {
  @Field(() => String, { nullable: true })
  @Column({ nullable: true }) // TODO: probably shouldnt be nullable
  firstName: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  lastName: string;
}
