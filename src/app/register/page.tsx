import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RegisterComponent from "@/components/register/RegisterComponent";



async function Register() {
    const session = await getServerSession()
    console.log(session)
    if(session) redirect("/dashboard")
    return (
      <div
        className=" w-screen h-screen flex justify-center items-center bg-origin-border bg-center"
        style={{ backgroundImage: "url('/backgrounds/info5.jpg')" }}
      >
        <RegisterComponent />
      </div>
    );
  }
  
  export default Register;