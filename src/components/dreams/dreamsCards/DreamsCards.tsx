"use client";
import React from "react";
import { IDreamDocument, IUserDocument } from "../../../../dreamyVerse";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  User,
  Button,
  Chip,
} from "@nextui-org/react";
import SkeletonCard from "@/components/skeletons/card/CardSkeleton";
import dayjs from "dayjs";
import ReactionButton from "@/components/buttons/reactionBtn/ReactionButton";
import CommentBtn from "@/components/buttons/commentBtn/CommentBtn";
import ShareBtn from "@/components/buttons/shareBtn/ShareBtn";
import SaveBtn from "@/components/buttons/saveBtn/SaveBtn";
import DreamCardCommentFooterSection from "@/components/comments/dreamsCardsCommentFooter/DreamCardCommentFooterSection";
import getTimeDifference from "@/helpers/getTimeDifference";
import ReactionsGroupAvatars from "@/components/buttons/reactionBtn/reactionsGroupAvatars/ReactionsGroupAvatars";
import UserSectionDreamCard from "@/components/user/userSectionDreamCard/UserSectionDreamCard";
import FollowDreamBtn from "@/components/buttons/followDreamBtn/FollowDreamBtn";
import ActionBtnDreamCards from "@/components/buttons/actionBtnDreamCards/ActionBtnDreamCards";
import DreamContentCard from "../dreamContent/DreamContentCard";
import useUserNavigator from "@/hooks/useUserNavigatorId";
import DreamBlocked from "../dreamBlocked/DreamBlocked";

function DreamsCards({
  dcDream,
  dcUser,
  navigatorUser,
}: {
  dcDream: IDreamDocument;
  dcUser: IUserDocument;
  navigatorUser: string;
}) {
  return (
    <div className="w-full">
      {!dcDream || !dcDream._id || !dcUser ? (
        <SkeletonCard />
      ) : (dcDream.visibility.isPublic && !dcDream.visibility.visibleFor) ||
        (dcDream.visibility.isPublic &&
          dcDream.visibility.visibleFor &&
          dcDream.visibility.visibleFor.length <= 0) ||
        (dcDream.visibility.visibleFor &&
          dcDream.visibility.visibleFor.length >= 1 &&
          dcDream.visibility.visibleFor.some((id) => id === navigatorUser)) ||
        dcUser._id === navigatorUser ? (
        <Card
          isFooterBlurred
          className="w-full smax-w-[400px] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
        >
          <CardHeader className="flex gap-3 justify-between bg-black/30s backdrop-blur-xls shadow-mds">
            <UserSectionDreamCard user={dcUser} dream={dcDream} />
            <div className="flex flex-col gap-1 justify-center items-center">
              <FollowDreamBtn dream={dcDream} />
              <p className=" w-full text-[10px] sm:text-[12px] text-default-700 text-end px-2">
                {dcDream.date ? getTimeDifference(dcDream.date) : "-no time-"}
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className=" p-0">
            {!dcDream.title ? (
              ""
            ) : (
              <div className="title-card">
                <h1 className=" text-lg md:text-2xl font-thin flex justify-center py-1">
                  {dcDream.title}
                </h1>
                <Divider />
              </div>
            )}
            <div className="body-card-content text-sm md:text-base p-1">
              <div className="dcc-content">
                <DreamContentCard content={dcDream?.dream as string} />
              </div>
            </div>
            {!dcDream.image ? (
              ""
            ) : (
              <div className=" relative">
                <Image
                  removeWrapper
                  isBlurred
                  alt={`dreamyVerse-${dcUser.username}-dreamImgPost`}
                  className="w-full h-full rounded-none"
                  src={!dcDream.image ? "" : dcDream.image}
                />
              </div>
            )}
            <Divider />
            <div className="bcc-additional-content flex gap-2 items-center py-1 px-1">
              <p className=" text-sm pr-2 text-default-500">
                Additional information:{" "}
              </p>
              <Chip
                color="secondary"
                radius="full"
                variant="flat"
                size="sm"
                className="h-[15px]"
              >
                {!dcDream.isLucid ? "No lucid" : "Lucid dream"}
              </Chip>
              <Chip
                color="primary"
                radius="full"
                variant="flat"
                size="sm"
                className="h-[15px]"
              >
                {!dcDream.category ? "No category" : dcDream.category}
              </Chip>
            </div>
          </CardBody>
          <Divider />
          <CardFooter className=" flex flex-col p-1">
            <div className="dc-interaction-section w-full">
              {!dcDream._id ? (
                "No reactions, because ID is undefined..."
              ) : (
                <div className=" w-full px-1 pb-1 flex flex-row justify-between items-center gap-1">
                  <div className="dcBox-one flex gap-1 items-center">
                    {/* Here reactions secction */}
                    <ReactionButton father={dcDream} type="dream" />
                    {/* Here comment button */}
                    <CommentBtn father={dcDream} cbToggleBtn={"btn"} />
                    {/* Here share secction */}
                    {!dcDream.visibility.othersCanShare ? (
                      <ShareBtn father={dcDream} isBlocked={true} />
                    ) : dcUser?._id === navigatorUser ? (
                      <ShareBtn father={dcDream} isBlocked={false} />
                    ) : (
                      <ShareBtn father={dcDream} isBlocked={false} />
                    )}
                    <div className="reactions-counter-displayer flex justify-center items-center">
                      <ReactionsGroupAvatars father={dcDream} type="dream" />
                    </div>
                  </div>
                  <div className="dcBox-two flex gap-1 items-center">
                    <SaveBtn father={dcDream} />
                  </div>
                </div>
              )}
            </div>
            <Divider />
            <div className="actions-card-section w-full">
              <ActionBtnDreamCards dream={dcDream} userPost={dcUser} />
            </div>
            <DreamCardCommentFooterSection father={dcDream} />
          </CardFooter>
        </Card>
      ) : (
        <DreamBlocked userAutor={dcUser} dreamId={dcDream._id} />
      )}
    </div>
  );
}

export default DreamsCards;
