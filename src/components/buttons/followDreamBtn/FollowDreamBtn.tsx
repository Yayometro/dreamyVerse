"use client"
import { Button, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  IDreamDocument,
  IFollowDocument,
} from "../../../../dreamyVerse";
import {
  useAmIFollowingThisDreamQuery,
  useNewFollowMutation,
  useRemoveFollowMutation,
} from "@/redux/features/api/apiSlice"
import { useSession } from "next-auth/react";
import notifier from "@/helpers/notifier";

function FollowDreamBtn({dream }: { dream: IDreamDocument }) {
  const [follow, setFollow] = useState<boolean | IFollowDocument>(false);
  const [isReloading, setIsRealoading] = useState<boolean>(false);
  const [followObj, setFollowObj] = useState<{
    follower: null | string;
    followed: IDreamDocument | string;
  }>({
    follower: null,
    followed: dream._id as string,
  });
  const { data: session } = useSession();
  const [followDream] = useNewFollowMutation();
  const [removeFollow] = useRemoveFollowMutation();
  const { error, isError, isLoading, data } = useAmIFollowingThisDreamQuery(
    followObj,
    {
      skip: !followObj.follower,
    }
  );

    useEffect(() => {
      if (session?.user?.fullUser?._id) {
          setFollowObj({
            ...followObj,
            follower: session.user.fullUser._id
          });
        }
    }, [session])

  useEffect(() => {
    if (!data?.ok) {
      setFollow(false);
      setIsRealoading(false);
    } else if (data?.data) {
      setFollow(data.data);
      setIsRealoading(false);
    } else if (isLoading) {
      setFollow(false);
      setIsRealoading(true);
    } else if (isError) {
      setFollow(false);
      setIsRealoading(false);
    }
  }, [isError, isLoading, data]);


  const handleFollow = async () => {
    try {
      setIsRealoading(true);
      if ((follow as IFollowDocument)._id) {
        const removeFollowConfirm = await removeFollow(
          (follow as IFollowDocument)._id
        );
        if (removeFollowConfirm.error) {
          notifier(
            "error",
            "something went wrong removing following to this dream, please reload the page and try again... 🤕"
          );
          setIsRealoading(false);
          return null;
        } else if (removeFollowConfirm.data) {
          notifier("ok", "You unfollow this dream 😎");
          setFollow(false);
          setIsRealoading(false);
          return null;
        }
      } else {
        if (!followObj.follower) {
            console.log(followObj)
          notifier(
            "error",
            "User Id must be provided to create follow, please reload the app and try again 🤕"
          );
          setIsRealoading(false);
          return null;
        }
        const followConfirm = await followDream({
          follower: followObj.follower,
          dream: dream._id,
        });
        if (!followConfirm) {
          notifier(
            "error",
            "Something went wrong in the request. The User Id must be correct to create follow, please reload the app and try again 🤕"
          );
          setIsRealoading(false);
          return null;
        }
        if (followConfirm.error || !followConfirm.data) {
          notifier(
            "error",
            "User Id must be correct to create follow, please reload the app and try again 🤕"
          );
          setIsRealoading(false);
          return null;
        }
        notifier("ok", "You follow this dream now... 😎");
        setFollow(followConfirm.data as IFollowDocument);
        setIsRealoading(false);
        return null;
      }
    } catch (e) {
      console.log(e);
      setIsRealoading(false);
      return null;
    }
  };
  return (
    <Button
      as={"button"}
      size="sm"
      color="secondary"
      variant="light"
      className=" w-[120px] h-[15px] text-tiny sm:text-sm cursor-pointer flex justify-end items-center px-2"
      onClick={() => handleFollow()}
    >
      {follow ? "Following" : "Follow"}{" Dream "}
      {!isReloading ? "" : <Spinner size="sm" />}
    </Button>
  );
}

export default FollowDreamBtn;
