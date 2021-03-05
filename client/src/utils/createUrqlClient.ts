import { cacheExchange } from "@urql/exchange-graphcache";
import { dedupExchange, Exchange, fetchExchange } from "urql";
import { pipe, tap } from "wonka";
import {
  LoginBuyerMutation,
  LogoutBuyerMutation,
  MeBuyerDocument,
  MeBuyerQuery,
  RegisterBuyerMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import Router from "next/router";

export const errorExchange: Exchange = ({ forward }) => (ops$) => {
  return pipe(
    forward(ops$),
    tap(({ error }) => {
      if (error?.message.includes("not authenticated")) {
        Router.replace("/register");
      }
    })
  );
};

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:8000/graphql", // TODO: should be process var in prod
  fetchOptions: { credentials: "include" as const },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        Mutation: {
          logoutBuyer: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutBuyerMutation, MeBuyerQuery>(
              cache,
              { query: MeBuyerDocument },
              _result,
              () => ({ meBuyer: null })
            );
          },
          loginBuyer: (_result, args, cache, info) => {
            betterUpdateQuery<LoginBuyerMutation, MeBuyerQuery>(
              cache,
              { query: MeBuyerDocument },
              _result,
              (result, query) => {
                if (result.loginBuyer.errors) {
                  return query;
                } else {
                  return {
                    meBuyer: result.loginBuyer.buyer,
                  };
                }
              }
            );
          },
          registerBuyer: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterBuyerMutation, MeBuyerQuery>(
              cache,
              { query: MeBuyerDocument },
              _result,
              (result, query) => {
                if (result.registerBuyer.errors) {
                  return query;
                } else {
                  return {
                    meBuyer: result.registerBuyer.buyer,
                  };
                }
              }
            );
          },
        },
      },
    }),
    errorExchange,
    ssrExchange,
    fetchExchange,
  ],
});
