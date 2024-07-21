"use client"
import React, { ChangeEvent, useEffect, useState } from "react";
import { IFollowDocument, IUserDocument } from "../../../../dreamyVerse";
import { Input, Spacer, Spinner } from "@nextui-org/react";
import fetcherFetch from "@/helpers/fetcher";
import { SearchIcon } from "lucide-react";
import MiniUserItemList from "@/components/buttons/user/miniUserItemList/MiniUserItemList";
import { TiDeleteOutline } from "react-icons/ti";
import notifier from "@/helpers/notifier";
import { useGetUserFollowersQuery } from "@/redux/features/api/apiSlice";
import useUserNavigator from "@/hooks/useUserNavigatorId";

function UserFollowersSelctor({
  className,
  setSelections,
  onEditionProp,
}: {
  className?: string;
  setSelections: (arr: [] | IUserDocument[]) => void;
  onEditionProp: [] | string[]
}) {
  const [usersSelected, setUsersSelected] = useState<[] | IUserDocument[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userId } = useUserNavigator();

  const [followersList, setFollowersList] = useState<[] | IFollowDocument[]>([]);
  const { error, isError, isLoading, data } = useGetUserFollowersQuery(userId, {
    skip: !userId,
  });
   const fetcher = fetcherFetch();

  useEffect(() => {
    if(onEditionProp && onEditionProp.length >= 1){
      fetcher.post("user/getUsersById", { idsArray: onEditionProp})
        .then(data => {
            setUsersSelected(data.data)
        })
        .catch(error => {
            console.log(error)
        })
    } else  {
        setUsersSelected([])
    }

  },[onEditionProp])

  useEffect(() => {
    if (data?.data) {
      setFollowersList(data.data);
    } else if (isLoading || isError) {
      console.log(error);
    }
  }, [isError, isLoading, data]);

 const handleSelectedUser = (user: IUserDocument) => {
    const isUserRepeated = usersSelected.some(
      (userSelected) => userSelected._id === user._id
    );
    if (isUserRepeated) {
      notifier("warning", "The user selected can't be repeated to notify 🚨");
      setQuery("");
      setIsDropdownOpen(false);
      return null;
    }
    setUsersSelected((prev) => [...prev, user]);
    setQuery("");
    setIsDropdownOpen(false);
    setSelections([...usersSelected, user]);
  };

  const handleInputClick = () => {
    setIsDropdownOpen(true); 
  };
  const handleUserSelectedDelete = (id: string) => {
    const updatedUserSelected = usersSelected.filter((user) => user._id !== id);
    setUsersSelected(updatedUserSelected);
    setSelections(updatedUserSelected);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Filtrar la lista de seguidores en función del query
  const filteredFollowers = followersList.filter((follow) => {
    const user = follow.follower as IUserDocument;
    return (
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.mail.toLowerCase().includes(query.toLowerCase()) ||
      user.name?.toLowerCase().includes(query.toLowerCase())
    );
  });

  const inputContinerStyles =
    "w-[80%] flex gap-2 p-1.5 border-1 border-default-500 rounded-2xl p-2 flex-wrap";
  return (
    <div className="relative" >
      <Spacer y={2} />
      <div
        className="w-full py-1.5"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <Input
          label="Search"
          isClearable
          radius="lg"
          className="relative p-1"
          placeholder="Set visibility for..."
          startContent={
            <SearchIcon
              className="text-black/50 p-1 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
              size={25}
            />
          }
          onClick={handleInputClick}
          onChange={handleInputChange}
          value={query}
          onClear={() => setQuery("")}
        />
        {isDropdownOpen && (
          <div
            className="options-displayer max-h-[400px] w-[70%] absolute top-[70px] shadow-lg left-2 rounded-lg bg-white dark:bg-slate-900 z-[60] flex flex-col items-center justify-center gap-3 py-1.5 px-1 overflow-y-auto"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            {filteredFollowers.length === 0 ? (
              isLoading ? (
                <div className="p-4 text-center">
                  <Spinner size="sm" /> Searching...
                </div>
              ) : (
                <div className="p-4">No users found...</div>
              )
            ) : (
              filteredFollowers.map((follow) => (
                <div
                  className=" cursor-pointer hover:underline p-2 hover:bg-gray-200 dark:hover:bg-black/30 rounded-md w-[80%]"
                  key={(follow.follower as IUserDocument)._id}
                  onClick={() => handleSelectedUser(follow.follower as IUserDocument)}
                >
                  <div className=" pointer-events-none">
                    <MiniUserItemList user={follow.follower as IUserDocument} />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      {usersSelected.length <= 0 ? (
        <div className=" pl-4 text-sm">
          <p>No users selected...</p>
        </div>
      ) : (
        <div className="w-full px-4">
          <div className={className || inputContinerStyles}>
            {usersSelected.map((user) => (
              <div
                className=" py-0.5 px-1.5 border-1 rounded-lg border-violet-600 text-sm flex gap-1.5"
                key={`user-selected-${user._id}`}
              >
                <p className="">{user.username}</p>
                <div
                  className="flex justify-center item-center cursor-pointer"
                  onClick={() => handleUserSelectedDelete(user._id)}
                >
                  <TiDeleteOutline size={20} className=" text-red-500 " />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserFollowersSelctor;
