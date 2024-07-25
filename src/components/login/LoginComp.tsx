"use client";
import React, { useEffect, useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import notifier from "@/helpers/notifier";
import { signIn } from "next-auth/react";
import { Button, Input } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import SettingUpLottie from "../lotties/setting up/SettingUp";

function LoginComp() {
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });
  const [errorForm, setErrorForm] = useState("");
  const [loading, setLoading] = useState(false);
  // set router
  const router = useRouter();

  const searchParamas = useSearchParams();
  const email: string | null = searchParamas.get("mail");
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  //Ok message if user was created and redirected to LOGIN
  useEffect(() => {
    if (email) {
      notifier("ok", `${email} was created successfully 🤓`);
    }
  }, [email]);
  //
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //
  const googleSignIn = async () => {
    try {
      setLoading(true);
      const reqGoogle = await signIn("google");
      console.log(reqGoogle);
      router.push("/dashboard");
    } catch (e: unknown) {
      console.error("Error:", e);
      if (e instanceof Error) {
        throw new Error(e.message);
      } else {
        console.log(e);
        throw new Error(
          "An unexpected error has occurred on 'LoginComp' using googleSignIn, please review the logs."
        );
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      // AUTH
      const authResponse = await signIn("credentials", {
        mail: formData.mail,
        password: formData.password,
        redirect: false,
      });
      console.log(authResponse);
      if (!authResponse) {
        console.log(authResponse);
        setErrorForm(
          "Something went wrong, please verify your username or try again later 🤕"
        );
        notifier(
          "error",
          "Something went wrong, please verify your username or try again later 🤕"
        );
        router.push("/login");
      }
      if (authResponse?.error) {
        console.log(authResponse);
        let msg = String(authResponse.error);
        setErrorForm(msg);
        notifier("error", msg);
        setLoading(false);
        return;
      }
      console.log(authResponse);
      router.push("/dashboard");
    } catch (e: unknown) {
      console.error("Error:", e);
      if (e instanceof Error) {
        throw new Error(e.message);
      } else {
        console.log(e);
        throw new Error(
          "An unexpected error has occurred on 'LoginComp' using SignIn, please review the logs."
        );
      }
    }
  };

  const inputBasicStyles =
    " w-[80%] sm:w-[50%] border-1. border-violet-500 rounded-2xlx bg-white dark:bg-white dark:text-slate-900 text-slate-900 overflow-hidden";
  const textLabel = "text-slate-700 dark:text-slate-700";

  return (
    <div className="flex flex-col w-[95%] h-[95%] sm:w-[550px] sm:h-[650px] relative rounded-2xl items-center justify-center sm:pt[20px] overflow-y-auto bg-purple-700">
      <div className="loader">
        {!loading ? (
          ""
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center bg-white bg-white/80s z-50 absolute text-center p-4 gap-4 left-0">
            <SettingUpLottie title="We are working to set everything up for you" message="Please wait a moment 🤓" custom={true} styles=" w-full h-full text-base pt-4 text-black"/>
          </div>
        )}
      </div>
      <div className=" pb-4 pt-3 flex flex-col sm:pt-8">
        <h1 className="text-center text-white text-3xl font-normal">
          Welcome again🌛
        </h1>
        <h1 className=" hidden text-center text-white text-base font-thin pt-4 sm:block">
          We are ready to know more amazing stories from your dreams
        </h1>
      </div>
      <div className="form-container bg-white w-full rounded-t-[100px] h-full m-auto">
        <form
          className="form-login w-full h-full text-center flex flex-col gap-4 justify-start items-center pt-8 sm:pt-8"
          onSubmit={handleSubmit}
        >
          <div className="bts-fast w-[100%] pt-5  flex flex-col gap-8 justify-center items-center">
            <div
              className=" w-[80%] sm:w-[50%] border-2 border-violet-500 py-2 flex gap-2 items-center justify-center text-slate-600 rounded-2xl cursor-pointer hover:bg-violet-100"
              onClick={googleSignIn}
            >
              <div className="sblf-icon-cont">
                <FcGoogle size={25} />
              </div>
              <p>Google </p>
            </div>
            <div className="text-purple-700 w-[90%] text-xs hover:underline">
              <Link href="/register">
                <p className="">You do not have an account? - Click here</p>
              </Link>
            </div>
          </div>
          <div className="divider border-t-2 border-slate-300 w-[70%] mt-5"></div>
          <div className="w-full flex flex-col justify-center items-center gap-1">
            <label htmlFor="email" className={textLabel}>
              Email address
            </label>
            <Input
              isClearable
              value={formData.mail || ""}
              type="email"
              name="mail"
              label="mail"
              variant="bordered"
              placeholder="Enter your mail"
              onClear={() => setFormData({ ...formData, mail: "" })}
              onChange={handleChange}
              className={inputBasicStyles}
            />
            <div
              id="emailHelp"
              className="form-text-never w-[90%] font-light text-xs text-slate-400"
            >
              We will never share your email with anyone else.
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center gap-1">
            <label htmlFor="password" className={textLabel}>
              Password
              <span className=" text-red-400 text-sm">{"  (required)"}</span>
            </label>
            <Input
              value={formData.password}
              name="password"
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <FaEyeSlash className="text-xl text-default-400 pointer-events-none" />
                  ) : (
                    <FaEye className="text-xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              // onClear={() => setFormData({ ...formData, password: "" })}
              onChange={handleChange}
              className={inputBasicStyles}
            />
            <div
              id="passwordHelp"
              className="form-text-never w-[90%] font-light text-xs text-slate-400"
            >
              We will never share your password with anyone else.
            </div>
          </div>
          {errorForm && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {errorForm}
            </div>
          )}
          <Button
            type="submit"
            className="  w-[80%] sm:w-[50%] text-white  bg-violet-600 rounded-xl py-5"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginComp;
