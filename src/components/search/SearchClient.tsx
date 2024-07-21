"use client";

import fetcherFetch from "@/helpers/fetcher";
import { Input, Spacer } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import SearchResultsDisplayer from "./searchResults/SearchResultsDisplayer";

function SearchClient() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<[]>([]);
  const fetcher = fetcherFetch();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        fetcher
          .get(`search/generalSearch?q=${query}`)
          .then((response) => {
            console.log(response.data)
            setResults(response.data)
        })
          .catch((error) => console.error(error));
      }
    }, 300); // Time to apply the query

    return () => clearTimeout(timeoutId);
  }, [query]);


  return (
    <div className="w-full flex flex-col gap-2">
        <Spacer y={2} />
      <Input
        isClearable
        type="text"
        variant="bordered"
        placeholder="search something..."
        onClear={() => setQuery("")}
        onChange={e => setQuery(e.target.value)}
        className="max-w-xs"
      />
      <div className="searchers-results-container w-full h-full">
        <SearchResultsDisplayer results={results}/>
      </div>
    </div>
  );
}

export default SearchClient;
