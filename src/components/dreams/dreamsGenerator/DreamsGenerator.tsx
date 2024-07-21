"use client";

import React, { useEffect, useState } from "react";
import {
  Input,
  Spacer,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
  DatePicker,
  Switch,
  Select,
  SelectItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Image,
  Spinner,
} from "@nextui-org/react";
import { MdAddCircle, MdMessage } from "react-icons/md";
import { IDreamDocument, IUserDocument } from "../../../../dreamyVerse";
import notifier from "@/helpers/notifier";
import { parseDate } from "@internationalized/date";
import { format } from "date-fns";
import { CldUploadWidget } from "next-cloudinary";

//
import { FaRegQuestionCircle } from "react-icons/fa";
import PrivacyDefaultTooltip from "@/components/tooltip/Privacy/PrivacyDefaultTooltip";
import { pulsar } from "ldrs";
import {
  useCreateNewUserDreamMutation,
  useCreateNotificationMutation,
  useEditDreamMutation,
} from "@/redux/features/api/apiSlice";
import PopOverDreamGeneratorImg from "@/components/popOvers/Informatives/PopOverDreamGeneratorImg";
import PopAboutPrivacityDream from "@/components/popOvers/Informatives/PopAboutPrivacityDream";
import PopOverWantToTagPeople from "@/components/popOvers/Informatives/PopOverWantToTagPeople";
import PopOverWasYourDreamLucid from "@/components/popOvers/Informatives/PopOverWasYourDreamLucid";
import PopOverUploadRecording from "@/components/popOvers/Informatives/PopOverUploadRecording";
import InputTagPeople from "@/components/inputs/inputTagPeople/InputTagPeople";
import InfoTagOutsideApp from "@/components/popOvers/Informatives/InfoTagOutsideApp";
import InputTagPeopleOutside from "@/components/inputs/inputTagPeopleOutside/InputTagPeopleOutside";
import UserFollowersSelctor from "@/components/inputs/friendsSelector/UserFollowersSelctor";
import { useSearchParams } from "next/navigation";
import useUserNavigator from "@/hooks/useUserNavigatorId";
import { playNewDreamSound } from "@/helpers/soundsHelper";

interface DreamsGeneratorPropsTypes {
  dgIsOpen: boolean;
  dgOnClose: () => void;
  dgIsExpanded?: boolean;
  dgClean?: () => void;
  onEditionDream?: IDreamDocument;
  queryMessage?: string;
}

