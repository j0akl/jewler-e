import { Field, Float, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Item extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  brand!: string; // maybe this should be its own type as well

  @Field(() => Float)
  @Column()
  price!: number;

  @Field(() => User)
  @OneToMany(() => User, (user) => user.items)
  owner!: User;

  @Field(() => String)
  @Column()
  model!: String;

  @Field(() => String)
  @Column()
  refNumber: string; // not sure if string or int, depends on brand probably

  @Field(() => String)
  @Column() // does this have to be unique? what if an item is sold then sold again?
  serial: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
