"use client";

import React from "react";
import {
  ICommentDream,
  IDreamDocument,
  IUserDocument,
} from "../../../../dreamyVerse";
import { Button } from "@nextui-org/react";
import { useRemoveDreamCommentMutation } from "@/redux/features/api/apiSlice";
import { User } from "next-auth";
import CommentBtn from "@/components/buttons/commentBtn/CommentBtn";
import { MdDelete } from "react-icons/md";
import notifier from "@/helpers/notifier";

function ActionsOnComment({
  comment,
  father,
  userWhoComment,
  currentUser,
}: {
  comment: ICommentDream;
  father: IDreamDocument;
  userWhoComment?: IUserDocument | null;
  currentUser?: User | null;
}) {
  const [removeComment] = useRemoveDreamCommentMutation();

  const handleRemoveComment = async () => {
    try {
      const removeRes = await removeComment(comment._id);
      if(!removeRes) {
        notifier("error", "Error while trying to delete the comment due not ID, please reload the page and try again later")
      }
    } catch (error) {
      console.error("Failed to remove comment", error);
      notifier("error", "Error while trying to delete the comment due not ID, please reload the page and try again later")
    }
  };

  return (
    <div className=" flex gap-2">
      <Button
        isIconOnly
        variant="light"
        color="danger"
        size="sm"
        className="text-default-900 p-0 cursor-pointer"
        onClick={handleRemoveComment}
      >
       <MdDelete size={100} className="w-[20px] h-[20px]"/>
      </Button>
      {userWhoComment?._id === currentUser?._id ? (
        <CommentBtn father={father} cbToggleBtn="edition" edition={comment} />
      ) : (
        ""
      )}
    </div>
  );
}

export default ActionsOnComment;
