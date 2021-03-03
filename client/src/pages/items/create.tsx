import React from "react";
import {isAuth} from "src/utils/isAuth";
import {usePostItemMutation} from "src/generated/graphql";

interface NewItemProps {}

export const NewItem: React.FC<NewItemProps> = ({}) => {
  isAuth();

  const [, postItem] = usePostItemMutation();

  return (

  )
};
