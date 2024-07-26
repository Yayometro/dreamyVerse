"use client";

import React from "react";
import { FacebookShareButton, TwitterShareButton, PinterestShareButton, WhatsappShareButton, TelegramShareButton } from "react-share";
import { IDreamDocument } from "../../../../dreamyVerse";
import { Button } from "@nextui-org/react";
import { MdFacebook } from "react-icons/md";
import { FaPinterest, FaSquareXTwitter, FaTelegram, FaWhatsapp } from "react-icons/fa6";

function ShareContainerBtns({ father }: { father: IDreamDocument }) {
  const baseUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL
  return (
    <div className=" flex gap-2">
      <Button
        as={"button"}
        isIconOnly
        variant="light"
        color="secondary"
        size="sm"
        className=" text-default-900 p-0 cursor-pointer"
      >
        <FacebookShareButton
          url={`${baseUrl}/externalPosts/${father._id}`}
          title={`${father.title || father.dream?.slice(0, 15)}`}
        >
          <MdFacebook size={100} className="w-[20px] h-[20px]" />
        </FacebookShareButton>
      </Button>
      <Button
        as={"button"}
        isIconOnly
        variant="light"
        color="secondary"
        size="sm"
        className=" text-default-900 p-0 cursor-pointer"
      >
        <TwitterShareButton
          url={`${baseUrl}/externalPosts/${father._id}`}
          title={`${father.title || father.dream?.slice(0, 15)}`}
        >
          <FaSquareXTwitter size={100} className="w-[20px] h-[20px]" />
        </TwitterShareButton>
      </Button>
      <Button
        as={"button"}
        isIconOnly
        variant="light"
        color="secondary"
        size="sm"
        className=" text-default-900 p-0 cursor-pointer"
      >
        <PinterestShareButton
          url={`${baseUrl}/externalPosts/${father._id}`}
          title={`${father.title || father.dream?.slice(0, 15)}`}
          media={`${father.image}`}
        >
          <FaPinterest size={100} className="w-[20px] h-[20px]" />
        </PinterestShareButton>
      </Button>
      <Button
        as={"button"}
        isIconOnly
        variant="light"
        color="secondary"
        size="sm"
        className=" text-default-900 p-0 cursor-pointer"
      >
        <WhatsappShareButton
          url={`${baseUrl}/externalPosts/${father._id}`}
          title={`${father.title || father.dream?.slice(0, 15)}`}
        >
          <FaWhatsapp size={100} className="w-[20px] h-[20px]" />
        </WhatsappShareButton>
      </Button>
      <Button
        as={"button"}
        isIconOnly
        variant="light"
        color="secondary"
        size="sm"
        className=" text-default-900 p-0 cursor-pointer"
      >
        <TelegramShareButton
          url={`${baseUrl}/externalPosts/${father._id}`}
          title={`${father.title || father.dream?.slice(0, 15)}`}
        >
          <FaTelegram size={100} className="w-[20px] h-[20px]" />
        </TelegramShareButton>
      </Button>
    </div>
  );
}

export default ShareContainerBtns;
