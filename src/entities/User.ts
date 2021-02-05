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

  @Field(() => [Item])
  @OneToMany(() => Item, (item) => item.owner)
  items: Item[];

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
