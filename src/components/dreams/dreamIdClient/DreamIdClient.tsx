"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { IDreamDocument, IUserDocument } from "../../../../dreamyVerse";
import DreamsCards from "../dreamsCards/DreamsCards";
import useUserNavigator from "@/hooks/useUserNavigatorId";
import DreamsGenerator from "../dreamsGenerator/DreamsGenerator";
import { MdClose } from "react-icons/md";
import { useGetDreamQuery } from "@/redux/features/api/apiSlice";
import SkeletonCard from "@/components/skeletons/card/CardSkeleton";

function DreamIdClient({ dreamId }: { dreamId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const searchParams = useSearchParams();
  const qSetVisibilityFor = searchParams.get("qSetVisibilityFor");
  const qMessage = searchParams.get("qMessage");
  const { userId } = useUserNavigator();
  const { isError, error, isLoading, data } = useGetDreamQuery(dreamId);

  useEffect(() => {
    if (qSetVisibilityFor) {
      setIsModalOpen(true);
    }
    if (qMessage) {
      setIsMessage(true);
    }
  }, [qSetVisibilityFor, qMessage]);

  useEffect(() => {
    if (data) {
      console.log(data.data);
    }
  }, [data]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (isLoading) {
    return (
      <div className="w-full md:w-[450px] lg:w-[600px] xl:w-[1000px] borderñ border-red-400s flex flex-col gap-2">
        <SkeletonCard />
      </div>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <div className=" w-full w-max-[1200px] flex justify-center items-center">
        <p className=" text-base">
          No dream loaded from server. Please reload the page and try again
          later... 🤕
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {!data ? (
        <div className=" w-full w-max-[1200px] flex justify-center items-center">
          <p className=" text-base">
            No dream loaded from server. Please reload the page and try again
            later... 🤕
          </p>
        </div>
      ) : (
        <div className="dream-container-id w-full max-w-5xl flex justify-center items-start lg:pl-4">
          {!isMessage ? (
            ""
          ) : (
            <div className="message-section text-base bg-violet-500 text-white absolute top-0 left-0 w-full py-4 px-2 z-[40] flex justify-between">
              <p className=" text-wrap">{qMessage}</p>
              <div
                className="w-[20px] h-[20px] flex justify-center items-center p-0.5 border-1 border-white rounded-full hover:text-red-600 hover:border-red-600 cursor-pointer"
                onClick={() => setIsMessage(false)}
              >
                <MdClose size={20} />
              </div>
            </div>
          )}
          <div className="cardsContainer w-full max-w-2xl flex justify-center items-center">
            <DreamsCards
              dcDream={data.data}
              dcUser={(data.data as IDreamDocument).user as IUserDocument}
              navigatorUser={userId as string}
            />
            {!isModalOpen ? (
              ""
            ) : (
              <DreamsGenerator
                dgIsOpen={isModalOpen}
                dgOnClose={closeModal}
                onEditionDream={data.data}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DreamIdClient;
