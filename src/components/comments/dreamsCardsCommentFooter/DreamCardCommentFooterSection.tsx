"use client";

import CommentBtn from "@/components/buttons/commentBtn/CommentBtn";
import React, { useEffect, useState } from "react";
import { ICommentDream, IDreamDocument } from "../../../../dreamyVerse";
import { useGetAllCommentsFoomDreamPostQuery } from "@/redux/features/api/apiSlice";
import { Skeleton } from "@nextui-org/react";
import CommentCard from "../commentCard/CommentCard";

function DreamCardCommentFooterSection({ father }: { father: IDreamDocument }) {
  const [comment, setComment] = useState<null | ICommentDream>(null);
  const { data, isLoading, isError, error } =
    useGetAllCommentsFoomDreamPostQuery(father?._id, {
      skip: !father?._id,
    });
  //
  useEffect(() => {
    if (data?.data) {
      // if (data.data[data.data.length - 1]) {
      //   setComment(data.data[data.data.length - 1] || null);
      // }
      if (data.data[0]) {
        setComment(data.data[0] || null);
      }
    }
  }, [data]);

  if (isError) {
    console.log(error);
    if ("error" in error) {
      return (
        <div className="">
          <h1>Error</h1>
          <p>{error?.error}</p>
        </div>
      );
    }
    return (
      <div className="">
        <h1>Error</h1>
        <p>{}</p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="loading-div flex flex-col gap-2">
        {[1].map((n) => (
          <div key={`skeleton-comment-${n}`}>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="w-full p-1.5">
      {!father.visibility.othersCanComment ? (
        <div className=" w-full text-center">{"The user has blocked comments"}</div>
      ) : !comment ? (
        <CommentBtn father={father} cbToggleBtn={"no comment"} />
      ) : (
        <div className=" w-full flex flex-col justify-start gap-1">
          <div className=" w-full">
            <CommentCard
              key={`comment-card-footer-post-key-${comment._id}`}
              comment={comment}
              father={father}
            />
          </div>
          <div className="see-more-dccfs w-full flex justify-center items-center">
            <CommentBtn father={father} cbToggleBtn="see more" />
          </div>
        </div>
      )}
    </div>
  );
}

export default DreamCardCommentFooterSection;
