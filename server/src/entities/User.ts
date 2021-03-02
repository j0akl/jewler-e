import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Item } from "./Item";

// this file defines the fields of the user type
// @ObjectType is for graphql, @Entity is for communication
// with the database through the orm
// each field follows the format:
// @Field(() -> T) - only if you want to expose the field to client,
// @Column(options)  notice how the password column doesnt have a field
@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ length: 30, unique: true }) // usernames less than 30 chars, should probably be lower
  username!: string;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  // make sure to encrypt the password on creation and login
  @Column()
  password!: string;

  @Field(() => [Item], { nullable: true })
  @OneToMany(() => Item, (item) => item.owner, { cascade: true })
  items: Item[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;
}
