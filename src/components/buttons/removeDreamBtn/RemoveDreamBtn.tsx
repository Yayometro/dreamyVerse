"use client";

import notifier from "@/helpers/notifier";
import { useRemoveDreamMutation } from "@/redux/features/api/apiSlice";
import { Button, Spinner } from "@nextui-org/react";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa6";

function RemoveDreamBtn({ dreamId }: { dreamId: string }) {
  const [removeDream] = useRemoveDreamMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRemove = async () => {
    try {
      setIsLoading(true);
      const confirmRemove = await removeDream(dreamId);
      if (confirmRemove.error || !confirmRemove.data || !confirmRemove) {
        notifier(
          "error",
          "This dream can't be removed because we need the dream ID, please try again by reloading the app or page... 🤕"
        );
        setIsLoading(false);
        return null;
      }
      notifier("ok", "The dream has been removed... 😎")
      setIsLoading(false);
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  return (
    <Button
      as={"button"}
      variant="light"
      color="danger"
      size="sm"
      className=" text-default-900 py-0 sm:px-2 cursor-pointer flex gap-2 justify-end items-center"
      onClick={() => handleRemove()}
    >
      <FaTrash size={100} className="w-[20px] h-[20px] " />
      <p className="">Remove Dream</p>
      {isLoading ? <Spinner size="sm" /> : ""}
    </Button>
  );
}

export default RemoveDreamBtn;
