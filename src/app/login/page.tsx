import React from "react";
import LoginComp from "@/components/login/LoginComp";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
//


async function Login() {
  const session = await getServerSession()
  console.log(session)
  if(session) redirect("/dashboard")
  return (
    <div
      className=" bg-black p-4 w-screen h-screen flex justify-center items-center bg-origin-border bg-center"
      style={{ backgroundImage: "url('/backgrounds/info5.jpg')" }}
    >
      <LoginComp />
    </div>
  );
}

export default Login;
