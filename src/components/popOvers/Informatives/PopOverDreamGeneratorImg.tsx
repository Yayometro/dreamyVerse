import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import React from "react";
import { FaRegQuestionCircle } from "react-icons/fa";

function PopOverDreamGeneratorImg() {
  return (
    <Popover placement="top">
      <PopoverTrigger>
        <h1 className=" w-fit hover:underline text-sm font-bold cursor-pointer pb-2 flex  items-center gap-1">
          Upload an image or generate it by AI <FaRegQuestionCircle size={15} />
        </h1>
      </PopoverTrigger>
      <PopoverContent>
        <div className=" w-[350px] px-1 py-2">
          <div className="text-small font-bold">How does this work? 🤔</div>
          <div className="text-tiny pb-2">
            Here if you click the {"'Upload dream image'"} you will set your
            dream image by yourself. This is useful if you draw your dream or
            have an image that describes your dream perfectly.
          </div>
          <div className="text-tiny pb-2">
            But, if you {"don't"} have your image ready, then{" "}
            <b>{"don't"} do anything</b>. Our system will generate the image
            using IA through your description.
          </div>
          <div className="text-tiny pb-2">
            The time used to generate an image using IA can depend on how many
            petitions the AI received. But in the most high range, times can
            wait to 24hrs to 48hrs.
          </div>
          🤠
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default PopOverDreamGeneratorImg;
