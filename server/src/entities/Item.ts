import { Field, Float, Int, ObjectType } from "type-graphql";
import {
  JoinColumn,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Item extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  brand: string; // maybe this should be its own type as well

  @Field(() => Float)
  @Column()
  price: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.items)
  @JoinColumn()
  owner: User;

  @Field(() => String)
  @Column()
  model: String;

  @Field(() => String)
  @Column()
  condition: string; // enum type later

  @Field(() => String)
  @Column({ nullable: true }) // change later
  refNumber: string; // not sure if string or int, depends on brand probably

  @Field(() => String)
  @Column({ nullable: true }) // does this have to be unique? what if an item is sold then sold again?
  serial: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
