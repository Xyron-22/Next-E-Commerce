"use client"
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function TestComponent () {
    const { data: session } = useSession();

    console.log(session)

    if (session) {
        return (
          <>
            {session?.user?.name} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </>
        );
      }
      return (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      );
}