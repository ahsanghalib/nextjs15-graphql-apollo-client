"use client";

import {
  ACCESS_TOKEN_COOKIE,
  GRAPHQL_ENDPOINT,
  REFRESH_TOKEN_COOKIE,
} from "@/utils/constants";
import { ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";
import { getCookie } from "cookies-next";

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
  fetchOptions: {
    cache: "no-store",
  },
});

const authLink = setContext(async (_, previousContext) => {
  const token = (getCookie(ACCESS_TOKEN_COOKIE)?.valueOf() as string) || "";

  return {
    ...previousContext,
    headers: {
      ...previousContext?.headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

const onUnAuthenticatedError = onError(
  ({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err?.extensions?.code === "UNAUTHENTICATED") {
          // this is hack to pass the request
          // as middleware has set the the new token
          // that can be used on next request.
          const token =
            (getCookie(REFRESH_TOKEN_COOKIE)?.valueOf() as string) || "";
          const oldHeaders = operation.getContext().headers;
          operation.setContext({
            headers: {
              ...oldHeaders,
              ...(token ? { authorization: `Bearer ${token}` } : {}),
            },
          });
          return forward(operation);
        }
      }
    }
  }
);

function makeClient() {
  const link = ApolloLink.from([
    onUnAuthenticatedError,
    authLink,
    ...(typeof window === "undefined"
      ? [
          new SSRMultipartLink({
            stripDefer: true,
          }),
          httpLink,
        ]
      : [httpLink]),
  ]);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
