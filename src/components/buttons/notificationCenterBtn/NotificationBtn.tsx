"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge, Button, Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { MdNotifications } from "react-icons/md";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import useUserNavigator from "@/hooks/useUserNavigatorId";
import {
  useGetAllUserNotificationsQuery,
  useRemoveAllNotificationsMutation,
} from "@/redux/features/api/apiSlice";
import { useSocket } from "@/providers/notifications/NotificationsProvider";
import notifier from "@/helpers/notifier";
import { IUserDocument } from "../../../../dreamyVerse";

function NotificationBtn({
  userNavigator,
  displayMode,
}: {
  userNavigator?: IUserDocument;
  displayMode?: "btn" | "full";
}) {
  const [activeNotifySection, setActiveNotifySection] = useState<boolean>(false);
  const [side, setSide] = useState<"top" | "bottom" | "left" | "right" | null | undefined>("right");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const { userId } = useUserNavigator();
  const { data, error, isLoading, isError, refetch } = useGetAllUserNotificationsQuery(
    userId,
    {
      skip: !userId,
    }
  );
  const [clearNotifications] = useRemoveAllNotificationsMutation();
  const { notifications, setNotifications } = useSocket();

  useEffect(() => {
    if (data) {
      setNotifications(data.data);
      refetch()
    } else if (isError || isLoading) {
      // console.log(error);
      // console.log(isLoading);
    }
  }, [data, isLoading, isError, error]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSide("bottom");
      } else {
        setSide("right");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSheetClose = () => {
    setIsOpen(false);
    setActiveNotifySection(false);
  };

  const handleClearAll = async () => {
    try {
      setIsLoadingMore(true);
      const confirmAllClear = await clearNotifications(userId);
      if (!confirmAllClear) {
        console.log(confirmAllClear);
        setIsLoadingMore(false);
        notifier(
          "error",
          "Something went wrong trying to delete all the notifications, please reload the page or try again later... 🤕"
        );
      }
      setNotifications([])
      notifier("ok", "All notifications removed 👌");
      setIsLoadingMore(false);
      return null;
    } catch (e) {
      console.log(e);
      setIsLoadingMore(false);
      return null;
    }
  };
  return (
    <Sheet open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <SheetTrigger asChild>
        {!displayMode || displayMode === "btn" ? (
          <Button
            variant="light"
            size="sm"
            className=" w-full h-full text-default-100 dark:text-default-900 p-0s px-1 cursor-pointer flex justify-center lg:justify-start items-center"
            onClick={() => {
              setActiveNotifySection(true);
              setIsOpen(true);
            }}
          >
            <Badge
              color="danger"
              content={notifications.length}
              shape="circle"
              showOutline={false}
              size="sm"
            >
              <MdNotifications size={20} className="" />
            </Badge>
            <p className=" hidden lg:block text-[16px] font-[400]">
              Notifications
            </p>
          </Button>
        ) : displayMode === "full" ? (
          <Button
            isIconOnly
            variant="light"
            size="sm"
            className="text-default-900 p-0 cursor-pointer"
            onClick={() => {
              setActiveNotifySection(true);
              setIsOpen(true);
            }}
          >
            <MdNotifications size={20} className="" />
            <p className="md:hidden lg:block text-[16px] font-[400]">
              Notifications
            </p>
          </Button>
        ) : null}
      </SheetTrigger>

      <SheetContent
        side={side}
        className="w-full h-[90%] border-violet-800 md:w-[750px] md:h-full md:border-l-1 rounded-3xl pb-[50px] shadow-inner overflow-y-auto bg-violet-50 dark:bg-black text-black dark:text-white"
      >
        <SheetHeader>
          <SheetTitle className="text-black dark:text-white">
            Notifications Center 🪄
          </SheetTitle>
          <SheetDescription className="w-full flex justify-center items-center py-2">
            <Button
              variant="light"
              onClick={handleClearAll}
              className=" w-full flex gap-2 text-black dark:text-white bg-violet-300 dark:bg-violet-900 hover:bg-violet-400 dark:hover:bg-violet-800"
            >
              <p>Clear all notifications</p>
              {isLoadingMore ? <Spinner size="sm" /> : ""}
            </Button>
          </SheetDescription>
        </SheetHeader>
        <div className="body-comment w-full overflow-y-auto flex flex-col justify-between items-start">
          <NotificationCenter
            notifications={notifications}
            handleClose={(close) => handleSheetClose()}
          />
          <div className="footer-block h-[20px] w-full fixed bottom-0 bg-slate-100 dark:bg-black shadow-lg"></div>
        </div>
        <SheetFooter className="">
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default NotificationBtn;
