"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import React, { useRef } from "react";
import { IUserDocument } from "../../../../../dreamyVerse";
import EditUserModalBody from "@/components/user/editUserModalBody/EditUserModalBody";

function EditMyProfile({ user }: { user: IUserDocument }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const editUserModalBodyRef = useRef<any>(null);


  const handleSubmit = () => {
    if (editUserModalBodyRef.current) {
      editUserModalBodyRef.current?.handleSubmit();
    }
  }

  return (
    <>
      <Button
        as={"button"}
        variant="bordered"
        color="secondary"
        size="sm"
        className=" text-tiny sm:text-base text-violet-600 dark:text-violet-400 cursor-pointer"
        onPress={onOpen}
      >
        Edit Profile
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        scrollBehavior="inside"
        placement="center"
        className=" bg-violet-100 dark:bg-slate-950 text-slate-900 dark:text-white z-[2003] relative border-1 border-violet-600"
      >
        <ModalContent className="absolute">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl sm:text-4xl">
                Edit Profile
              </ModalHeader>
              <ModalBody>
                <EditUserModalBody ref={editUserModalBodyRef} user={user} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditMyProfile;
