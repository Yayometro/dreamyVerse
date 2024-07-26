"use client";
import { useTheme } from 'next-themes';

function useThemeCustom() {
  const { theme, setTheme } = useTheme();

  function setDarkTheme() {
    setTheme("dark");
  }

  function setLightTheme() {
    setTheme("light");
  }

  return {
    theme,
    setTheme,
    setDarkTheme,
    setLightTheme
  };
}

export default useThemeCustom;
