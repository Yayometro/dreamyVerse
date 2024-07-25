"use client";
import React from "react";
import Lottie from "lottie-react";
import creatingLottie from "../../../../public/lotties/Creating.json"; // Importa el JSON directamente
import useThemeCustom from "@/hooks/useTheme";

const CreatingLottie = ({
  message,
  styles,
  title,
  custom,
}: {
  message: string;
  styles?: string;
  title?: string;
  custom?: boolean;
}) => {
  const { theme } = useThemeCustom();
  return (
    <div
      className={` ${
        custom ? "text-black" : "text-white"
      }` + 
        styles ||
        `w-full h-full text-base `
      }
    >
      <h1 className="px-2 text-center text-2xl font-medium">{title || ""}</h1>
      <h2 className="px-2 text-center">{message}</h2>
      <Lottie
        animationData={theme === "dark" ? creatingLottie : creatingLottie} // Usa el contenido del JSON importado
        className="w-full h-full"
      />
    </div>
  );
};

export default CreatingLottie;
