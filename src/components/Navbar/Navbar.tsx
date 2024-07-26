"use client";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { FaRocket } from "react-icons/fa6";
import {
  MdAddCircle,
  MdHome,
  MdLightMode,
  MdMenu,
  MdNightlight,
  MdOutlineExitToApp,
} from "react-icons/md";

import "./navbar.css";
import "animate.css";
import DreamsGenerator from "../dreams/dreamsGenerator/DreamsGenerator";
import { useTheme } from "next-themes";

//Redux

import SearchBtn from "../buttons/searchBtn/SearchBtn";
import NotificationBtn from "../buttons/notificationCenterBtn/NotificationBtn";
import useUserNavigator from "@/hooks/useUserNavigatorId";
import MessageBtn from "../buttons/messageBtn/MessageBtn";

function Navbar() {
  //session
  //
  const [toggleNav, setToggleNav] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addDreamOpen, setAddDreamOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const {theme, setTheme} = useTheme()
  const { userId, user } = useUserNavigator();

  // THemes config
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleNav = () => {
    setToggleNav(!toggleNav);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  const navbarColorLiHover = "hover:bg-violet-200 dark:hover:bg-slate-900"
  return (
    <nav className="navbar w-full fixed flex flex-col items-center justify-center bottom-0  md:w-fit md:fixed md:top-0 z-[50]">
      {/* Ul from md to lg screens */}
      <ul
        className={`nav-full py-2 px-4 w-full flex flex-col items-center gap-4 dark:bg-black bg-white z-[1001] text-violet-950 dark:text-white dark:border-t-[4px] border-t-[2px] rounded-t-full border-t-violet-700 dark:border-violet-900 overflow-hidden md:w-fit md:flex md:h-[100vh] md:justify-betweens md:border-r-[2px] md:dark:border-r-violet-950  md:border-r-violet-200 md:rounded-none  lg:items-start md:px-2 md:border-t-0 dark:md:border-t-0 lg:px-4 xl:w-[250px] ${
          toggleNav ? "" : "hidden "
        }`}
      >
        <div className="  hidden w-full h-[20%] md:flex justify-center items-center">
          <li className=" hidden sm:block cursor-pointer">
            <Link href={`/`} className="">
              <Image
                className=" hidden md:block w-[60px] lg:w-[80px]"
                src={"/logo1.png"}
                alt={`profile account dreamyVerse`}
                width={100}
                height={100}
              />
            </Link>
          </li>
        </div>
        <div className=" navbar-col-items h-[100%] w-full flex flex-col-reverse justify-around md:flex-col md:items-start lg:items-start md:justify-start gap-6">
          <li className={"micro-pulse " + navbarColorLiHover}>
            <Link href="/dashboard" className=" nav-link-grand">
              <MdHome size={24} className=" " />
              <p className="md:hidden lg:block text-[16px] font-[400]">Home</p>
            </Link>
          </li>
          <div className="lateral-search-cont ">
            <SearchBtn />
          </div>
          <div
            className=" lateral-add-cont cursor-pointer"
            onClick={() => openModal()}
          >
            <div className={"w-full h-full rounded-xl cursor-pointer md:flex md:justify-center lg:items-center lg:justify-start gap-2"  + navbarColorLiHover}>
              {!isModalOpen ? (
                <div className="flex justify-center items-center">
                  <MdAddCircle size={25} className="" />
                </div>
              ) : (
                <DreamsGenerator
                  dgIsOpen={isModalOpen}
                  dgOnClose={closeModal}
                />
              )}
              {/* <DreamsGenerator dgIsOpen={isModalOpen} dgOnClose={closeModal} /> */}
              <p className=" hidden lg:block">Add dream</p>
            </div>
          </div>
          <li className={"micro-pulse" + navbarColorLiHover}>
            <Link href="/dashboard/discover" className=" nav-link-grand">
              <FaRocket size={20} className="" />
              <p className="md:hidden lg:block text-[16px] font-[400]">
                Discover
              </p>
            </Link>
          </li>
          <li className={""  + navbarColorLiHover}>
            <Link
              href="/dashboard/myprofile"
              className=" nav-link-for-user w-full h-full flex flex-col gap-1 justify-center items-center my-6 md:my-0 md:flex-row lg:justify-start lg:gap-2"
            >
              <Image
                className="rounded-full w-[50px] md:w-[25px]"
                // src={ccUser?.image || '/assets/user/user-non-profile.jpg'}
                // alt={`${ccUser?.fullName} profile account`}
                src={user?.avatar || "/assets/user/user-non-profile.jpg"}
                alt={`profile account dreamyVerse`}
                width={30}
                height={30}
                objectPosition="center"
              />
              <p className="md:hidden lg:block text-[16px] font-[400]">
                Profile
              </p>
            </Link>
          </li>
        </div>
        <div className="navbar-col-end-items h-[40%] w-full flex flex-col items-center lg:items-start justify-end cursor-pointer">
          <li className={" justify-center  md:items-end py-[10px] lg:justify-start hiddedMedia" + navbarColorLiHover}>
            <MessageBtn />
          </li>
          <li className={" justify-center  md:items-end py-[10px] lg:justify-start hiddedMedia"  + navbarColorLiHover}>
            <NotificationBtn />
          </li>
          <li
            className={" justify-center  md:items-end py-[10px] lg:justify-start hover:bg-violet-200 hover:dark:bg-slate-900"}
            onClick={() => signOut()}
          >
            <button className=" flex gap-3 justify-center items-center">
              <MdOutlineExitToApp size={25} className=" sm:inline" />
              <p className=" md:hidden lg:block text-[16px] font-[400]">
                Sign Out
              </p>
            </button>
          </li>
          <li
            className={" justify-center  md:items-end py-[10px] lg:justify-start gap-2"  + navbarColorLiHover}
            onClick={
              theme === "dark"
                ? () => setTheme("light")
                : () => setTheme("dark")
            }
          >
            {theme === "dark" ? (
              <button className=" flex gap-3 justify-center items-center">
                <MdNightlight size={25} className=" sm:inline" />
                <p className=" md:hidden lg:block text-[16px] font-[400]">
                  Dark mode
                </p>
              </button>
            ) : (
              <button className=" flex gap-3 justify-center items-center">
                <MdLightMode size={25} className=" sm:inline" />
                <p className=" md:hidden lg:block text-[16px] font-[400]">
                  Light mode
                </p>
              </button>
            )}
          </li>
        </div>
      </ul>
      <ul
        className={`dark:bg-black bg-white pb-4 w-full flex flex-row justify-between pt-4 px-10 items-center z-[1002] text-violet-950 shadow-xl dark:text-white ${
          !toggleNav ? " border-t-[2px]" : "border-none rounded-t-none"
        } rounded-t-full border-violet-700 dark:border-violet-900  fadeInUpOneSeg md:hidden`}
      >
        <li className="nv-li-btn">
          <button onClick={handleToggleNav}>
            <MdMenu size={32} />
          </button>
        </li>
        <li className="">
          <Link href={`/dashboard`}>
            <MdHome size={32} />
          </Link>
        </li>
        <li className="">
          <Link href={`/dashboard/discover`}>
            <FaRocket size={25} />
          </Link>
        </li>
        <li className="">
          <Link href="/dashboard/myprofile">
            <Image
              className="rounded-full border-[1px] border-purple-800 m-auto w-[30px]  sm:w-[40px]"
              // src={ccUser?.image || '/assets/user/user-non-profile.jpg'}
              // alt={`${ccUser?.fullName} profile account`}
              src={user?.avatar || "/assets/user/user-non-profile.jpg"}
              alt={` profile account dreamyVerse`}
              width={50}
              height={50}
              objectPosition="center"
            />
          </Link>
        </li>
      </ul>
      <ul className="nav-up w-full h-[70px] fixed top-0 left-0 bg-white dark:bg-black flex justify-between items-center border-b-[2px] rounded-b-xl dark:border-violet-900 border-violet-700 py-2 px-2 md:hidden">
        <div className=" w-full h-full flex justify-end items-center gap-1.5 ">
          <div className=" w-[80px] h-full flex justify-center items-center">
            <li className="w-full">
              <Link href={`/dashboard`} className="cursor-pointer">
                <Image
                  className="w-[50px] min-w-[40px] lg:w-[80px]"
                  src={"/logo1.png"}
                  alt={`profile account dreamyVerse`}
                  width={100}
                  height={100}
                />
              </Link>
            </li>
          </div>
          <div className="w-full h-full flex justify-end items-center gap-2 pr-2">
            <div className="search-box flex justify-between items-center rounded-2xl pr-2 ">
              <SearchBtn />
            </div>
            <div
              className="w-[40px] h-full top-nav-bar createContainer p-2 dark:hover:bg-slate-800 hover:bg-violet-200 cursor-pointer flex justify-center items-center rounded-lg"
              onClick={() => openModal()}
            >
              {!isModalOpen ? (
                <div>
                  <MdAddCircle size={25} className="" />
                </div>
              ) : (
                <DreamsGenerator
                  dgIsOpen={isModalOpen}
                  dgOnClose={closeModal}
                />
              )}
            </div>
            <div className="w-[40px] h-full">
                <NotificationBtn />
            </div>
            <div className="w-[40px] h-full">
                <MessageBtn />
            </div>
          </div>
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
