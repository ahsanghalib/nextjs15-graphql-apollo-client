"use server";

import { RefreshTokenDocument } from "@/__generated__/graphql";
import { getClient } from "@/utils/apollo.client";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  USER_ID_COOKIE,
} from "@/utils/constants";
import { cookies } from "next/headers";

export async function refreshTokenAction() {
  const cookieStore = await cookies();
  const token = (cookieStore.get(REFRESH_TOKEN_COOKIE)?.value as string) || "";

  const client = await getClient();

  try {
    const { data } = await client.mutate({
      mutation: RefreshTokenDocument,
      variables: {
        refreshToken: token,
      },
    });
    const {
      accessToken,
      refreshToken,
      accessTokenExpiresIn,
      refreshTokenExpiresIn,
    } = data?.refreshTokens || {};

    if (accessToken && refreshToken) {
      cookieStore.set({
        name: ACCESS_TOKEN_COOKIE,
        value: accessToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: Number(accessTokenExpiresIn) / 1000,
        sameSite: "lax",
        path: "/",
      });
      cookieStore.set({
        name: REFRESH_TOKEN_COOKIE,
        value: refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: Number(refreshTokenExpiresIn) / 1000,
        sameSite: "lax",
        path: "/",
      });
    }
  } catch {
    cookieStore.delete(ACCESS_TOKEN_COOKIE);
    cookieStore.delete(REFRESH_TOKEN_COOKIE);
    cookieStore.delete(USER_ID_COOKIE);
  }
}
