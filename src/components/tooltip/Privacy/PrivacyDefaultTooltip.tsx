import React from "react";

function PrivacyDefaultTooltip() {
  return (
    <div className="w-[300px] ">
      <h1 className=" text-lg">Privacy Default:</h1>
      <p className=" text-normal">
        By default the privacy of your dreams is public but you can change it in
        your profile privacy or here below in the {"Privacy"} section.
      </p>
      <br />
      <p className=" pb-2">More specific the privacy default is like this:</p>
      <div className=" w-fit flex flex-col gap-2">
        <div className="flex gap-4">
          <p className="">Is public:</p>
          <p>Yes</p>
        </div>
        <div className="flex gap-4">
          <p className="">Is visivle for friends:</p>
          <p>Yes</p>
        </div>
        <div className="flex gap-4">
          <p className="">Others can comment:</p>
          <p>Yes</p>
        </div>
        <div className="flex gap-4">
          <p className="">Others can share:</p>
          <p>Yes</p>
        </div>
        <div className="flex gap-4">
          <p className="">Visible for:</p>
          <p>All people</p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyDefaultTooltip;
