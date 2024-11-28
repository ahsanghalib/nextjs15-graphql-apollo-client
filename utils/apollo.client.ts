import {
  ACCESS_TOKEN_COOKIE,
  GRAPHQL_ENDPOINT,
  REFRESH_TOKEN_COOKIE,
} from "@/utils/constants";
import { HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/experimental-nextjs-app-support";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

const httpLink = new HttpLink({
  uri: GRAPHQL_ENDPOINT,
  fetchOptions: {
    cache: "no-store",
  },
});

const authLink = (cookieStore: ReadonlyRequestCookies) =>
  setContext(async (_, previousContext) => {
    const token = (cookieStore.get(ACCESS_TOKEN_COOKIE)?.value as string) || "";

    return {
      ...previousContext,
      headers: {
        ...previousContext?.headers,
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
    };
  });

const onUnAuthenticatedError = (cookieStore: ReadonlyRequestCookies) =>
  onError(({ graphQLErrors, operation, forward }) => {
    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        if (err?.extensions?.code === "UNAUTHENTICATED") {
          // this is hack to pass the request
          // as middleware has set the the new token
          // that can be used on next request.
          const token =
            (cookieStore.get(REFRESH_TOKEN_COOKIE)?.value as string) || "";
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
  });

export const { getClient, query, PreloadQuery } = registerApolloClient(
  async () => {
    const cookieStore = await cookies();

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: from([
        onUnAuthenticatedError(cookieStore),
        authLink(cookieStore),
        httpLink,
      ]),
    });
  }
);
