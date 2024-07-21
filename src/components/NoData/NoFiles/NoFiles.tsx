"use client";

import React from "react";
import Lottie from "lottie-react";
import zeroDataViolet from "../../../../public/noData/zeroFilesViolet.json"; // Importa el JSON directamente
import useThemeCustom from "@/hooks/useTheme";

const NoFiles = ({ message, styles }: { message: string; styles?: string }) => {
  const { theme } = useThemeCustom();
  return (
      <div className={styles || "w-full text-base"}>
        <h2 className="px-2 text-center">{message}</h2>
      <Lottie
        animationData={theme === "dark" ? zeroDataViolet : zeroDataViolet} // Usa el contenido del JSON importado
        className="w-full h-full"
        
      />
    </div>
  );
};

export default NoFiles;
