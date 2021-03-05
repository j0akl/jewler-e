import { Seller } from "../entities/Seller";
import { Item } from "../entities/Item";
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
import FieldError from "./shared/types/FieldError";
import { isAuth } from "../middleware/isAuth";
import { isSeller } from "../middleware/isSeller";

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
  displayName!: string;

  @Field(() => String)
  description!: string;

  @Field(() => String)
  condition!: string;

  @Field(() => Float)
  price!: number;

  @Field(() => Int)
  quantity!: number;
}

@Resolver(Item)
export class ItemResolver {
  @Query(() => ItemResponse)
  async item(@Arg("id", () => String) id: string): Promise<ItemResponse> {
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
  @UseMiddleware(isAuth, isSeller)
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

    const seller = await Seller.findOne({ id: req.session.userId });
    if (!req.session.userId || !seller) {
      return {
        errors: [
          {
            field: "seller",
            message: "error getting user",
          },
        ],
      };
    }

    if (inputs.quantity < 1) {
      return {
        errors: [
          {
            field: "quantity",
            message: "quantity cannot be less than 1",
          },
        ],
      };
    }

    const connection = getConnection();
    const itemRepository = connection.getRepository(Item);
    let item = itemRepository.create({ ...inputs, seller });
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
