"use client";

import NavbarExternal from "@/components/externalNavbar/ExternalNavbar";
import { Image as ImageUi } from "@nextui-org/image";
import Link from "next/link";
import {
  MdOutlineLogin,
  MdNotificationsActive,
  MdPermMedia,
} from "react-icons/md";
import { FaCashRegister } from "react-icons/fa6";
import "animate.css";
import { GiOppositeHearts } from "react-icons/gi";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaRocket } from "react-icons/fa6";
import { SiPrivateinternetaccess } from "react-icons/si";

export default function Home() {
  const circlesInfo = [
    {
      icon: "MdNotificationsActive",
      title: "",
      description: "Get notified when someone dreamed about you in real time!",
    },
    {
      icon: "GiOppositeHearts",
      title: "",
      description: "Get a match when someone dream the same than you!",
    },
    {
      icon: "IoChatbubbleEllipsesSharp",
      title: "",
      description: "Chat in real time about your dreams!",
    },
    {
      icon: "FaRocket",
      title: "",
      description:
        "Discovery the public dreams of all the word in the discovery section!",
    },
    {
      icon: "SiPrivateinternetaccess",
      title: "",
      description:
        "Set publications as private, public or visible only for certain people 👀",
    },
    {
      icon: "MdPermMedia",
      title: "",
      description:
        "Add media files, such as images or audio files to explain better your dream!",
    },
  ];
  const classnameIcon = " animate__pulse";
  return (
    <div className=" relative w-full h-screen bg-gradient-to-b lg:bg-gradient-to-r from-blacks from-indigo-950 via-indigo-900 to-violet-600 to-purple-600s from-20% via-70%s to-100% text-white overflow-hidden">
      <div className="navbar sticky iddens w-full h-[50px] md:h-[80px] px-4 flex justify-between items-center z-[2000]">
        <div className="flex item-center justify-center">
          <ImageUi
            src="/logo1.png"
            className=" w-[50px] lg:w-[60px] pt-2 md:py-0"
          />
        </div>
        <div className="flex gap-8 item-center justify-center">
          <div className={"micro-pulse "}>
            <Link
              href="/login"
              className=" nav-link-grand flex justify-center items-center gap-2"
            >
              <MdOutlineLogin size={24} className="hidden md:block " />
              <p className=" text-[16px] font-[400]">Login</p>
            </Link>
          </div>
          <div className={"micro-pulse "}>
            <Link
              href="/register"
              className=" nav-link-grand flex justify-center items-center gap-2"
            >
              <FaCashRegister size={20} className="hidden md:block" />
              <p className="text-[16px] font-[400]">Register</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="main-cont w-full h-full max-w-[] relative ">
        <div className="w-[100%] h-full letters-container text-white flex flex-col items-center gap-4 text-center pt-8 lg:pt-0 2xl:pt-0 px-4 lg:text-start  lg:items-start ">
          <div className="text-cont flex flex-col gap-4 lg:pt-[60px] 2xl:tp-[30px] lg:w-[70%] lg:pl-4 2xl:pl-6 lg:items-start">
            <h1 className="text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl 2xl:w-[60%] font-medium animate__slideInDown">
              CONNECT YOUR DREAMS
            </h1>
            <h3 className="hidden text-3xl md:block font-thin md:px-8 lg:px-0 lg:max-w-[40%] xl:w-[50%] 2xl:w-[80%] animate__slideInDown">
              The first social app dedicated to share your dreams exclusively
            </h3>
            <h3 className=" text-xl font-extralights hidden 2xl:blocks font-thin 2xl:w-[50%]">
              Share your dreams to everybody and connect your meaningful
              experiences across the world
            </h3>
            <div className="circles hidden w-full max-w-[600px] h-full lg:flex gap-4 items-center py-4 flex-wrap ">
              {circlesInfo.length < 1
                ? ""
                : circlesInfo.map((circle, ind) => (
                    <div
                      key={`circle-info-key-[${ind}]`}
                      className="circle_unit bg-white/5 hover:bg-white/10 w-[250px] h-[80px] rounded-lg shadow-md overflow-hidden flex items-center gap-3 px-2 cursor-pointer animate__fadeInUp_speed"
                    >
                      {circle.icon === "MdNotificationsActive" ? (
                        <MdNotificationsActive
                          size={30}
                          className={classnameIcon}
                        />
                      ) : circle.icon === "GiOppositeHearts" ? (
                        <GiOppositeHearts size={30} className={classnameIcon} />
                      ) : circle.icon === "IoChatbubbleEllipsesSharp" ? (
                        <IoChatbubbleEllipsesSharp
                          size={30}
                          className={classnameIcon}
                        />
                      ) : circle.icon === "FaRocket" ? (
                        <FaRocket size={30} className={classnameIcon} />
                      ) : circle.icon === "SiPrivateinternetaccess" ? (
                        <SiPrivateinternetaccess
                          size={30}
                          className={classnameIcon}
                        />
                      ) : circle.icon === "MdPermMedia" ? (
                        <MdPermMedia size={30} className={classnameIcon} />
                      ) : (
                        ""
                      )}
                      <h4 className=" w-full text-base font-thin hidden lg:block text-start">
                        {circle.description}
                      </h4>
                    </div>
                  ))}
            </div>
          </div>
          <div className=" img-container w-[800px] md:w-[1200px] mt-[-90px] md:mt-[-120px]  bottom-[0%] right-[-30%]  animate__fadeInUp lg:hidden">
            <ImageUi
              src={"./mockups/iphone.png"}
              className=" w-full h-full"
            />
          </div>
        </div>
        <div
          className={`img-container-big hidden lg:block xl:hidden absolute w-[1000px] top-[-50px] right-[-300px] animate__fadeInRight z-0 `}
        >
          <ImageUi src={"./mockups/iphone.png"} className=" w-full h-full" />
        </div>
        {/* XL */}
        <div
          className={`img-container-big hidden xl:block 2xl:hiddens absolute w-[500px] top-[-50px] right-[-300px] xl:w-[700px] xl:top-[190px] xl:right-[0px] 2xl:w-[800px] 2xl:top-[10px] 2xl:right-[0px]animate__fadeInRight z-0 `}
        >
          <ImageUi src={"./mockups/ipad.png"} className=" w-full h-full" />
        </div>
      </div>
    </div>
  );
}
