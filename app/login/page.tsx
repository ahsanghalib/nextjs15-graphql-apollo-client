/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { loginAction } from "@/actions/loginAction";

export default function Login() {
  async function handleLogin() {
    try {
      await loginAction();
    } catch (err: any) {
      console.log(err?.message);
    }
  }

  return (
    <div className="flex p-5">
      <button className="bg-red-800 py-1 px-2" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}
