"use client";

import React, { useEffect, useState } from "react";
import { Button, Spacer, Spinner, Textarea } from "@nextui-org/react";
import notifier from "@/helpers/notifier";
import { useSession } from "next-auth/react";
import {
  useCreateNewCommentMutation,
  useEditCommentDreamMutation,
} from "@/redux/features/api/apiSlice";
import { ICommentDream, IDreamDocument } from "../../../../dreamyVerse";
import CommentsCardSection from "../commentsCardSection/CommentsCardSection";
import { object } from "webidl-conversions";

function CommentSliderPopUp({
  father,
  edition,
  closer
}: {
  father: IDreamDocument;
  edition: ICommentDream | null;
  closer?: () => void
}) {
  const [useEmail, setUseEmail] = useState<string | null>(null);
  const { data: session } = useSession();
  const [createNewCommentDream] = useCreateNewCommentMutation();
  const [editCommentDream] = useEditCommentDreamMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [newCommentDream, setNewCommentDream] = useState<ICommentDream>({
    user: null,
    dream: !father._id ? null : father._id,
    visibility: {
      isPublic: true,
      isVisibleForFriends: true,
      visibleFor: null,
    },
    image: null,
    replayTo: father._id,
    isSubComment: false,
    comment: "",
    _id: null,
  });

  // Update userEmail only once when session changes
  useEffect(() => {
    if (session?.user?.email) {
      setUseEmail(session.user.email);
      setNewCommentDream({ ...newCommentDream, user: session.user.email });
    }
  }, [session?.user?.email]);

  // Update userEmail only once when session changes
  useEffect(() => {
    if (edition && edition.user) {
      setNewCommentDream({
        ...newCommentDream,
        user:
          typeof edition.user === "object" ? edition.user._id : edition.user,
        comment: edition.comment,
        _id: edition._id,
      });
    }
  }, [edition]);

  const handleSubmit: () => Promise<null | undefined> = async () => {
    try {
      setIsLoading(true);
      if (
        !newCommentDream.user ||
        !newCommentDream.dream ||
        newCommentDream.user === "" ||
        newCommentDream.dream === ""
      ) {
        notifier(
          "error",
          "user and dream._Id youd be set before save the comment. Please reload the page 🚨"
        );
        handleCleanner();
        setIsLoading(false);
        return null;
      }
      if (!useEmail || useEmail === "") {
        notifier(
          "error",
          "There has to be a email from sender attatched, to save this comment. Please reload the page 🚨"
        );
        handleCleanner();
        setIsLoading(false);
        return null;
      }
      if (edition) {
        if (!newCommentDream._id) {
          notifier(
            "error",
            "No _id on comment to edit. Please reload the page 🚨"
          );
          handleCleanner();
          setIsLoading(false);
          return null;
        }
        const editedComment = await editCommentDream({
          comment: newCommentDream,
        });
        if (!editedComment.data?.data) {
          if (!editedComment?.error) {
            notifier("error", `${editedComment?.error}`);
            setIsLoading(false);
            return null;
          }
          notifier(
            "error",
            "Something went wrong trying to edit your comment, please try again later "
          );
          handleCleanner();
          setIsLoading(false);
          return null;
        }
        handleCleanner();
        setIsLoading(false);
        closer && closer();
        return null;
      }
      const newComentFromBack = await createNewCommentDream({
        itemToComment: father._id,
        newComment: newCommentDream,
        fromUser: useEmail,
        type: "dream",
      });
      if (!newComentFromBack.data?.data) {
        if (!newComentFromBack?.error) {
          notifier("error", `${newComentFromBack?.error}`);
          setIsLoading(false);
          return null;
        }
        notifier(
          "error",
          "Something went wrong trying to create your comment, please try again later "
        );
        handleCleanner();
        setIsLoading(false);
        return null;
      }
      handleCleanner();
      setIsLoading(false);
      return null;
    } catch (e) {
      console.log("error: ", e);
      setIsLoading(false);
    }
  };
  const handleCleanner = () => {
    setNewCommentDream({
      ...newCommentDream,
      dream: !father._id ? null : father._id,
      visibility: {
        isPublic: true,
        isVisibleForFriends: true,
        visibleFor: null,
      },
      image: null,
      replayTo: father._id,
      isSubComment: false,
      comment: "",
    });
  };
  return (
    <div className=" w-full">
      <Textarea
        label={`${!edition ? "" : "Edit comment"}`}
        value={newCommentDream.comment || ""}
        labelPlacement="outside"
        placeholder="Enter your comment..."
        onValueChange={(c) => {
          setNewCommentDream({ ...newCommentDream, comment: c });
        }}
      />
      <div className="send-btn">
        <Spacer y={2} />
        <Button
          type="submit"
          onClick={() => handleSubmit()}
          className={`${
            !isLoading ? "" : "cursor-not-allowed bg-blue-50 text-black "
          }`}
        >
          {!edition ? "Save" : "Edit"} comment {!isLoading ? "" : <Spinner />}
        </Button>
        <Spacer y={2} />
        {
            !edition ? "" : (
                <p className=" text-[12px] text-slate-500">
                    After edition, if you want to create a new dream, please close this pop-op and create a new one normally
                </p>
            )
        }
        <Spacer y={4} />
        <CommentsCardSection father={father} />
      </div>
    </div>
  );
}

export default CommentSliderPopUp;
