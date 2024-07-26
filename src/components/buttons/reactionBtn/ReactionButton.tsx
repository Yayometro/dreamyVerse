"use client";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Spinner,
} from "@nextui-org/react";
import { IDreamDocument, IReactionDocument } from "../../../../dreamyVerse";
import {
  useIsThisPostLikedByTheUserQuery,
  useNewReactionMutation,
  useRemoveReactionMutation,
} from "@/redux/features/api/apiSlice";
import { useSession } from "next-auth/react";
import notifier from "@/helpers/notifier";

function ReactionButton({
  father,
  type,
}: {
  father: IDreamDocument;
  type?: string;
}) {
  const { data: session } = useSession();
  const [objectId, setObjectId] = useState({
    objectId: father._id,
    userId: "",
    type: type,
  });
  const [isLikedAlready, setIsLikedAlready] = useState<boolean>(false);
  const [newReaction, setNewReaction] = useState<IReactionDocument | any>({
    visibility: {
      isPublic: true,
      isVisibleForFriends: true,
      visibleFor: null,
    },
    user: null,
  });
  const [createNewReaction] = useNewReactionMutation();
  const [removeReaction] = useRemoveReactionMutation();
  const [isLoadingPlus, setIsLoadingPlus] = useState<boolean>(false);
  const { data, isLoading, isError, error, refetch } =
    useIsThisPostLikedByTheUserQuery(objectId, {
      skip: !objectId.userId,
    });

  useEffect(() => {
    if (session?.user?.fullUser?._id) {
      setObjectId({ ...objectId, userId: session.user.fullUser._id });
    }
    if (session?.user?.fullUser?._id && father && type) {
      if (type === "dream") {
        setNewReaction({
          ...newReaction,
          user: session.user.fullUser._id,
          dream: father._id,
        });
      } else if (type === "comment") {
        setNewReaction({
          ...newReaction,
          user: session.user.fullUser._id,
          comment: father._id,
        });
      } else if (type === "message") {
        setNewReaction({
          ...newReaction,
          user: session.user.fullUser._id,
          message: father._id,
        });
      } else if (type === "post") {
        setNewReaction({
          ...newReaction,
          user: session.user.fullUser._id,
          post: father._id,
        });
      }
    }
  }, [session, father, type]);

  useEffect(() => {
    if (data) {
      setIsLoadingPlus(false);
      if (!data.ok) {
        setIsLikedAlready(false);
      } else {
        setIsLikedAlready(true);
        setNewReaction(data.data);
      }
    } else if (!isLoading) {
      setIsLikedAlready(false);
      setIsLoadingPlus(true);
    } else if (!isError) {
      setIsLikedAlready(false);
      // console.log(error);
    }
  }, [data, isLoading, isError]);

  const handleNewReaction = async () => {
    try {
      setIsLoadingPlus(true);
      if (!newReaction?.user) {
        notifier(
          "error",
          "USER ID is necessary to create reaction, please reload the page and try again later"
        );
        setIsLoadingPlus(false);
        return null;
      }
      if (isLikedAlready) {
        if (!newReaction?._id) {
          notifier(
            "error",
            "Reaction ID is necessary to create reaction, please reload the page and try again later"
          );
          setIsLoadingPlus(false);
          return null;
        }
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
        const removedReaction = await removeReaction({
          reactionId: newReaction._id,
        });
        if (!removedReaction) {
          notifier(
            "error",
            "Something went wrong, please reload the page and try again"
          );
          setIsLoadingPlus(false);
          setNewReaction({
            ...newReaction,
            user: session?.user?.fullUser?._id,
            [typeof type === "string" ? type : "objectId"]: father._id,
          });
          return null;
        }
        if ("ok" in removedReaction && !removedReaction?.ok) {
          setIsLikedAlready(false);
          setIsLoadingPlus(false);
          setNewReaction({
            ...newReaction,
            user: session?.user?.fullUser?._id,
            [type as string]: father._id,
            _id: null,
            createdAt: null,
            updatedAt: null,
            __v: null,
          });
          return null;
        } else if ("ok" in removedReaction && removedReaction.ok) {
          setIsLikedAlready(false);
          setIsLoadingPlus(false);
          setNewReaction({
            ...newReaction,
            user: session?.user?.fullUser?._id,
            [type as string]: father._id,
            _id: null,
            createdAt: null,
            updatedAt: null,
            __v: null,
          });
          return null;
        }
        setIsLoadingPlus(false);
        setIsLikedAlready(false);
        setNewReaction({
          ...newReaction,
          user: session?.user?.fullUser?._id,
          [type as string]: father._id,
          _id: null,
          createdAt: null,
          updatedAt: null,
          __v: null,
        });
        return null;
      }
      const isReacted = await createNewReaction({ reaction: newReaction });

      if (isReacted.error || isReacted.data.error || !isReacted.data) {
        notifier("error", isReacted.error || isReacted.data.error);
        setIsLoadingPlus(false);
        return null;
      }
      setIsLoadingPlus(false);
      return null;
    } catch (e) {
      console.log("Error", e);
    }
  };
  return (
    <Button
      as={"button"}
      isIconOnly
      variant="light"
      color="danger"
      size="sm"
      className=" text-default-900 p-0 cursor-pointer"
      onClick={() => handleNewReaction()}
    >
      {isLikedAlready ? (
        <FaHeart size={100} className="w-[20px] h-[20px]" />
      ) : (
        <FaRegHeart size={100} className="w-[20px] h-[20px]" />
      )}
      {!isLoadingPlus ? "" : <Spinner size="sm" />}
    </Button>
  );
}

export default ReactionButton;
