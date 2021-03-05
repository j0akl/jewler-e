import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  item: ItemResponse;
  meSeller?: Maybe<Seller>;
  seller: SellerResponse;
  meBuyer?: Maybe<Buyer>;
  buyer: BuyerResponse;
  buyerByUsername: BuyerResponse;
};


export type QueryItemArgs = {
  id: Scalars['String'];
};


export type QuerySellerArgs = {
  id: Scalars['String'];
};


export type QueryBuyerArgs = {
  id: Scalars['String'];
};


export type QueryBuyerByUsernameArgs = {
  username: Scalars['String'];
};

export type ItemResponse = {
  __typename?: 'ItemResponse';
  errors?: Maybe<Array<FieldError>>;
  item?: Maybe<Item>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Item = IBase & {
  __typename?: 'Item';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  displayName: Scalars['String'];
  description: Scalars['String'];
  brand: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Int'];
  seller: Seller;
  model: Scalars['String'];
  condition: Scalars['String'];
  refNumber: Scalars['String'];
  serial: Scalars['String'];
};

export type IBase = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Seller = IUser & IBase & {
  __typename?: 'Seller';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  items?: Maybe<Array<Item>>;
};

export type IUser = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type SellerResponse = {
  __typename?: 'SellerResponse';
  errors?: Maybe<Array<FieldError>>;
  seller?: Maybe<Seller>;
};

export type Buyer = IUser & IBase & {
  __typename?: 'Buyer';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type BuyerResponse = {
  __typename?: 'BuyerResponse';
  errors?: Maybe<Array<FieldError>>;
  buyer?: Maybe<Buyer>;
};

export type Mutation = {
  __typename?: 'Mutation';
  postItem: ItemResponse;
  registerSeller: SellerResponse;
  loginSeller: SellerResponse;
  logoutSeller: Scalars['Boolean'];
  registerBuyer: BuyerResponse;
  loginBuyer: BuyerResponse;
  logoutBuyer: Scalars['Boolean'];
};


export type MutationPostItemArgs = {
  inputs: PostItemInput;
};


export type MutationRegisterSellerArgs = {
  inputs: RegisterInput;
};


export type MutationLoginSellerArgs = {
  inputs: LoginInput;
};


export type MutationRegisterBuyerArgs = {
  inputs: RegisterInput;
};


export type MutationLoginBuyerArgs = {
  inputs: LoginInput;
};

export type PostItemInput = {
  displayName: Scalars['String'];
  description: Scalars['String'];
  condition: Scalars['String'];
  price: Scalars['Float'];
  quantity: Scalars['Int'];
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
  rememberMe: Scalars['Boolean'];
};

export type RegularBuyerFragment = (
  { __typename?: 'Buyer' }
  & Pick<Buyer, 'id' | 'username' | 'createdAt' | 'updatedAt'>
);

export type RegularBuyerResponseFragment = (
  { __typename?: 'BuyerResponse' }
  & { buyer?: Maybe<(
    { __typename?: 'Buyer' }
    & RegularBuyerFragment
  )>, errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>> }
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularItemFragment = (
  { __typename?: 'Item' }
  & Pick<Item, 'id' | 'displayName' | 'price' | 'createdAt' | 'updatedAt'>
  & { seller: (
    { __typename?: 'Seller' }
    & RegularSellerFragment
  ) }
);

export type RegularItemResponseFragment = (
  { __typename?: 'ItemResponse' }
  & { item?: Maybe<(
    { __typename?: 'Item' }
    & RegularItemFragment
  )>, errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>> }
);

export type RegularSellerFragment = (
  { __typename?: 'Seller' }
  & Pick<Seller, 'id' | 'name' | 'createdAt' | 'updatedAt'>
  & { items?: Maybe<Array<(
    { __typename?: 'Item' }
    & Pick<Item, 'id'>
  )>> }
);

export type RegularSellerResponseFragment = (
  { __typename?: 'SellerResponse' }
  & { seller?: Maybe<(
    { __typename?: 'Seller' }
    & RegularSellerFragment
  )>, errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>> }
);

export type LoginBuyerMutationVariables = Exact<{
  inputs: LoginInput;
}>;


export type LoginBuyerMutation = (
  { __typename?: 'Mutation' }
  & { loginBuyer: (
    { __typename?: 'BuyerResponse' }
    & RegularBuyerResponseFragment
  ) }
);

export type LogoutBuyerMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutBuyerMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logoutBuyer'>
);

export type PostItemMutationVariables = Exact<{
  inputs: PostItemInput;
}>;


export type PostItemMutation = (
  { __typename?: 'Mutation' }
  & { postItem: (
    { __typename?: 'ItemResponse' }
    & RegularItemResponseFragment
  ) }
);

export type RegisterBuyerMutationVariables = Exact<{
  inputs: RegisterInput;
}>;


export type RegisterBuyerMutation = (
  { __typename?: 'Mutation' }
  & { registerBuyer: (
    { __typename?: 'BuyerResponse' }
    & RegularBuyerResponseFragment
  ) }
);

export type MeBuyerQueryVariables = Exact<{ [key: string]: never; }>;


export type MeBuyerQuery = (
  { __typename?: 'Query' }
  & { meBuyer?: Maybe<(
    { __typename?: 'Buyer' }
    & RegularBuyerFragment
  )> }
);

export const RegularBuyerFragmentDoc = gql`
    fragment RegularBuyer on Buyer {
  id
  username
  createdAt
  updatedAt
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularBuyerResponseFragmentDoc = gql`
    fragment RegularBuyerResponse on BuyerResponse {
  buyer {
    ...RegularBuyer
  }
  errors {
    ...RegularError
  }
}
    ${RegularBuyerFragmentDoc}
${RegularErrorFragmentDoc}`;
export const RegularSellerFragmentDoc = gql`
    fragment RegularSeller on Seller {
  id
  name
  items {
    id
  }
  createdAt
  updatedAt
}
    `;
export const RegularItemFragmentDoc = gql`
    fragment RegularItem on Item {
  id
  displayName
  price
  seller {
    ...RegularSeller
  }
  createdAt
  updatedAt
}
    ${RegularSellerFragmentDoc}`;
export const RegularItemResponseFragmentDoc = gql`
    fragment RegularItemResponse on ItemResponse {
  item {
    ...RegularItem
  }
  errors {
    ...RegularError
  }
}
    ${RegularItemFragmentDoc}
${RegularErrorFragmentDoc}`;
export const RegularSellerResponseFragmentDoc = gql`
    fragment RegularSellerResponse on SellerResponse {
  seller {
    ...RegularSeller
  }
  errors {
    ...RegularError
  }
}
    ${RegularSellerFragmentDoc}
${RegularErrorFragmentDoc}`;
export const LoginBuyerDocument = gql`
    mutation LoginBuyer($inputs: LoginInput!) {
  loginBuyer(inputs: $inputs) {
    ...RegularBuyerResponse
  }
}
    ${RegularBuyerResponseFragmentDoc}`;

export function useLoginBuyerMutation() {
  return Urql.useMutation<LoginBuyerMutation, LoginBuyerMutationVariables>(LoginBuyerDocument);
};
export const LogoutBuyerDocument = gql`
    mutation LogoutBuyer {
  logoutBuyer
}
    `;

export function useLogoutBuyerMutation() {
  return Urql.useMutation<LogoutBuyerMutation, LogoutBuyerMutationVariables>(LogoutBuyerDocument);
};
export const PostItemDocument = gql`
    mutation PostItem($inputs: PostItemInput!) {
  postItem(inputs: $inputs) {
    ...RegularItemResponse
  }
}
    ${RegularItemResponseFragmentDoc}`;

export function usePostItemMutation() {
  return Urql.useMutation<PostItemMutation, PostItemMutationVariables>(PostItemDocument);
};
export const RegisterBuyerDocument = gql`
    mutation RegisterBuyer($inputs: RegisterInput!) {
  registerBuyer(inputs: $inputs) {
    ...RegularBuyerResponse
  }
}
    ${RegularBuyerResponseFragmentDoc}`;

export function useRegisterBuyerMutation() {
  return Urql.useMutation<RegisterBuyerMutation, RegisterBuyerMutationVariables>(RegisterBuyerDocument);
};
export const MeBuyerDocument = gql`
    query MeBuyer {
  meBuyer {
    ...RegularBuyer
  }
}
    ${RegularBuyerFragmentDoc}`;

export function useMeBuyerQuery(options: Omit<Urql.UseQueryArgs<MeBuyerQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeBuyerQuery>({ query: MeBuyerDocument, ...options });
};