"use client";

import { Button } from "@nextui-org/react";
import React, { useEffect, useState } from "react";

function DreamContentCard({ content }: { content: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxCharacters, setMaxCharacters] = useState<number>(200);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setMaxCharacters(200);
      } else if (window.innerWidth <= 800) {
        setMaxCharacters(350);
      } else if (window.innerWidth <= 1200) {
        setMaxCharacters(550);
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

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div>
      <div>
        {isExpanded ? content : `${content.slice(0, maxCharacters)}...`}
      </div>
      {content.length > maxCharacters && (
        <p
          className=" w-full mt-2 text-blue-500 hover:underline cursor-pointer text-center"
          onClick={toggleExpansion}
        >
          {isExpanded ? "See Less" : "See More"}
        </p>
      )}
    </div>
  );
}

export default DreamContentCard;
