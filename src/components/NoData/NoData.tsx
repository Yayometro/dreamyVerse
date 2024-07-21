"use client"
import React from "react";
import Lottie from "lottie-react";
import zeroDataViolet from "../../../public/noData/zeroFilesViolet.json"; // Importa el JSON directamente
import useThemeCustom from "@/hooks/useTheme";

const NoData = ({ message, styles, title }: { message: string; styles?: string, title?:string }) => {
  const { theme } = useThemeCustom();
  return (
      <div className={styles || "w-full text-base"}>
        <h1 className="px-2 text-center text-2xl font-medium">{title || ""}</h1>
        <h2 className="px-2 text-center">{message}</h2>
      <Lottie
        animationData={theme === "dark" ? zeroDataViolet : zeroDataViolet} // Usa el contenido del JSON importado
        className="w-full h-full"
        
      />
    </div>
  );
};

export default NoData;
