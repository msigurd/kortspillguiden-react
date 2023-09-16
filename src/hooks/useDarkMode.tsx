import { useEffect, useState } from "react"

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false)

  // Enable/disable dark mode by adding/removing "dark" class to/from
  // document.documentElement, based on dark mode value
  useEffect((): void => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      document.documentElement.setAttribute("data-color-scheme", "dark")
      return
    }

    document.documentElement.classList.remove("dark")
    document.documentElement.setAttribute("data-color-scheme", "light")
  }, [darkMode])

  // Set to dark mode if user's system preference is set to dark mode
  useEffect((): void => {
    const darkModePreference = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches
    setDarkMode(darkModePreference)
  }, [])

  return { darkMode, toggleDarkMode: () => setDarkMode(!darkMode) }
}

export default useDarkMode
