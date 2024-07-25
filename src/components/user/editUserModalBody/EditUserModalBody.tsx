"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";
import { IUserDocument } from "../../../../dreamyVerse";
import { Input, Select, SelectItem, Spacer } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import notifier from "@/helpers/notifier";
import { useUpdateUserMutation } from "@/redux/features/api/apiSlice";
import CreatingLottie from "@/components/lotties/creating/CreatingLottie";

const EditUserModalBody = forwardRef(function EditUserModalBody(
  { user }: { user: IUserDocument },
  ref
) {
  const [beforeUser, setBeforeUser] = useState<IUserDocument>(user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [updateUser] = useUpdateUserMutation();

  const handleInputChange = (key: string, value: any) => {
    setBeforeUser({ ...(beforeUser as any), [key as any]: value as any });
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const zodiacList = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces",
  ];

  useImperativeHandle(ref, () => ({
    handleSubmit: async () => {
      try {
        setIsLoading(true);
        if (!beforeUser._id) {
          notifier(
            "error",
            "No User ID to submit, reload the page or try again later"
          );
          setIsLoading(false);
          return null;
        }
        if (!beforeUser.username) {
          notifier(
            "error",
            "No username to submit, reload the page or try again later"
          );
          setIsLoading(false);
          return null;
        }
        if (!beforeUser.mail) {
          notifier(
            "error",
            "No mail to submit, reload the page or try again later"
          );
          setIsLoading(false);
          return null;
        }
        console.log(beforeUser);
        const confirmUserEdited = await updateUser(beforeUser);
        if (
          !confirmUserEdited ||
          !confirmUserEdited.data ||
          confirmUserEdited.error
        ) {
          console.log(confirmUserEdited);
          let error;
          if (confirmUserEdited.error) {
            if (typeof confirmUserEdited.error === "object") {
              error = `${
                "error" in confirmUserEdited.error
                  ? confirmUserEdited.error
                  : "Unexpected error trying to edit your profile, please review the data and try again later or reload the page... 🚨"
              }`;
            }
          } else if ("message" in confirmUserEdited) {
            error = confirmUserEdited.message as string;
          }
          notifier(
            "error",
            error ||
              "Unexpected error trying to edit your profile, please review the data and try again later or reload the page... 🚨"
          );
          setIsLoading(false);
          return null;
        }
        notifier("ok", "User was updated correctly 😎");
        setIsLoading(false);
        return null;
      } catch (e) {
        notifier(
          "error",
          "Something went wrong, reload the page and try later"
        );
        console.log(e);
        setIsLoading(false);
        return null;
      }
    },
  }));

  return (
    <div className="w-full">
      <div className="loader">
        {!isLoading ? (
          ""
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center bg-white/5 backdrop-blur-sm z-50 absolute text-center p-4 gap-2 left-0 rounded-[25px]">
            <CreatingLottie
              title={"We are editing your profile"}
              message={`Please wait a moment 🤓`}
            />
          </div>
        )}
      </div>
      <Input
        isClearable
        value={beforeUser.username || ""}
        type="text"
        label="usarname"
        variant="bordered"
        placeholder="Enter your username"
        onClear={() => handleInputChange("username", "")}
        onChange={(e) => handleInputChange("username", e.target.value)}
        className="w-full"
      />
      <Spacer y={2} />
      <Input
        isClearable
        value={beforeUser.mail || ""}
        type="email"
        label="mail"
        variant="bordered"
        placeholder="Enter your mail"
        onClear={() => handleInputChange("mail", "")}
        onChange={(e) => handleInputChange("mail", e.target.value)}
        className="w-full"
      />
      <Spacer y={2} />
      <Input
        value={beforeUser.password}
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
        className="w-full"
        onChange={(e) => handleInputChange("password", e.target.value)}
      />
      <Spacer y={2} />
      <Input
        isClearable
        value={beforeUser.name || ""}
        type="text"
        label="name"
        variant="bordered"
        placeholder="Enter your name"
        onClear={() => handleInputChange("name", "")}
        onChange={(e) => handleInputChange("name", e.target.value)}
        className="w-full"
      />
      <Spacer y={2} />
      <Input
        isClearable
        value={beforeUser.lastName || ""}
        type="text"
        label="lastName"
        variant="bordered"
        placeholder="Enter your lastName"
        onClear={() => handleInputChange("lastName", "")}
        onChange={(e) => handleInputChange("lastName", e.target.value)}
        className="w-full"
      />
      <Spacer y={2} />
      <Input
        isClearable
        value={`${beforeUser.phone}` || ""}
        type="text"
        label="phone"
        variant="bordered"
        placeholder="Enter your phone"
        onClear={() => handleInputChange("phone", "")}
        onChange={(e) => handleInputChange("phone", Number(e.target.value))}
        className="w-full"
      />
      <Spacer y={2} />
      <Select
        //   selectedKeys={beforeUser.zodiac ? beforeUser.zodiac : zodiacList[0]}
        value={beforeUser.zodiac ? beforeUser.zodiac : zodiacList[0]}
        label="Select a zodiac"
        className="w-full"
        onChange={(e) => handleInputChange("zodiac", e.target.value)}
      >
        {zodiacList.map((zodiac) => (
          <SelectItem key={zodiac}>{zodiac}</SelectItem>
        ))}
      </Select>
    </div>
  );
});

export default EditUserModalBody;
