import React, { useState } from "react";
import { IUserDocument } from "../../../../dreamyVerse";
import { useCreateNotificationMutation } from "@/redux/features/api/apiSlice";
import { Spinner } from "@nextui-org/react";
import notifier from "@/helpers/notifier";
import useUserNavigator from "@/hooks/useUserNavigatorId";

function DreamBlocked({
  dreamId,
  userAutor,
}: {
  dreamId: string;
  userAutor: IUserDocument;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createNotify] = useCreateNotificationMutation();
  const {user} = useUserNavigator()

  const handleRequest = async () => {
    try {
      setIsLoading(true);
      let newNotification
      if(!user){
        notifier("error", "Unable to continue since the userNavigator is null or undefined... 🚨")
        return null
      }
       newNotification = {
        user: userAutor._id,
        type: "dream",
        redirectionalId: dreamId,
        message: `${user.username} has requested access to one of your dreams. Click here to be redirected to that dream and add this user or remove this notification.`,
        action:  `dashboard/dreams/${dreamId}?qSetVisibilityFor=${encodeURIComponent(user._id)}&qMessage=${encodeURIComponent(`The user ${user.username} is requesting access to see this dream. If you are ok, just save the changes, but if you don't then just ignore this or press in close.`)}`,
        read: false,
      };
      const confirmation = await createNotify(newNotification)
      if(!confirmation || !confirmation.data || confirmation.error){
        console.log(confirmation)
        let message
        if( confirmation.error && "message" in confirmation){
            message = confirmation.message
        }
        message = "Something went wrong requesting the access. Please reload the page and try again later... 🤕"
        notifier("error", message)
        return null
      }
      notifier("ok", `The request to grant you access to this dream has been sent to ${userAutor.username} for approval 😎`)
      setIsLoading(false);
      return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  return (
    <div className="w-full h-full bg-slate-200 dark:bg-slate-900 py-8 px-2 rounded-lg flex flex-col justify-center items-center">
      <p className=" py-2">{`User ${userAutor.username} blocked this dream as private`}</p>
      <p className=" text-4xl">🙅‍♂️</p>
      <div
        className="cursor-pointer hover:underline mt-6 text-violet-800 dark:text-violet-500 flex flex-col items-center justify-center"
        onClick={handleRequest}
      >
        {isLoading ? <Spinner size="md" /> : ""}
        <p>
          Click here to request access for this dream to {userAutor.username}
        </p>
      </div>
    </div>
  );
}

export default DreamBlocked;
