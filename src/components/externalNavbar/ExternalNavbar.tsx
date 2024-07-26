"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { FaCashRegister, FaRocket } from "react-icons/fa6";
import {
  MdAddCircle,
  MdHome,
  MdLightMode,
  MdMenu,
  MdNightlight,
  MdOutlineExitToApp,
  MdOutlineLogin,
} from "react-icons/md";

import "./navbar.css";
import "animate.css";
import { useTheme } from "next-themes";

function NavbarExternal() {
  const [toggleNav, setToggleNav] = useState<boolean>(false);
  const {theme, setTheme} = useTheme()

  const handleToggleNav = () => {
    setToggleNav(!toggleNav);
  };
  const navbarColorLiHover = "hover:bg-violet-200 dark:hover:bg-slate-900"
  return (
    <nav className="navbar w-full fixed flex flex-col items-center justify-center bottom-0  md:w-fit md:fixed md:top-0 z-[50]">
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
            <Link href="/login" className=" nav-link-grand">
              <MdOutlineLogin size={24} className=" " />
              <p className="md:hidden lg:block text-[16px] font-[400]">
                Login
              </p>
            </Link>
          </li>
          <li className={"micro-pulse" + navbarColorLiHover}>
            <Link href="/register" className=" nav-link-grand">
              <FaCashRegister size={20} className="" />
              <p className="md:hidden lg:block text-[16px] font-[400]">
                Register
              </p>
            </Link>
          </li>
        </div>
        <div className="navbar-col-end-items w-full flex flex-col items-center lg:items-start justify-end cursor-pointer">
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
          <Link href={`/login`}>
            Login
          </Link>
        </li>
        <li className="">
          <Link href={`/register`}>
            Register
          </Link>
        </li>
        {/* <li className="">
          <Link href={`/dashboard/discover`}>
            <FaRocket size={25} />
          </Link>
        </li> */}
        
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
          </div>
        </div>
      </ul>
    </nav>
  );
}

export default NavbarExternal;
