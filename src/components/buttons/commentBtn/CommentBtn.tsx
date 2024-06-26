"use client";
import CommentSliderPopUp from "@/components/comments/commentSlider/CommentSliderPopUp";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa6";
import { ICommentDream, IDreamDocument } from "../../../../dreamyVerse";
import { MdEdit } from "react-icons/md";

function CommentBtn({
  father,
  cbToggleBtn,
  edition,
}: {
  father: IDreamDocument;
  cbToggleBtn?: "btn" | "no comment" | "see more" | "edition";
  edition?: ICommentDream;
}) {
  const [activeCommentSection, setActiveCommentSection] =
    useState<boolean>(false);
  const [side, setSide] = useState<
    "top" | "bottom" | "left" | "right" | null | undefined
  >("right");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSide("bottom");
      } else {
        setSide("right");
      }
    };
    // Set the initial value based on the current window size
    handleResize();
    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSheetClose = () => {
    setIsOpen(false);
    setActiveCommentSection(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger asChild>
        {!cbToggleBtn || cbToggleBtn === "no comment" ? (
          <div
            className="cursor-pointer hover:text-violet-600"
            onClick={() => {
              setActiveCommentSection(true);
              setIsOpen(true);
            }}
          >
            No comments here... click to add one
          </div>
        ) : cbToggleBtn === "btn" ? (
          <Button
            isIconOnly
            variant="light"
            color="success"
            size="sm"
            className="text-default-900 p-0 cursor-pointer"
            onClick={() => {
              setActiveCommentSection(true);
              setIsOpen(true);
            }}
          >
            <FaRegComment size={100} className="w-[20px] h-[20px]" />
          </Button>
        ) : cbToggleBtn === "edition" ? (
          <Button
            isIconOnly
            variant="light"
            color="success"
            size="sm"
            className="text-default-900 p-0 cursor-pointer"
            onClick={() => {
              setActiveCommentSection(true);
              setIsOpen(true);
            }}
          >
            <MdEdit size={100} className="w-[20px] h-[20px]" />
          </Button>
        ) : cbToggleBtn === "see more" ? (
          <div
            className="cursor-pointer hover:text-violet-700 dark:hover:text-violet-300 hover:underline text-[12px]"
            onClick={() => {
              setActiveCommentSection(true);
              setIsOpen(true);
            }}
          >
            See more comments...
          </div>
        ) : null}
      </SheetTrigger>

      <SheetContent
        side={side}
        className="w-full h-[90%] border-violet-800 md:w-[400px] md:h-full md:border-l-1 rounded-3xl pb-[50px] shadow-inner overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>Comment section</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="body-comment w-full overflow-y-auto flex flex-col justify-between items-start">
          {!father.visibility.othersCanComment ? (
            <div className=" w-full text-center flex flex-col gap-2">
              {"The user has blocked comments"}
              <p className=" text-4xl">🙅‍♂️</p>
            </div>
          ) : !activeCommentSection ? (
            ""
          ) : (
            <CommentSliderPopUp
              father={father}
              edition={!edition ? null : edition}
              closer={handleSheetClose}
            />
          )}
          <div className="footer-block h-[20px] w-full fixed bottom-0 bg-slate-100 dark:bg-black shadow-lg"></div>
        </div>
        <SheetFooter className="">
          {/* <SheetClose asChild onClick={handleSheetClose}>
            <Button variant="light">Close</Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default CommentBtn;