function DreamsGenerator({
  dgIsOpen,
  dgOnClose,
  dgIsExpanded,
  dgClean,
  onEditionDream,
  queryMessage,
}: DreamsGeneratorPropsTypes) {
  //
  const [createNewDream] = useCreateNewUserDreamMutation();
  const [editDream] = useEditDreamMutation();
  const [createNotification] = useCreateNotificationMutation();
  //
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isExpanedBtn, setIsExpandedBtn] = useState<boolean>(true);
  const [isShortDream, setIsShortDream] = useState<boolean>(true);
  const [isLucid, setIsLucid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNotified, setIsNotified] = useState<boolean>(true);
  const [formData, setFormData] = useState<IDreamDocument>({
    user: "",
    visibility: {
      isPublic: true,
      isVisibleForFriends: true,
      othersCanComment: true,
      othersCanShare: true,
      visibleFor: [],
    },
    dream: "",
    title: "",
    date: new Date(),
    category: "",
    image: "",
    people: {
      fromApp: [],
      fromNoApp: [],
      noNotified: [],
    },
    recording: "",
    isLucid: false,
  });
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [isVisibleForFriends, setIsVisibleForFriends] = useState<boolean>(true);
  const [othersCanComment, setOthersCanComment] = useState<boolean>(true);
  const [othersCanShare, setOthersCanShare] = useState<boolean>(true);

  const { user, userId } = useUserNavigator();
  const searchParams = useSearchParams();
  const qMessage = searchParams.get("qMessage");
  const qSetVisibilityFor: string | null =
    searchParams.get("qSetVisibilityFor");

  useEffect(() => {
    if (userId) {
      setFormData({ ...formData, user: userId });
    }
  }, [userId]);

  useEffect(() => {
    if (onEditionDream) {
      setFormData(onEditionDream);
      setIsPublic(onEditionDream?.visibility?.isPublic);
      setIsVisibleForFriends(onEditionDream?.visibility?.isVisibleForFriends);
      setOthersCanComment(onEditionDream?.visibility?.othersCanComment);
      setOthersCanShare(onEditionDream?.visibility?.othersCanShare);
      setIsLucid(onEditionDream?.isLucid as boolean);
      // setIsNotified(onEditionDream);
    }
    if (qSetVisibilityFor && onEditionDream) {
      setIsShortDream(false);
      setFormData(
        (prev) =>
          ({
            ...prev,
            visibility: {
              ...prev.visibility,
              visibleFor: prev.visibility.visibleFor
                ? [...prev.visibility.visibleFor, qSetVisibilityFor]
                : [qSetVisibilityFor],
            },
          } as any)
      );
    }
  }, [onEditionDream, qSetVisibilityFor]);

  //Handle input change
  const handleInputChange = (key: string, value: any) => {
    setFormData({ ...formData, [key as any]: value });
  };

  // Submiting to back
  const handleSubmit = async () => {
    setIsLoading(true);
    // let temporalDream = formData
    if (!formData.user || formData.user === "") {
      notifier(
        "error",
        "Can't create/edit dream without USER ID, please reload the app and try again"
      );
      setIsLoading(false);
      return null;
    }
    // console.log("formData from handleSubmit:", formData);
    try {
      let dream;
      if (onEditionDream) {
        dream = await editDream(formData);
        if (!dream || dream.error) {
          notifier(
            "error",
            `Something went wrong editing your dream, please reload the page. ${
              !dream.error ? "" : "please review logs: " + String(dream.error)
            }`
          );
          setIsLoading(false);
          return null;
        }
        // Handling Request Notifications
        if (qSetVisibilityFor) {
          const newNoti = {
            user: qSetVisibilityFor,
            type: "dream",
            redirectionalId: onEditionDream._id,
            message: `The user ${
              (onEditionDream.user as IUserDocument).username
            } has accepted your request to see the private dream. Click here to see it! 😎`,
            read: false,
          };
          const responseNewNoti = await createNotification(newNoti);
          if (!responseNewNoti) {
            console.log(responseNewNoti);
            notifier(
              "error",
              "Something went wrong creating the notifiction for this action. Please review the arguments and try again... 🤕"
            );
            console.log("no data...");
            return null;
          }
          notifier("ok", "Access granted to user for this dream 😎");
        }
        //confirmation
        notifier("ok", `${dream?.data?.message}`);
        cleanerForm();
        setIsLoading(false);
        playNewDreamSound();
        dgOnClose();
        return null;
      }
      // console.log(temporalDream);
      // const dream = await createNewDream(temporalDream)
      dream = await createNewDream(formData);
      // const dream = await fetcher.post("dreams/newDream", temporalDream);

      if (dream.data) {
        notifier("ok", `${dream?.data?.message}`);
        cleanerForm();
        setIsLoading(false);
        playNewDreamSound();
        dgOnClose();
      }
      setIsLoading(false);
    } catch (e) {
      console.log("Error", e);
      if (e instanceof Error) {
        notifier("error", `${e.message}`);
        setIsLoading(false);
        return null;
      } else {
        notifier(
          "error",
          "An unexpected error has occurred while geting the user ID, please reload the page and try again"
        );
        setIsLoading(false);
        return null;
      }
    }
  };
  //cleaner form
  function cleanerForm() {
    setIsPublic(true);
    setIsVisibleForFriends(true);
    setOthersCanComment(true);
    setOthersCanShare(true);
    setIsLucid(false);
    setIsNotified(false);
    //
    setFormData({
      ...formData,
      visibility: {
        isPublic: isPublic,
        isVisibleForFriends: isVisibleForFriends,
        othersCanComment: othersCanComment,
        othersCanShare: othersCanShare,
        visibleFor: [],
      },
      dream: "",
      title: "",
      date: new Date(),
      category: "",
      image: null,
      people: null,
      recording: null,
      isLucid: isLucid,
    });
  }
  //

  // Switchers handlers
  const handleSwitchers = (type: string, bool: boolean) => {
    if (type === "isLucid") {
      setFormData({ ...formData, isLucid: bool });
      setIsLucid(bool);
    } else if (type === "isNotified") {
      // setFormData({ ...formData, isLucid: bool });
      setIsNotified(bool);
    } else if (type === "isPublic") {
      setFormData({
        ...formData,
        visibility: {
          ...formData.visibility,
          isPublic: bool,
        },
      });
      setIsPublic(bool);
    } else if (type === "isVisibleForFriends") {
      setFormData({
        ...formData,
        visibility: {
          ...formData.visibility,
          isVisibleForFriends: bool,
        },
      });
      setIsVisibleForFriends(bool);
    } else if (type === "othersCanComment") {
      setFormData({
        ...formData,
        visibility: {
          ...formData.visibility,
          othersCanComment: bool,
        },
      });
      setOthersCanComment(bool);
    } else if (type === "othersCanShare") {
      setFormData({
        ...formData,
        visibility: {
          ...formData.visibility,
          othersCanShare: bool,
        },
      });
      setOthersCanShare(bool);
    }
  };
  //Handle image upload
  const onImgHandling = (res: any) => {
    console.log(res);
    if (res.info.secure_url) {
      setFormData({ ...formData, image: res.info.secure_url });
      notifier(
        "ok",
        "Your new avatar was successfully uploaded into our database, now SAVE THE CHANGES 🤓"
      );
    }
  };
  //handle other media file upload
  async function handleAudioUploading(data: any) {
    console.log(data);
    if (data.info.secure_url) {
      setFormData({ ...formData, recording: data.info.secure_url });
      notifier(
        "ok",
        "Your new avatar was successfully uploaded into our database, now SAVE THE CHANGES 🤓"
      );
    }
  }
  function handleTagPeople(arr: [] | IUserDocument[]) {
    const transformedArr = arr.map((user) => ({
      wantedToKnow: isNotified,
      person: user._id,
    }));
    setFormData(
      (prev) =>
        ({
          ...prev,
          people: {
            ...prev.people,
            fromApp: transformedArr,
          },
        } as any)
    );
  }

  const handleTagOutsidePeople = (obj: {
    fromNoApp: string[] | [];
    noNotified: string[] | [];
  }) => {
    setFormData(
      (prev) =>
        ({
          ...prev,
          people: {
            ...prev.people,
            fromNoApp: obj.fromNoApp,
            noNotified: obj.noNotified,
          },
        } as any)
    );
  };
  const handleVisibilityFor = (arr: [] | IUserDocument[]) => {
    setFormData(
      (prev) =>
        ({
          ...prev,
          visibility: {
            ...prev.visibility,
            visibleFor: arr.map((user) => user._id),
          },
        } as any)
    );
  };
  // animation constant
  pulsar.register();

  return (
    <div className="">
      {isExpanedBtn ? (
        // <div className=" text-white" onClick={dgOnClose || onOpen}>
        <div className="">
          <MdAddCircle size={25} className="" />
        </div>
      ) : (
        // </div>
        <Button
          isIconOnly
          onPress={dgOnClose || onOpen}
          className=" bg-transparent text-white"
        >
          <MdAddCircle size={25} className="" />
        </Button>
      )}
      <div className="dg-rollable-box"></div>
      <Modal
        isOpen={dgIsOpen || isOpen}
        onOpenChange={dgOnClose || onOpenChange}
        className=" bg-violet-100 dark:bg-slate-800 text-slate-900 dark:text-white z-[2003] relative"
        size="lg"
        scrollBehavior="inside"
        placement="center"
      >
        <ModalContent className="  absolute overflow-hidden">
          {(onClose) => (
            <>
              <div className="loader">
                {!isLoading ? (
                  ""
                ) : (
                  <div className="w-full h-full flex flex-col justify-center items-center bg-white/5 backdrop-blur-sm z-50 absolute text-center p-4 gap-2 left-0 rounded-[25px]">
                    <l-pulsar size="150" speed="3.1" color="violet"></l-pulsar>
                    <p className=" text-xl text-purple-950 dark:text-white">
                      {onEditionDream
                        ? "We are editing your dream"
                        : "We are creating you dream"}
                    </p>
                    <p className=" text-xl text-purple-950 dark:text-white">
                      Please wait a moment 🤓
                    </p>
                  </div>
                )}
              </div>
              <ModalHeader className="w-full flex flex-col font-light dark:font-normal">
                <div className="w-full flex gap-1 font-light dark:font-normal justify-between">
                  <h1 className=" text-xl">
                    {onEditionDream ? "Editing" : "Creating a new"} dream 🌛
                  </h1>
                  <div className="flex gap-2 items-center">
                    <Switch
                      isSelected={isShortDream}
                      color="secondary"
                      onValueChange={(e) => setIsShortDream(!isShortDream)}
                      className=""
                    ></Switch>
                    <Popover placement="top">
                      <PopoverTrigger>
                        <h1 className=" w-fit text-sm font-semibold hover:underline hover:cursor-pointer pr-4 flex  items-center gap-1">
                          {isShortDream ? "Short" : "Full"} dream{" "}
                          <FaRegQuestionCircle size={15} />
                        </h1>
                      </PopoverTrigger>
                      <PopoverContent>
                        <div className=" w-[300px] px-1 py-2">
                          <div className="w-[250px] m-5 p-2">
                            Select if you want to add a short dream with just
                            the description and date. <br></br>Or if you prefer
                            to add a new dream with all the details.
                          </div>
                          🤓
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                {qMessage || queryMessage ? (
                  <>
                    <Divider className="my-2" />
                    <div className=" w-full px-1.5 rounded-xl flex justify-center items-center text-sm text-blue-600 dark:text-orange-400 gap-2">
                      <div className=" text-centers flex gap-2 flex-wrap">
                        <b className=" w-fit flex gap-2">
                          <MdMessage size={20} /> Message:{" "}
                        </b>
                        {qMessage || queryMessage}
                      </div>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </ModalHeader>
              <ModalBody>
                <form className={isExpanedBtn ? "" : ""}>
                  <Popover placement="top">
                    <PopoverTrigger>
                      <h1 className=" w-fit hover:underline text-sm font-bold cursor-pointer pb-2 flex  items-center gap-1">
                        Dream privacy <FaRegQuestionCircle size={15} />
                      </h1>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PrivacyDefaultTooltip />
                    </PopoverContent>
                  </Popover>
                  {/* Campo para el sueño */}
                  <Input
                    value={formData.title}
                    type="text"
                    label="Title of your dream or post..."
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                  <Spacer y={1} />
                  <Textarea
                    label="Dream"
                    value={formData.dream as string}
                    onChange={(e) => handleInputChange("dream", e.target.value)}
                    required
                    autoFocus
                    placeholder="Enter your dream description"
                  />
                  <Spacer y={1} />

                  {/* Campo para la fecha */}
                  <DatePicker
                    defaultValue={parseDate(format(new Date(), "yyyy-MM-dd"))}
                    label="When you dreamed this?"
                    showMonthAndYearPickers
                    isRequired
                    onChange={(e) =>
                      handleInputChange(
                        "date",
                        new Date(`${e.year}-${e.month}-${e.day}`)
                      )
                    }
                  />
                  <Spacer y={1} />
                  {isShortDream ? (
                    ""
                  ) : (
                    <div className="">
                      <Select label="Select a category">
                        <SelectItem key={1 * 10} value={0}>
                          nothing
                        </SelectItem>
                      </Select>
                      <Spacer y={2} />
                      <PopOverDreamGeneratorImg />
                      <Spacer y={2} />
                      {!formData.image ? (
                        ""
                      ) : (
                        <div className="">
                          <Image
                            width={300}
                            alt=""
                            src={`${formData.image}`}
                            isBlurred
                            isZoomed
                            className=" pb-2"
                          />
                        </div>
                      )}
                      <CldUploadWidget
                        uploadPreset="dreamyVerse_preset"
                        onSuccess={(success) => onImgHandling(success)}
                      >
                        {({ open }) => {
                          return (
                            <>
                              <Spacer y={3} />
                              <Button color="secondary" onClick={() => open()}>
                                Upload dream image
                              </Button>
                            </>
                          );
                        }}
                      </CldUploadWidget>
                      <Spacer y={2} />
                      <PopOverUploadRecording />
                      <Spacer y={2} />
                      <CldUploadWidget
                        uploadPreset="dreamyVerseRecordings_preset"
                        onSuccess={(success) => handleAudioUploading(success)}
                      >
                        {({ open }) => {
                          return (
                            <Button color="secondary" onClick={() => open()}>
                              Upload recording
                            </Button>
                          );
                        }}
                      </CldUploadWidget>
                      <Spacer y={2} />
                      <PopOverWasYourDreamLucid />
                      <Spacer y={1} />
                      <Switch
                        isSelected={isLucid}
                        color="secondary"
                        onValueChange={(e) => handleSwitchers("isLucid", e)}
                        className=" pr-4"
                      ></Switch>
                      <Spacer y={2} />
                      <PopOverWantToTagPeople />
                      <Spacer y={2} />
                      <Switch
                        isSelected={isNotified}
                        color="secondary"
                        onValueChange={(e) => handleSwitchers("isNotified", e)}
                        className=" pr-4"
                      >
                        Notify?
                      </Switch>
                      <InputTagPeople
                        setSelections={(arr) => handleTagPeople(arr)}
                        onEditionUsers={
                          formData.people?.fromApp as [
                            { wantedToKnow: boolean; person: string }
                          ]
                        }
                      />
                      <Spacer y={3} />
                      <InfoTagOutsideApp />
                      <InputTagPeopleOutside
                        setSelections={(obj) => handleTagOutsidePeople(obj)}
                        onEditionProp={{
                          fromNoApp: formData.people?.fromNoApp as string[],
                          noNotified: formData.people?.noNotified as string[],
                        }}
                      />
                      <Spacer y={2} />
                      <PopAboutPrivacityDream />
                      <Spacer y={2} />
                      <Switch
                        isSelected={isPublic}
                        color="secondary"
                        onValueChange={(e) => handleSwitchers("isPublic", e)}
                        className=" pr-4"
                      >
                        Dream is public?
                      </Switch>
                      <Spacer y={2} />
                      <Switch
                        isSelected={isVisibleForFriends}
                        color="secondary"
                        onValueChange={(e) =>
                          handleSwitchers("isVisibleForFriends", e)
                        }
                        className=" pr-4"
                      >
                        Dream is visible only for friends?
                      </Switch>
                      <Spacer y={2} />
                      <Switch
                        isSelected={othersCanComment}
                        color="secondary"
                        onValueChange={(e) =>
                          handleSwitchers("othersCanComment", e)
                        }
                        className=" pr-4"
                      >
                        Other can comment on this dream?
                      </Switch>
                      <Spacer y={2} />
                      <Switch
                        isSelected={othersCanShare}
                        color="secondary"
                        onValueChange={(e) =>
                          handleSwitchers("othersCanShare", e)
                        }
                        className=" pr-4"
                      >
                        Dream can be shared to others people profiles or in
                        other apps{"(Facebook, intagram, etc)"}?
                      </Switch>
                      <Spacer y={1} />
                      {/* <Input
                        type="text"
                        label="Set visibility only for..."
                        onValueChange={(v) => {}}
                      /> */}
                      <UserFollowersSelctor
                        setSelections={(a) => handleVisibilityFor(a)}
                        onEditionProp={
                          formData.visibility.visibleFor as string[]
                        }
                      />
                      <Spacer y={32} />
                    </div>
                  )}
                </form>
              </ModalBody>
              <ModalFooter className="">
                <Button
                  color="danger"
                  variant="light"
                  onPress={dgOnClose || onClose}
                >
                  Close
                </Button>
                <Button
                  color="secondary"
                  onClick={handleSubmit}
                  className={` ${isLoading ? "bg-violet-400" : ""}`}
                >
                  {isLoading ? (
                    <div className="flex gap-2 justify-center items-center">
                      Loading...
                      <Spinner size="sm" />
                    </div>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default DreamsGenerator;
