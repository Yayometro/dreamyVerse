"use client";

import { useGetUserDreamsLengthQuery } from "@/redux/features/api/apiSlice";
import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@nextui-org/react";

function GetUserDreamsLengthBtn({ userId }: { userId: string }) {
  const [dreamsLength, setDreamsLength] = useState<number>(0);
  const { error, isError, isLoading, data } = useGetUserDreamsLengthQuery(
    userId,
    {
      skip: !userId,
    }
  );

  useEffect(() => {
    if (data?.data) {
      setDreamsLength(data?.data);
    } else if (isLoading || isError) {
      // console.log(error)
    }
  }, [isError, isLoading, data]);

  return (
    <Button size="sm" variant="light" className=" text-black dark:text-white w-[10px] h-full p-0 flex flex-col gap-2 sm:flex-row">
     {/* <p className=""> */}
      <p className=" text-sm">{dreamsLength} </p>
      <p>Dreams </p>
      {!isLoading ? "" : <Spinner size="sm" />}
    {/* </p> */}
    </Button>
  );
}

export default GetUserDreamsLengthBtn;
