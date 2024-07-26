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
import { IDreamDocument, IUserDocument } from "../../../../dreamyVerse";
import { MdEdit } from "react-icons/md";
import { BsFillSearchHeartFill } from "react-icons/bs";
import SearchClient from "@/components/search/SearchClient";

function SearchBtn({
  userNavigator,
  displayMode,
}: {
  userNavigator?: IUserDocument;
  displayMode?: "btn" | "full";
}) {
  const [activeSearchSection, setActiveSearchSection] =
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
    setActiveSearchSection(false);
  };
  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger asChild>
        {!displayMode || displayMode === "btn" ? (
          <Button
            // isIconOnly
            variant="light"
            color="success"
            size="sm"
            className=" w-full h-full text-default-900 p-0s px-1 cursor-pointer flex justify-center lg:justify-start items-center"
            onClick={() => { 
              setActiveSearchSection(true);
              setIsOpen(true);
            }}
          >
            <BsFillSearchHeartFill size={20} className="" />
            <p className="md:hidden lg:block text-[16px] font-[400]">Search</p>
          </Button>
        ) : displayMode === "full" ? (
          <Button
            isIconOnly
            variant="light"
            color="success"
            size="sm"
            className="text-default-900 p-0 cursor-pointer"
            onClick={() => {
              setActiveSearchSection(true);
              setIsOpen(true);
            }}
          >
            <BsFillSearchHeartFill size={20} className="" />
            <p className="md:hidden lg:block text-[16px] font-[400]">Search</p>
          </Button>
        ) : null}
        
      </SheetTrigger>

      <SheetContent
        side={side}
        className="w-full h-[90%] border-violet-800 md:w-[750px] md:h-full md:border-l-1 rounded-3xl pb-[50px] shadow-inner overflow-y-auto"
      >
        <SheetHeader>
          <SheetTitle>Search for anything...</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="body-comment w-full overflow-y-auto flex flex-col justify-between items-start">
          {!activeSearchSection ? (
            ""
          ) : (
            <SearchClient />
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

export default SearchBtn;
