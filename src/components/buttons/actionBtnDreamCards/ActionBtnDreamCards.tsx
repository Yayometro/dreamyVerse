"use client";

import React, { useEffect, useState } from "react";
import { IDreamDocument, IUserDocument } from "../../../../dreamyVerse";
import { useSession } from "next-auth/react";
import RemoveDreamBtn from "../removeDreamBtn/RemoveDreamBtn";
import { Divider } from "@nextui-org/react";
import EditDreamCardBtn from "../editDreamCard/EditDreamCardBtn";

function ActionBtnDreamCards({
  dream,
  userPost,
}: {
  dream: IDreamDocument;
  userPost: IUserDocument;
}) {
  const { data: session } = useSession();
  const [isUserAbleToEdit, setIsUSerAbleToEdit] = useState<string>("");

  useEffect(() => {
    if (session?.user?.fullUser?._id) {
      setIsUSerAbleToEdit(session.user.fullUser._id);
    }
  }, [session]);

  return (
    <>
      {userPost._id !== isUserAbleToEdit ? (
        ""
      ) : (
        <>
        <div className=" flex justify-start items-center gap-2">
          {

          }
          <RemoveDreamBtn dreamId={dream._id as string} />
          <EditDreamCardBtn dream={dream} />
        </div>
        <Divider />
        </>
      )}
    </>
  );
}

export default ActionBtnDreamCards;
