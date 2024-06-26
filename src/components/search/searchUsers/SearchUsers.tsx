import UserFollowCard from "@/components/user/userFollowCard/UserFollowCard";
import fetcherFetch from "@/helpers/fetcher";
import { Input, Spinner } from "@nextui-org/react";
import React, { useContext, useEffect, useState } from "react";
import { IConversation, IUserDocument } from "../../../../dreamyVerse";
import { MessageContext } from "@/providers/messages/MessageProvider";
import useUserNavigator from "@/hooks/useUserNavigatorId";
import notifier from "@/helpers/notifier";
import { useCreateUserConversationMutation } from "@/redux/features/api/apiSlice";

function SearchUsers() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<[] | IUserDocument[]>([]);
  const fetcher = fetcherFetch();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSelection, setIsLoadingSelection] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const context = useContext(MessageContext);
  const [createConversation] = useCreateUserConversationMutation();

  if (!context) {
    throw new Error("SomeComponent must be used within a SearchUser");
  }

  const {
    setUserSelectedConversation,
    setCurrentConversation,
    handleConversationClick,
  } = context;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        setIsLoading(true);
        fetcher
          .get(`search/generalSearch?q=${query}`)
          .then((response) => {
            setResults(response.data.users);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            console.error(error);
          });
      }
    }, 300); // Time to apply the query

    return () => clearTimeout(timeoutId);
  }, [query]);

  const { user } = useUserNavigator();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDisplayed(true);
    setQuery(e.target.value);
  };

  const handleUserSelection = async (userTo: IUserDocument) => {
    try {
      setIsLoadingSelection(true);
      const res = await fetcher.get(
        `conversations/conversationAlreadyExist?idOne=${user?._id}&idTwo=${userTo._id}`
      );
      if (!res) {
        setIsLoadingSelection(false);
        console.log(res);
        notifier(
          "error",
          "Something went wrong verifying if the conversation already exist, please review logs 🚨"
        );
        return null;
      }
      let conversation = res.data;
      if (conversation === 0) {
        //Is a new conversation
        conversation = await createConversation({
          participants: [user?._id, userTo._id],
          isGroup: false,
        } as unknown as  IConversation);
        if (!conversation.data) {
          console.log(conversation);
          setIsLoadingSelection(false);
          notifier(
            "error",
            "Something went wrong while creating your new conversation, please review the logs... 🚨"
          );
        }
      }
      if (conversation._id) {
        setCurrentConversation(conversation);
        handleConversationClick(conversation);
      } else if (conversation?.data?.data) {
        setCurrentConversation(conversation?.data?.data);
        handleConversationClick(conversation?.data?.data);
      }
      setUserSelectedConversation(userTo);
      setIsDisplayed(false);
    } catch (e) {
      console.log(e);
      notifier("error", `${e}`);
      return null;
    }
  };

  return (
    <div className="w-full">
      <Input
        isClearable
        type="text"
        variant="bordered"
        placeholder="search the user..."
        // onBlur={e => handleSearch()}
        onClear={() => {
          setIsDisplayed(false);
          setQuery("");
        }}
        onChange={(e) => handleSearch(e)}
        className="w-full "
      />
      {!isDisplayed  || query === "" || query === " " ? (
        ""
      ) : (
        <div className="w-full flex flex-col items-center justify-center gap-1 bg-slate-100 dark:bg-slate-950 rounded-lg max-h-[400px] overflow-y-auto p-2 mt-2">
          {!results || results.length <= 0 ? (
            !isLoading ? (
              <p className=" w-full text-center">No results...</p>
            ) : (
              <div className="w-full flex items-center justify-center gap-2">
                <Spinner size="sm" />
                <p>Loading...</p>
              </div>
            )
          ) : (
            results.map((user) => (
              <div
                className="w-full cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 hover:brightness-125 hover:rounded-lg"
                key={`user-follow-search-card-${user._id}`}
                onClick={() => handleUserSelection(user)}
              >
                <div className="w-full pointer-events-none hover:bg-slate-200 dark:hover:bg-slate-800 ">
                  <UserFollowCard
                    user={user}
                    link={`/dashboard/profile/${user.username}`}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchUsers;
