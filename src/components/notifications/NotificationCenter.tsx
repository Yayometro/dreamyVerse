// import useUserNavigator from '@/hooks/useUserNavigatorId';
// import socket from '@/lib/socket';
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { INotification } from "../../../dreamyVerse";
import { useRemoveNotificationMutation } from "@/redux/features/api/apiSlice";
import notifier from "@/helpers/notifier";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function NotificationCenter({
  notifications,
  handleClose
}: {
  notifications: INotification[] | [];
  handleClose: (close: boolean) => void
}) {
  const [deleteNotification] = useRemoveNotificationMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter()
  const handleDeleteNotification = async (id: string) => {
    try {
      setIsLoading(true);
      const removedConfirmation = await deleteNotification(id);
      let message;
      if (
        !removedConfirmation ||
        removedConfirmation.error ||
        "message" in removedConfirmation
      ) {
        message = removedConfirmation.error || removedConfirmation.message;
        notifier("error", `${message}`);
        setIsLoading(false);
      } else {
          notifier("ok", `${"message" in removedConfirmation ? removedConfirmation?.message : "Notifications was removed successfully 😎"}`);
          setIsLoading(false);
          return null;
      }
      
    } catch (e) {
      setIsLoading(false);
      return null;
    }
  };

  const handleNotificationClicked = async (notification: INotification) => {
    if(notification.action){
      handleClose(false)
      router.push(`${notification.action}`)
      return null
    }
    handleClose(false)
    router.push(`${notification.type === "dream" ? "dashboard/dreams" : notification.type === "user" ? "dashboard/profile" : ""
  }/${notification.redirectionalId}`)
  }

  return (
    <div className="notifications flex flex-col justify-center items-center gap-2">
      {notifications.length <= 0 ? (
        <div className=" w-full flex justify-center items-center py-[50px] px-2">
          <p className="">No notifications here... 👌</p>
        </div>
      ) : (
        notifications.map((notification, index) => (
          <div
            key={index}
            className="notification border-1 rounded-lg border-violet-600 flex justify-between items-center gap-1.5 hover:bg-violet-200 dark:hover:bg-violet-950/50"
          >
              <div
                className=" cursor-pointer p-2"
                onClick={() => handleNotificationClicked(notification)}
              >
                <p className="">{notification.message}</p>
              </div>
            <div className="divider border-l-1 border-violet-600 h-full">
              <div
                className="w-[30px] text-red-500 hover:text-red-300 dark:hover:text-red-300 border-1s rounded-fulls p-1 cursor-pointer"
                onClick={() => handleDeleteNotification(notification._id)}
              >
                {isLoading ? <Spinner size="sm" /> : <MdDelete size={20} />}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default NotificationCenter;
