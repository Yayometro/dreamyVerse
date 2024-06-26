"use client";

import React, { useState } from "react";
import {
  IDreamDocument,
  INotification,
  IUserDocument,
} from "../../dreamyVerse";
import notifier from "@/helpers/notifier";
import { useCreateNotificationMutation } from "@/redux/features/api/apiSlice";

function useCreateNotification({
  userSender,
  userReceptor,
  type,
  father,
  message,
  action,
}: {
  userSender: IUserDocument;
  userReceptor: IUserDocument;
  type: "dream" | "user" | "message" | "post";
  father: IUserDocument | IDreamDocument;
  message: string;
  action?: string;
}) {
  const [isLoadingN, setIsLoadingN] = useState(false);
  const [dataN, setDataN] = useState<INotification | null>(null);
  const [errorN, setErrorN] = useState<object | string | null>(null);

  const [createNotify] = useCreateNotificationMutation();

  const handleNotifyCreation = async () => {
    try {
      setIsLoadingN(true);
      let newNotification;
      if (!userSender) {
        notifier(
          "error",
          "Unable to continue since the userNavigator is null or undefined... 🚨"
        );
        setIsLoadingN(false);
        return null;
      }
      newNotification = {
        user: userReceptor._id,
        type: type,
        redirectionalId: father._id,
        message: message,
        action: action,
        read: false,
      };
      const confirmation = await createNotify(newNotification);
      if (!confirmation || !confirmation.data || confirmation.error) {
        console.log(confirmation);
        let message;
        if (confirmation.error && "message" in confirmation) {
          message = confirmation.message;
        }
        message =
          "Something went wrong requesting the access. Please reload the page and try again later... 🤕";
        notifier("error", message);
        setIsLoadingN(false);
        return null;
      }
      setDataN(confirmation.data);
      setIsLoadingN(false);
      return null;
    } catch (e) {
      console.log(e);
      setIsLoadingN(false);
      return null;
    }
  };

  handleNotifyCreation();
  return {
    isLoading: isLoadingN,
    data: dataN,
    error: errorN,
  };
}

export default useCreateNotification;
