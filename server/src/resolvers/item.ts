import { Item } from "../entities/Item";
import { User } from "../entities/User";
import { getConnection } from "typeorm";
import {
  UseMiddleware,
  Resolver,
  Field,
  ObjectType,
  Mutation,
  Arg,
  InputType,
  Query,
  Int,
  Float,
  Ctx,
} from "type-graphql";
import { MyContext } from "src/types";
import FieldError from "./FieldError";
import { isAuth } from "../middleware/isAuth";

@ObjectType()
export class ItemResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Item, { nullable: true })
  item?: Item;
}

@InputType()
export class PostItemInput {
  @Field(() => String)
  brand!: string;

  @Field(() => String)
  model!: string;

  @Field(() => String)
  condition!: string;

  @Field(() => Float)
  price!: number;
}

@Resolver(Item)
export class ItemResolver {
  @Query(() => ItemResponse)
  async item(@Arg("id", () => Int) id: number): Promise<ItemResponse> {
    const item = await getConnection()
      .createQueryBuilder(Item, "item")
      .where("item.id = :id", { id })
      .getOne();
    // const item = await Item.findOne(id, { relations: ["owner"] });
    if (!item) {
      return {
        errors: [
          {
            field: "id",
            message: "no item found with that id",
          },
        ],
      };
    } else {
      return { item };
    }
  }

  @Mutation(() => ItemResponse)
  @UseMiddleware(isAuth)
  async postItem(
    @Arg("inputs") inputs: PostItemInput,
    @Ctx() { req }: MyContext
  ): Promise<ItemResponse> {
    // TODO: add field validation for items
    const errors = null; // replace with function
    if (errors) {
      return errors;
    }

    if (!req.session.userId) {
      return {
        errors: [
          {
            field: "user",
            message: "error getting user",
          },
        ],
      };
    }

    const owner = await User.findOne({ id: req.session.userId });
    if (!req.session.userId || !owner) {
      return {
        errors: [
          {
            field: "user",
            message: "error getting user",
          },
        ],
      };
    }

    const connection = getConnection();
    const itemRepository = connection.getRepository(Item);
    let item = itemRepository.create({ ...inputs, owner });
    item = await itemRepository.save(item);

    if (!item) {
      return {
        errors: [
          {
            field: "unknown",
            message: "an error occured in creation",
          },
        ],
      };
    }
    return { item };
  }
}
