"use client";
import React from "react";
import { IDreamDocument, IUserDocument } from "../../../../dreamyVerse";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Chip,
  Button,
} from "@nextui-org/react";
import ShareBtn from "@/components/buttons/shareBtn/ShareBtn";
import getTimeDifference from "@/helpers/getTimeDifference";
import ReactionsGroupAvatars from "@/components/buttons/reactionBtn/reactionsGroupAvatars/ReactionsGroupAvatars";
import DreamContentCard from "../dreamContent/DreamContentCard";
import ExternalUserSectionDreamCard from "./externalUserSectionDreamCard/ExternalUSerSectionDreamCard";
import { FaRegComment, FaRegHeart } from "react-icons/fa6";
import notifier from "@/helpers/notifier";

function ExternalDreamCard({
  dcDream,
  dcUser,
}: {
  dcDream: IDreamDocument;
  dcUser: IUserDocument;
}) {
  return (
    <div className="w-full">
      <Card
        isFooterBlurred
        className="w-full smax-w-[400px] bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
      >
        <CardHeader className="flex gap-3 justify-between bg-black/30s backdrop-blur-xls shadow-mds">
          <ExternalUserSectionDreamCard user={dcUser} />
          <div className="flex flex-col gap-1 justify-center items-center">
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
                  <Button
                    as={"button"}
                    isIconOnly
                    variant="light"
                    color="danger"
                    size="sm"
                    className=" text-default-900 p-0 cursor-pointer"
                    onClick={() => notifier("warning", "You can't like this because your are not register user. Register please 🤓")}
                  >
                    <FaRegHeart size={100} className="w-[20px] h-[20px]" />
                  </Button>
                  <Button
                    as={"button"}
                    isIconOnly
                    variant="light"
                    color="danger"
                    size="sm"
                    className=" text-default-900 p-0 cursor-pointer"
                    onClick={() => notifier("warning", "You can't comment this because your are not register user. Register please 🤓")}
                  >
                    <FaRegComment size={100} className="w-[20px] h-[20px]" />
                  </Button>
                  <ShareBtn father={dcDream} isBlocked={false} />
                  <div className="reactions-counter-displayer flex justify-center items-center">
                    <ReactionsGroupAvatars father={dcDream} type="dream" />
                  </div>
                </div>
              </div>
            )}
          </div>
          <Divider />
          <div className=" cursor-pointer" onClick={() => notifier("warning", "You can't comment this because your are not register user. Register please 🤓")}>
            <p className=" hover:underline">No comments here... click to add one</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ExternalDreamCard;
