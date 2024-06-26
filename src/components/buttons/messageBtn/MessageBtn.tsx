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
import React, { useEffect, useState } from "react";
import { IUserDocument } from "../../../../dreamyVerse";
import socket from "@/lib/socket";
import useUserNavigator from "@/hooks/useUserNavigatorId";
import { BiSolidMessageRounded } from "react-icons/bi";
import MessageCenter from "@/components/messages/messagesCenter/MessageCenter";
import MessageHistoryNavigator from "@/components/messages/messageHistoryNavigator/MessageHistoryNavigator";

function MessageBtn({
  userNavigator,
  displayMode,
}: {
  userNavigator?: IUserDocument;
  displayMode?: "btn" | "full";
}) {
  const [activeConversationList, setActiveConversationList] =
    useState<boolean>(false);
  const [side, setSide] = useState<
    "top" | "bottom" | "left" | "right" | null | undefined
  >("right");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [unreadMessages, setUnreadMessages] = useState<any[]>([]);
  const { userId } = useUserNavigator();
  //   const { data, error, isLoading, isError } = useGetAllUserNotificationsQuery(
  //     userId,
  //     {
  //       skip: !userId,
  //     }
  //   );

  //   useEffect(() => {
  //     socket.on("notification", (notification) => {
  //       console.log(notification)
  //       setNotifications((prev) => [...prev, notification]);
  //     });

  //     return () => {
  //       console.log(socket)
  //       socket.off("notification");
  //     };
  //   }, []);

  //   useEffect(() => {
  //     if (data) {
  //       setNotifications(data.data);
  //     } else if (isError || isLoading) {
  //       console.log(error);
  //       console.log(isLoading);
  //     }
  //   }, [data, isLoading, isError, error]);

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
              setActiveConversationList(true);
              setIsOpen(true);
            }}
          >
            <Badge
              color="primary"
              content={unreadMessages.length}
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
              setActiveConversationList(true);
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
        className={`w-full h-[97%] border-violet-800 md:w-[750px] md:h-full md:border-l-1 pb-[50px] shadow-inner overflow-y-auto bg-violet-50 dark:bg-black text-black dark:text-white ${
          side === "bottom"
            ? "rounded-3xls rounded-t-3xl"
            : "rounded-3xls rounded-l-3xl"
        }`}
      >
        <SheetHeader>
          <SheetTitle className="text-black dark:text-white">
            Message Center 💬
            <div className="flex justify-start items-center pt-2">
            <MessageHistoryNavigator />
            </div>
          </SheetTitle>
          <SheetDescription className="w-full flex justify-center items-center py-2">
          </SheetDescription>
        </SheetHeader>
        <div className="body-comment w-full overflow-y-auto flex flex-col justify-between items-start">
          <MessageCenter userId={userId as string} />
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

export default MessageBtn;
