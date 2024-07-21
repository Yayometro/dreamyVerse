"use client";

import React from "react";
import { IDreamDocument, IUserDocument } from "../../../../dreamyVerse";
import UserFollowCard from "@/components/user/userFollowCard/UserFollowCard";
import DreamsCards from "@/components/dreams/dreamsCards/DreamsCards";
import useUserNavigator from "@/hooks/useUserNavigatorId";
import Link from "next/link";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface resultsType {
  dreams: IDreamDocument[];
  users: IUserDocument[];
}

type SearchResults = resultsType | [];

function SearchResultsDisplayer({ results }: { results: SearchResults }) {
  const { userId } = useUserNavigator();
  const router = useRouter();
  if (Array.isArray(results)) {
    return <div>No results found...</div>;
  }

  return (
    <Accordion className="w-full">
      <AccordionItem
        key="1"
        aria-label="Users related"
        title={`Users found (${results.users.length})`}
      >
        <div className="users-cont-sr w-full h-full flex flex-col items-start justify-center gap-2 ">
          {results.users.length <= 0
            ? "No results found..."
            : // 
              results.users.map((user) => (
                <UserFollowCard
                  key={`user-follow-search-card-${user._id}`}
                  user={user}
                  link={`/dashboard/profile/${user.username}`}
                />
              ))}
        </div>
      </AccordionItem>
      <AccordionItem
        key="2"
        aria-label="Dreams related"
        title={`Dreams found (${results.dreams.length})`}
        className=" w-full"
      >
        <div className="dreams-cont-sr w-full h-full flex flex-col items-start justify-center gap-2 ">
          {results.dreams.length <= 0
            ? "No results found..."
            : // Renderizar los resultados de sueños aquí
              results.dreams.map((dream) => (
                <div
                  onClick={() => router.push(`/dashboard/dreams/${dream._id}`)}
                  key={`Dreams-results-card-${dream._id}`}
                  className=" cursor-pointer w-full"
                >
                  <div className="w-full pointer-events-none">
                    <DreamsCards
                      dcDream={dream}
                      dcUser={dream.user as IUserDocument}
                      navigatorUser={userId as string}
                    />
                  </div>
                </div>
              ))}
        </div>
      </AccordionItem>
    </Accordion>
  );
}

export default SearchResultsDisplayer;
