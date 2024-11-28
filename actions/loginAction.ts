"use server";

import { LoginDocument } from "@/__generated__/graphql";
import { getClient } from "@/utils/apollo.client";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/utils/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction() {
  const cookieStore = await cookies();

  const client = await getClient();
  const { data } = await client.mutate({
    mutation: LoginDocument,
    variables: {
      email: "user@email.com",
      password: "password",
    },
  });

  const {
    accessToken,
    refreshToken,
    accessTokenExpiresIn,
    refreshTokenExpiresIn,
  } = data?.login || {};

  if (accessToken && refreshToken) {
    cookieStore.set({
      name: ACCESS_TOKEN_COOKIE,
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: Number(accessTokenExpiresIn) / 1000,
      path: "/",
    });
    cookieStore.set({
      name: REFRESH_TOKEN_COOKIE,
      sameSite: "lax",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: Number(refreshTokenExpiresIn) / 1000,
      path: "/",
    });
  }

  redirect("/");
}
