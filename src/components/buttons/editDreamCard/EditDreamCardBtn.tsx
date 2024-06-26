"use client";

import DreamsGenerator from "@/components/dreams/dreamsGenerator/DreamsGenerator";
import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { IDreamDocument } from "../../../../dreamyVerse";

function EditDreamCardBtn({ dream }: { dream: IDreamDocument }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <Button
        as={"button"}
        variant="light"
        color="danger"
        size="sm"
        className=" text-default-900 py-0 sm:px-2 cursor-pointer flex gap-2 justify-end items-center"
        onClick={() => openModal()}
      >
        <MdEdit size={100} className="w-[20px] h-[20px] " />
        <p className="">Edit dream</p>
      </Button>
      {!isModalOpen ? (
        ""
      ) : (
        <DreamsGenerator
          dgIsOpen={isModalOpen}
          dgOnClose={closeModal}
          onEditionDream={dream}
        />
      )}
    </>
  );
}

export default EditDreamCardBtn;
