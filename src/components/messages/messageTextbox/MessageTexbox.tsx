"use client";

import { MessageContext } from "@/providers/messages/MessageProvider";
import { useCreateMessageMutation } from "@/redux/features/api/apiSlice";
import { Button, Spinner, Textarea } from "@nextui-org/react";
import React, { useContext, useState } from "react";
import { MdSend } from "react-icons/md";
import { IMessage, IUserDocument, MessageContextType } from "../../../../dreamyVerse";
import useUserNavigator from "@/hooks/useUserNavigatorId";
import mongoose from "mongoose";
import notifier from "@/helpers/notifier";

function MessageTexbox() {
  const [value, setValue] = useState("");
  const [media, setMedia] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createMessage] = useCreateMessageMutation();
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("SomeComponent must be used within a MessageProvider");
  }

  const { currentConversation } = context as MessageContextType;
  const { userId } = useUserNavigator();

  const handleNewMessage = async () => {
    try {
      setIsLoading(true);
      if (!currentConversation?.participants) {
        notifier("error", "No participants in the current conversation to create a new message, please IT review the logs.");
        console.log(currentConversation);
        setIsLoading(false);
        setValue("")
        return null;
      }
      const userTo = currentConversation.participants.find(user => (user as IUserDocument)._id !== userId);
      if (!userTo) {
        notifier("error", "No user to send this conversation, please IT review the logs.");
        console.log(userTo);
        setIsLoading(false);
        setValue("")
        return null;
      }

      const messagePayload = {
        conversation: currentConversation._id,
        fromUser: userId as unknown as mongoose.Types.ObjectId,
        receiverUser: (userTo as unknown as IUserDocument)._id as unknown as mongoose.Types.ObjectId,
        content: {
          media: media,
          message: value
        },
        read: false,
        removed: {
          for: [],
          forAll: false
        }
      } as IMessage;

      console.log("Message Payload:", messagePayload);  // Agregar esta línea para verificar el payload

      const confirmation = await createMessage(messagePayload);

      if (!confirmation) {
        console.log(confirmation);
        notifier("error", "Something went wrong while creating your new message, please try again later");
        setIsLoading(false);
        setValue("")
        return null;
      }
      setValue("")
      setIsLoading(false);
      return null;
    } catch (e) {
      setIsLoading(false);
      setValue("")
      console.log(e);
    }
  }

  return (
    <div className="w-full h-full flex gap-0.5 items-start justify-center">
      <Textarea
        placeholder="Text message"
        className="w-full"
        maxRows={5}
        value={value}
        onValueChange={setValue}
      />
      <Button
        as={"button"}
        isIconOnly
        variant="light"
        onClick={() => handleNewMessage()}
        className="w-[30px] h-[60px] bg-violet-500 dark:bg-violet-800 hover:bg-violet-600 dark:hover:bg-violet-700 flex justify-center items-center gap-2"
        radius="sm"
      >
        <MdSend size={25} /> {isLoading ? <Spinner size="sm" /> : ""}
      </Button>
    </div>
  );
}

export default MessageTexbox;
