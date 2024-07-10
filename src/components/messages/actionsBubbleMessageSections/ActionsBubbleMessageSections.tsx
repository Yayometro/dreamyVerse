"use client";

import notifier from "@/helpers/notifier";
import {
  useRemoveMessageMutation,
  useUpdateMessageMutation,
} from "@/redux/features/api/apiSlice";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from "@nextui-org/react";
import React, { useState } from "react";
import { MdDelete, MdInfo, MdMoreHoriz } from "react-icons/md";
import useUserNavigator from "@/hooks/useUserNavigatorId";
import { IMessage, IUserDocument } from "../../../../dreamyVerse";

function ActionsBubbleMessageSections({ message }: { message: IMessage }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [removeMessage] = useRemoveMessageMutation();
  const [updateMessage] = useUpdateMessageMutation();

  const { userId } = useUserNavigator();

  const handleRemoveTotal = async () => {
    try {
      setIsLoading(true);
      const confirmation = await removeMessage(message._id as string);
      if (!confirmation || !confirmation.data) {
        console.log("message removing error: ", confirmation);
        notifier(
          "error",
          "Something went wrong while removing the message, try again later"
        );
        setIsLoading(false);
        return;
      }
      notifier("ok", "Message removed");
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };

  const handleRemoveForMe = async () => {
    try {
      setIsLoading(true);
      if (!userId) {
        notifier("error", "User ID is missing");
        setIsLoading(false);
        return;
      }
      const confirmation = await updateMessage({
        ...message,
        removed: {
          ...message.removed,
          for: [...(message.removed.for ?? []), userId],
        },
      } as unknown as IMessage);
      if (!confirmation || !confirmation.data) {
        console.log("message removing error: ", confirmation);
        notifier(
          "error",
          "Something went wrong while removing the message, try again later"
        );
        setIsLoading(false);
        return;
      }
      notifier(
        "ok",
        "Message removed only for yourself. The rest of participants in this conversation can see this message 🤓"
      );
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };

  const handleReturnAsVisible = async (mode?: "me") => {
    try {
      setIsLoading(true);
      if (!userId) {
        notifier("error", "User ID is missing");
        setIsLoading(false);
        return;
      }
      let updatedArray;
      if (mode === "me") {
        updatedArray = message.removed.for.filter((id) => id !== userId);
      } else {
        updatedArray = message.removed.for.filter(
          (id) => id !== message.receiverUser
        );
      }
      const confirmation = await updateMessage({
        ...message,
        removed: {
          ...message.removed,
          for: updatedArray,
        },
      } as unknown as IMessage);
      if (!confirmation || !confirmation.data) {
        console.log("message removing error: ", confirmation);
        notifier(
          "error",
          "Something went wrong while returning the message, try again later"
        );
        setIsLoading(false);
        return;
      }
      notifier("ok", mode === "me" ? "You can see this message again 🤓" : "The other person can see the message again 🤓");
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };

  const handleRemoveForTheOtherOnly = async () => {
    try {
      setIsLoading(true);
      if (!userId) {
        notifier("error", "User ID is missing");
        setIsLoading(false);
        return;
      }
      const updatedArray = [
        ...message.removed.for,
        message.receiverUser as unknown as string,
      ];
      const confirmation = await updateMessage({
        ...message,
        removed: {
          ...message.removed,
          for: updatedArray,
        },
      } as unknown as IMessage);
      if (!confirmation || !confirmation.data) {
        console.log("message removing error: ", confirmation);
        notifier(
          "error",
          "Something went wrong while removing the message, try again later"
        );
        setIsLoading(false);
        return;
      }
      notifier("ok", "The message was removed for the other one only 🤓");
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };

  return (
    <div className="w-full h-full p-1 flex gap-2 flex-col items-center justify-center z-[600] pointer-events-auto">
      {(message.fromUser._id as unknown as string) === (userId as string) ? (
        <>
          <Button
            as={"button"}
            variant="light"
            color="danger"
            size="sm"
            className="w-full text-tiny md:text-sm rounded-lg cursor-pointer text-slate-950 dark:text-white"
            onClick={handleRemoveTotal}
          >
            Remove for All
          </Button>
          {message.removed.for.some((id) => id === userId) ? (
            <Button
              as={"button"}
              variant="light"
              color="danger"
              size="sm"
              className="w-full text-tiny md:text-sm rounded-lg cursor-pointer text-slate-950 dark:text-white"
              onClick={() => handleReturnAsVisible("me")}
            >
              Return this message as visible for me again
            </Button>
          ) : (
            <Button
              as={"button"}
              variant="light"
              color="danger"
              size="sm"
              className="w-full text-tiny md:text-sm rounded-lg cursor-pointer text-slate-950 dark:text-white"
              onClick={handleRemoveForMe}
            >
              Remove for me
            </Button>
          )}
          {message.removed.for.some((id) => id === message.receiverUser) ? (
            <Button
              as={"button"}
              variant="light"
              color="danger"
              size="sm"
              className="w-full text-tiny md:text-sm rounded-lg cursor-pointer text-slate-950 dark:text-white border-1 border-orange-500"
              onClick={() => handleReturnAsVisible()}
            >
              Return this message as visible for the other one
            </Button>
          ) : (
            <Button
              as={"button"}
              variant="light"
              color="danger"
              size="sm"
              className="w-full text-tiny rounded-lg cursor-pointer text-slate-950 dark:text-white"
              onClick={handleRemoveForTheOtherOnly}
            >
              Remove for the other only
            </Button>
          )}
        </>
      ) : message.removed.for &&
        message.removed.for.some((id) => id === message.receiverUser) ? (
        <div className="flex flex-col gap-2 justify-center items-center text-tiny text-center">
            <p className="">{"This message was removed for you only"}</p>
            <p className="">No actions can be done</p>
            <p className=" text-lg">😬</p>
        </div>
      ) : (
        <Button
          as={"button"}
          variant="light"
          color="danger"
          size="sm"
          className="w-full text-tiny md:text-sm rounded-lg cursor-pointer text-slate-950 dark:text-white"
          onClick={handleRemoveForMe}
        >
          Remove for me
        </Button>
      )}
    </div>
  );
}

export default ActionsBubbleMessageSections;
