"use client"
import { useTheme } from 'next-themes';
import React from 'react'

function useThemeCustom() {
    // const [currentTheme, setCu]
    const { theme, setTheme } = useTheme();
    function setDarkTheme(){
        setTheme("dark")
    }
    function setLightTheme(){
        setTheme("light")
    }
  return {
    theme,
    setTheme,
    setDarkTheme,
    setLightTheme
  }
}

export default useThemeCustom