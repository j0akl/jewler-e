// this file is pretty basic for now, will handle cacheing later
// config for the client that communicates with the server
export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:8000/graphql", // TODO: should be process var in prod
  fetchOptions: { credentials: "include" as const },
  ssrExchange,
});
