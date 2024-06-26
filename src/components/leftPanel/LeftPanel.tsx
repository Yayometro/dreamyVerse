"use client";

import { Image } from "@nextui-org/react";
import React from "react";

function LeftPanel() {
  const imageProps = " w-[70%] h-[300px] w-[100px]s h-[100px]s xl:w-[200px] rounded-2xl";
  return (
    <div className="hidden pr-2 md:flex sm:w-[200px] md:w-[350px] lg:w-[500px] xl:w-[1000px] flex-col items-center gap-4 border-1s border-red-500s">
      <h1 className=" w-full text-center text-xl">Advertisment</h1>
      <Image
        isBlurred
        removeWrapper
        width={200}
        src="https://m.media-amazon.com/images/I/71DXUHh4AyS.jpg"
        alt="NextUI Album Cover"
        className={imageProps}
      />
      <Image
        isBlurred
        removeWrapper
        width={200}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7GGqyLOb_Y0ogIFKcRQkzxIqPA-b3uDkQKA&s"
        alt="NextUI Album Cover"
        className={imageProps}
      />
      <Image
        isBlurred
        removeWrapper
        width={200}
        src="https://cloudfront-us-east-1.images.arcpublishing.com/metroworldnews/NHJJQJXKJRAKTPO2BK5XA6RCCA.jpg"
        alt="NextUI Album Cover"
        className={imageProps}
      />
      <Image
        isBlurred
        removeWrapper
        width={200}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMsgaDVqbkJeVxGYqssxW2wpd81xhQd5gx5w&s"
        alt="NextUI Album Cover"
        className={imageProps}
      />
    </div>
  );
}

export default LeftPanel;
