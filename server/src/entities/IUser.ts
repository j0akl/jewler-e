import { IBase } from "./Base";
import { Field, InterfaceType } from "type-graphql";
import { Column } from "typeorm";

@InterfaceType({ implements: IBase })
export abstract class IUser extends IBase {
  @Field(() => String)
  @Column({ length: 30, unique: true })
  username!: string;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;
}
