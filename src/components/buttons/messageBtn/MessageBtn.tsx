"use client";
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
import {
  Badge,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Spinner,
} from "@nextui-org/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IUserDocument, MessageContextType } from "../../../../dreamyVerse";
import useUserNavigator from "@/hooks/useUserNavigatorId";
import { BiSolidMessageRounded } from "react-icons/bi";
import MessageCenter from "@/components/messages/messagesCenter/MessageCenter";
import MessageHistoryNavigator from "@/components/messages/messageHistoryNavigator/MessageHistoryNavigator";
import MessageTexbox from "@/components/messages/messageTextbox/MessageTexbox";
import { MessageContext } from "@/providers/messages/MessageProvider";

function MessageBtn({
  userNavigator,
  displayMode,
}: {
  userNavigator?: IUserDocument;
  displayMode?: "btn" | "full";
}) {
  const [side, setSide] = useState<
    "top" | "bottom" | "left" | "right" | null | undefined
  >("right");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const { userId } = useUserNavigator();
  //Get the context
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("SomeComponent must be used within a MessageProvider");
  }
  const {
    currentConversation,
    unreadMessagesActions,
  } = context as MessageContextType;
  const sheetRef = useRef<HTMLDivElement | null>(null);

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

  const handleSheetClose = (event: React.MouseEvent) => {
    if (sheetRef.current && sheetRef.current.contains(event.target as Node)) {
      return;
    }
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger asChild>
        {!displayMode || displayMode === "btn" ? (
          <Button
            // isIconOnly
            variant="light"
            // color="success"
            size="sm"
            className=" w-full h-full text-default-100 dark:text-default-900 p-0s px-1 cursor-pointer flex justify-center lg:justify-start items-center"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <Badge
              color="primary"
              content={unreadMessagesActions.unread.length + unreadMessagesActions.edited.length + unreadMessagesActions.removed.length + unreadMessagesActions.markedVisible.length}
              shape="circle"
              showOutline={false}
              size="sm"
            >
              <BiSolidMessageRounded size={20} className="" />
            </Badge>
            <p className=" hidden lg:block text-[16px] font-[400]">Messages</p>
          </Button>
        ) : displayMode === "full" ? (
          <Button
            isIconOnly
            variant="light"
            // color="success"
            size="sm"
            className="text-default-900 p-0 cursor-pointer"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <BiSolidMessageRounded size={20} className="" />
            <p className="md:hidden lg:block text-[16px] font-[400]">
              Messages
            </p>
          </Button>
        ) : null}
      </SheetTrigger>

      <SheetContent
        side={side}
        className={` w-full h-screen border-violet-800 md:w-[750px] md:h-full md:border-l-1 pb-[50px] shadow-inner overflow-y-auto bg-violet-50 dark:bg-black text-black dark:text-white flex flex-col ${
          side === "bottom"
            ? "rounded-3xls rounded-t-3xl"
            : "rounded-3xls rounded-l-3xl"
        }`}
      >
        <SheetHeader className="w-full h-fit">
          <SheetTitle className="text-black dark:text-white">
            Message Center 💬
            <div className="flex justify-start items-center pt-2">
            <MessageHistoryNavigator />
            </div>
          </SheetTitle>
          <SheetDescription className="w-full flex justify-center items-center py-2">
          </SheetDescription>
        </SheetHeader>
        <div className="body-comment w-full h-full overflow-y-auto flex flex-col justify-between items-start">
          <MessageCenter userId={userId as string} />
          <div className="footer-block h-[20px] w-full fixed bottom-0 bg-slate-100 dark:bg-black shadow-lg"></div>
        </div>
        <SheetFooter className="sheet-footer-messenger absolute bottom-3 left-0 w-full pt-1 pb-2 px-4">
          {currentConversation && <MessageTexbox />}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default MessageBtn;
