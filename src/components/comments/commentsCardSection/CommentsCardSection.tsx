"use client";
import { useGetAllCommentsFoomDreamPostQuery } from "@/redux/features/api/apiSlice";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ICommentDream, IDreamDocument } from "../../../../dreamyVerse";
import CommentCard from "../commentCard/CommentCard";

function CommentsCardSection({ father }: { father: IDreamDocument }) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { data: session } = useSession();
  const [comments, setComments] = useState<[] | ICommentDream[]>([]);

  
  //   Use skip to conditionally skip the query until userEmail is available
  const { data, isLoading, isError, error } =
  useGetAllCommentsFoomDreamPostQuery(father._id);
  //
  useEffect(() => {
    if (data?.data) {
      setComments(data.data);
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
        {[1, 2, 3].map((n) => (
          <div key={`skeleton-comment-${n}`}>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {!comments
        ? "No comments here..."
        : comments.map((comment) => (<CommentCard key={`comment-card-post-key-${comment._id}`} comment={comment} father={father}/>
          ))}
    </div>
  );
}

export default CommentsCardSection;
