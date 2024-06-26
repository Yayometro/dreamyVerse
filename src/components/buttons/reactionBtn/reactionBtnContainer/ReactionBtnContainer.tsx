"use client";
import React, { useEffect, useState } from "react";
import { IDreamDocument, IReactionDocument } from "../../../../../dreamyVerse";
import { Button, Spinner } from "@nextui-org/react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { GiDreamCatcher } from "react-icons/gi";
import { useSession } from "next-auth/react";
import notifier from "@/helpers/notifier";
import { useNewReactionMutation, useRemoveReactionMutation } from "@/redux/features/api/apiSlice";

function ReactionBtnContainer({
  father,
  type,
  isLikedAlready,
  refetch,
}: {
  father: IDreamDocument;
  type?: "comment" | "dream" | "post" | "message";
  isLikedAlready?: boolean;
  refetch: () => void;
}) {
  const { data: session } = useSession();
  const [newReaction, setNewReaction] = useState<IReactionDocument | any>({
    user: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createNewReaction] = useNewReactionMutation();
  const [removeReaction] = useRemoveReactionMutation();

  useEffect(() => {
    if (session?.user?.fullUser?._id && father && type) {
      if (type === "dream") {
        setNewReaction({...newReaction, user: session.user.fullUser._id, dream: father._id })
      } else if (type === "comment") {
        setNewReaction({...newReaction, user: session.user.fullUser._id, comment: father._id })
      } else if (type === "message") {
        setNewReaction({...newReaction, user: session.user.fullUser._id, message: father._id })
      } else if (type === "post") {
        setNewReaction({...newReaction, user: session.user.fullUser._id, post: father._id })
      }
    }
  }, [session, father, type]);

  const handleNewReaction = async () => {
    try {
      setIsLoading(true);
      if (!newReaction?.user) {
        notifier("error", "USER ID is necessary to create reaction, please reload the page and try again later");
        setIsLoading(false);
        return null;
      }
      if(isLikedAlready){
        let objectId;
        if (type === "dream") {
            objectId = newReaction.dream;
          } else if (type === "comment") {
            objectId = newReaction.comment;
          } else if (type === "message") {
            objectId = newReaction.message;
          } else if (type === "post") {
            objectId = newReaction.post;
          }
        const removedReaction = await removeReaction({userId: newReaction.user, objectId: objectId, type: type});
        console.log(removedReaction);
        if (removedReaction.error || removedReaction.data.error || !removedReaction.data) {
            notifier("error", removedReaction.error || removedReaction.data.error);
            setIsLoading(false);
            return null;
        }
        setIsLoading(false);
        refetch(); // Refetch the query to update the state
        return null;
    }
      const isReacted = await createNewReaction({ reaction: newReaction });
      
      if (isReacted.error || isReacted.data.error || !isReacted.data) {
        notifier("error", isReacted.error || isReacted.data.error);
        setIsLoading(false);
        return null;
      }
      setIsLoading(false);
      refetch(); // Refetch the query to update the state
      return null;
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <div className=" flex gap-2">
      <Button
        isIconOnly
        variant="light"
        className=" w-full hover:bg-default-200"
        onClick={() => handleNewReaction()}
      >
        <div className=" w-full flex flex-col gap-1 justify-center items-center">
          <div className="togherer-react flex gap-2">
            {
                !isLikedAlready ? (
                    <FaRegHeart size={100} className="w-[20px] h-[20px]" />
                ) : (
                    <FaHeart size={100} className="w-[20px] h-[20px]" />
                )
            }
            {!isLoading ? "" : <Spinner size="sm" />}
          </div>
          <p className="text-[10px] ">{
            !isLikedAlready ? "Like" : "Unlike"
          }</p>
        </div>
      </Button>
      <div className="flex flex-col gap-1 justify-center items-center hover:bg-default-200 cursor-pointer rounded-lg">
        <Button isIconOnly variant="light">
          <GiDreamCatcher size={100} className="w-[20px] h-[20px]" />
        </Button>
        <p className="text-[10px] ">I dreamed the same</p>
      </div>
    </div>
  );
}

export default ReactionBtnContainer;
