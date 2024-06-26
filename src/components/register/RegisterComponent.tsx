"use client";
import React, { useEffect, useState } from "react";
import fetcher from "@/helpers/fetcher"; // (verb, path, content )
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { quantum } from "ldrs";
import notifier from "@/helpers/notifier";
import {
  Button,
  Image,
  Input,
  Select,
  SelectItem,
  Spacer,
} from "@nextui-org/react";
import { CldUploadWidget } from "next-cloudinary";
import PopOverUploadRecording from "../popOvers/Informatives/PopOverUploadRecording";
import zodiacList from "@/helpers/ZodiacList";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function RegisterComponent() {
  const [formData, setFormData] = useState({
    username: "",
    mail: "",
    password: "",
    name: "",
    lastName: "",
    phone: "",
    avatar: "",
    zodiac: "",
    termnsYes: false,
    formError: "",
  });
  const [validationMessages, setValidationMessages] = useState({
    passLength: "hidden",
    passCapital: "hidden",
    passSpecial: "hidden",
  });
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //Loader
  quantum.register();

  const passString =
    'The password must have at least one special character "!@#$%^&*(),.?":{}|<>".';
  const regexCapital = /[A-Z]/;
  const regexSpecial = /[!@#$%^&*(),.?":_{}|<>]/;

  useEffect(() => {
    const updateValidationMessages = () => {
      const newMessages = {
        passLength: formData.password.length < 8 ? "" : "hidden",
        passCapital: regexCapital.test(formData.password) ? "hidden" : "",
        passSpecial: regexSpecial.test(formData.password) ? "hidden" : "",
      };
      setValidationMessages(newMessages);
    };

    if (formData.password.length > 0) {
      updateValidationMessages();
    }
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

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
      // Send data to backend using fetcher(formData)
      console.log(formData);
      if (formData.termnsYes === false) {
        notifier("warning", "Accept the terms and conditions to continue");
        setLoading(false);
        return false;
      }
      //password validation:
      if (
        formData.password.length < 8 ||
        !regexCapital.test(formData.password) ||
        !regexSpecial.test(formData.password)
      ) {
        notifier(
          "warning",
          "Verify that password length is higher than 8, that also includes min one capital letter and has at least one special character"
        );
        console.log(formData.password);
        setFormData({ ...formData, password: "" });
        setLoading(false);
        return false;
      }

      const toBack = fetcher();
      const response = await toBack.post("user/register", {
        username: formData.username,
        mail: formData.mail,
        password: formData.password,
        name: formData.name,
        lastName: formData.lastName,
        phone: formData.phone,
        avatar: formData.avatar,
        zodiac: formData.zodiac,
      });
      console.log(response);
      //
      if (response.data) {
        router.push(`/login?mail=${formData.mail}`);
      }
    } catch (e: unknown) {
      console.error("Error:", e);
      if (e instanceof Error) {
        console.log(e);
        notifier("error", String(e.message));
        setLoading(false);
        return null;
        // throw new Error(e.message);
      } else {
        console.log(e);
        notifier(
          "error",
          "An unexpected error has occurred while login you, please review your internet connection or try again later."
        );
        setLoading(false);
        throw new Error(
          "An unexpected error has occurred on 'LoginComp' using SignIn, please review the logs."
        );
      }
    }
  };
  //refresh y accesstoken con JWT - medium

  //Handle image upload
  const onImgHandling = (res: any) => {
    console.log(res);
    if (res.info.secure_url) {
      setFormData({ ...formData, avatar: res.info.secure_url });
      notifier(
        "ok",
        "Your new avatar was successfully uploaded into our database, now SAVE THE CHANGES 🤓"
      );
    }
  };

  //STYLES:
  const inputBasicStyles =
    " w-[80%] sm:w-[50%] border-1. border-violet-500 rounded-2xlx bg-white dark:bg-white dark:text-slate-900 text-slate-900 overflow-hidden";
  const textLabel = "text-slate-700"
  return (
    <div className="flex flex-col w-[90%] h-[95%] sm:w-[550px] sm:h-[650px] relative rounded-2xl items-center justify-center bg-purple-700 overflow-hidden ">
      <div className="loader ">
        {!loading ? (
          ""
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center bg-white/80 z-50 absolute text-center p-4 gap-4 left-0">
            <l-quantum size="150" speed="3.1" color="purple"></l-quantum>
            <p className=" text-xl text-purple-800">
              We are building up your dashboard and data
            </p>
            <p className=" text-xl text-purple-800">Please wait a moment 🤓</p>
          </div>
        )}
      </div>
      <div className=" pt-4 pb-4 flex flex-col sm:pt-8">
        <h1 className="text-center text-white text-3xl font-normal">
          Register🌛
        </h1>
        <h1 className=" hidden text-center text-white text-base font-thin pt-4 sm:block">
          Every great dream has an start
        </h1>
      </div>
      {/* <div className="  w-full h-full rounded-t-[20px]"> */}
      <form
        className="form-register w-full h-[590px] text-center flex flex-col gap-4 justify-start items-center pt-2 pb-6 sm:pt-10 bg-white rounded-t-[20px] overflow-scroll"
        onSubmit={handleSubmit}
      >
        <div className="bts-fast w-[100%] pt-2  flex flex-col gap-8 justify-center items-center">
          <h1 className=" text-xl text-purple-400 flex flex-col">
            Register with just one click 👍
            <span className=" font-light text-sm">{" (recommended)"}</span>
          </h1>
          <div
            className=" w-[80%] sm:w-[50%] border-2 border-violet-500 py-2 flex gap-2 items-center justify-center text-slate-600 rounded-2xl cursor-pointer hover:bg-violet-100"
            onClick={googleSignIn}
          >
            <div className="sblf-icon-cont">
              <FcGoogle size={25} />
            </div>
            <p>Google </p>
          </div>
          <div className="text-purple-700 w-[90%] text-xs hover:underline pb-2">
            <Link href="/login">
              <p>You have an account already? - Login here</p>
            </Link>
          </div>
        </div>
        <div className="divider border-t-2 border-slate-300 w-[70%] mt-2"></div>
        <div className="w-full flex flex-col justify-center items-center gap-1">
          <h1 className=" text-xl text-purple-400 flex flex-col mb-3">
            Or do it manually 👨‍💻
          </h1>
          <label htmlFor="username" className={textLabel}>
            Username
            <span className=" text-red-400 text-sm">{"  (required)"}</span>
          </label>
          {/* <input
            name="username"
            type="text"
            className="form-control"
            id="nameForm"
            aria-describedby="nameH"
            placeholder="Type your username... Something223"
            value={formData.username}
            onChange={handleChange}
            required
            autoFocus
          /> */}
          <Input
            variant="bordered"
            autoFocus
            isClearable
            name="username"
            value={formData.username || ""}
            type="text"
            label="usarname"
            placeholder="Type your username... Something223"
            onClear={() => setFormData({ ...formData, username: "" })}
            onChange={handleChange}
            className={inputBasicStyles}
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-1">
          <label htmlFor="name" className={textLabel}>
            Name
          </label>
          {/* <input
            name="name"
            type="text"
            className="form-control"
            id="nameForm"
            aria-describedby="nameHelp"
            placeholder="Roberto..."
            value={formData.name}
            onChange={handleChange}
          /> */}
          <Input
            variant="bordered"
            autoFocus
            isClearable
            name="name"
            value={formData.name || ""}
            type="text"
            label="name"
            placeholder="Type your name... Roberto"
            onClear={() => setFormData({ ...formData, name: "" })}
            onChange={handleChange}
            className={inputBasicStyles}
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-1">
          <label htmlFor="lastName" className={textLabel}>
            LastName
          </label>
          <Input
            variant="bordered"
            autoFocus
            isClearable
            name="lastName"
            value={formData.lastName || ""}
            type="text"
            label="Last Name"
            placeholder="Type your lastName... Gomez"
            onClear={() => setFormData({ ...formData, lastName: "" })}
            onChange={handleChange}
            className={inputBasicStyles}
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-1">
          <label htmlFor="phone" className={textLabel}>
            Phone
          </label>
          <Input
            isClearable
            value={`${formData.phone}` || ""}
            type="text"
            name="phone"
            label="phone"
            variant="bordered"
            placeholder="Enter your phone"
            onClear={() => setFormData({ ...formData, phone: "" })}
            onChange={handleChange}
            className={inputBasicStyles}
          />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-1">
          <label htmlFor="avatar" className={textLabel}>
            Avatar
          </label>
          <Spacer y={2} />
          {!formData.avatar ? (
            ""
          ) : (
            <div className="">
              <Image
                width={300}
                alt=""
                src={`${formData.avatar}`}
                isBlurred
                isZoomed
                className=" pb-2"
              />
            </div>
          )}
          <CldUploadWidget
            uploadPreset="dreamyVerse_preset"
            onSuccess={(success) => onImgHandling(success)}
          >
            {({ open }) => {
              return (
                <>
                  <Spacer y={3} />
                  <Button
                    onClick={() => open()}
                    className="w-[50%] rounded-xl bg-violet-600 text-white"
                  >
                    Upload your photo
                  </Button>
                </>
              );
            }}
          </CldUploadWidget>
          <Spacer y={2} />
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-1">
          <label htmlFor="zodiac" className={textLabel}>
            Zodiac Sign
          </label>
          <Select
            //   selectedKeys={formData.zodiac ? formData.zodiac : zodiacList[0]}
            value={formData.zodiac ? formData.zodiac : zodiacList[0]}
            label="Select a zodiac"
            name="zodiac"
            variant="bordered"
            className={inputBasicStyles + " border-violet-500"}
            onChange={(e) =>
              setFormData({ ...formData, zodiac: e.target.value})
            }
          >
            {zodiacList.map((zodiac) => (
              <SelectItem key={zodiac}>{zodiac}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-1">
          <label htmlFor="email" className={textLabel}>
            Email address
            <span className=" text-red-400 text-sm">{"  (required)"}</span>
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
            className="form-text-never w-[90%] font-light text-[10px] text-slate-400"
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
            className={"tooltipPwass"}
            style={{ color: "red", fontSize: "8px", textAlign: "center" }}
          >
            <p className={validationMessages.passLength}>
              The password must have at least 8 characters.
            </p>
            <p className={validationMessages.passCapital}>
              The password must have at least one capital letter.
            </p>
            <p className={validationMessages.passSpecial}>{passString}</p>
          </div>
          <div
            id="emailHelp"
            className="form-text-never w-[90%] font-light text-[10px] text-slate-400"
          >
            We will never share your email with anyone else.
          </div>
          <div className="form-check w-full flex flex-row gap-1 justify-center items-center">
            <div className="">
              <input
                name="termnsYes"
                type="checkbox"
                className=" rounded-full border-2 border-violet-600 dark:bg-white bg-white"
                id="exampleCheck1"
                checked={formData.termnsYes}
                onChange={handleChange}
              />
            </div>
            <div className="form-text-never w-fit font-light text-[12px] text-slate-400">
              <p className="w-fit">I agree to terms and conditions</p>
            </div>
          </div>
          {formData.formError && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {formData.formError}
            </div>
          )}
        </div>
        <Button
          type="submit"
          className=" w-[80%] sm:w-[50%] text-white  bg-violet-600 rounded-xl py-5"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
