"use client";
import React from "react";
import Lottie from "lottie-react";
import settingUpColorerd from "../../../../public/lotties/SettingUpColorerd.json"; // Importa el JSON directamente
import useThemeCustom from "@/hooks/useTheme";

const SettingUpLottie = ({
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
      className={` relative` + 
        styles ||
        `w-full h-full text-base ${
          custom ? "text-black" : "text-white"
        }`
      }
    >
      <h1 className="px-2 text-center text-2xl font-medium">{title || ""}</h1>
      <h2 className="px-2 text-center">{message}</h2>
      <Lottie
        animationData={theme === "dark" ? settingUpColorerd : settingUpColorerd} // Usa el contenido del JSON importado
        className="w-full h-full absolute top-0 left-0"
      />
    </div>
  );
};

export default SettingUpLottie;
