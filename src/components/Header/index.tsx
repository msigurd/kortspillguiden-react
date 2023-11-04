import { useState, useEffect, useRef } from "react"
import { Game } from "../../types"
import Logo from "./Logo"
import SearchBar from "./SearchBar"
import SearchToggle from "./SearchToggle"
import PlayersSelect from "./PlayersSelect"
import DarkModeToggle from "./DarkModeToggle"
import CategorySelection from "./CategorySelection"

interface HeaderProps {
  darkMode: boolean
  toggleDarkMode: () => void
  selectedPlayerAmount: number
  setSelectedPlayerAmount: React.Dispatch<React.SetStateAction<number>>
  selectedCategory: number
  setSelectedCategory: React.Dispatch<React.SetStateAction<number>>
  setSelectedGame: React.Dispatch<React.SetStateAction<Game | null>>
}

const Header: React.FC<HeaderProps> = ({
  darkMode,
  toggleDarkMode,
  selectedPlayerAmount,
  setSelectedPlayerAmount,
  selectedCategory,
  setSelectedCategory,
  setSelectedGame,
}) => {
  const [searchExpanded, setSearchExpanded] = useState<boolean>(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const headerTopRef = useRef<HTMLDivElement>(null)
  const [searchToggleClicked, setSearchToggleClicked] = useState<boolean>(false)

  /** If search bar is expanded on smaller screen sizes, hide content,
   *  if not, show it */
  const hideOnSearchExpanded = (searchExpanded: boolean): string => {
    if (searchExpanded) return "hidden"

    return ""
  }

  /** If search bar is expanded on smaller screen sizes, show content,
   *  if not, hide it */
  const showOnSearchExpanded = (searchExpanded: boolean): string => {
    if (!searchExpanded) return "hidden"

    return ""
  }

  // Focus on search bar input when expanded on smaller screen sizes
  useEffect((): void => {
    if (searchExpanded && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchExpanded])

  /** Handle click outside header's top area */
  const handleClickOutside = (event: MouseEvent): void => {
    if (
      headerTopRef.current &&
      !headerTopRef.current.contains(event.target as Node)
    ) {
      // Collapse search bar on smaller screen sizes
      setSearchExpanded(false)
    }
  }

  useEffect(() => {
    // Add event listener for mousedown event to handle click outside header's
    // top area
    document.addEventListener("mousedown", handleClickOutside)

    // When component unmounts, remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="flex h-30 flex-col gap-2 justify-center bg-lightPrimary dark:bg-darkPrimary">
      <div
        ref={headerTopRef}
        className="flex h-3/6 items-center gap-5 desktop:gap-28"
      >
        <div
          className={`${hideOnSearchExpanded(
            searchExpanded,
          )} mr-2 desktop:block`}
        >
          <Logo />
        </div>
        <div
          className={`${showOnSearchExpanded(searchExpanded)} desktop:hidden`}
        >
          <SearchToggle
            searchExpanded={searchExpanded}
            setSearchExpanded={setSearchExpanded}
            setSearchToggleClicked={setSearchToggleClicked}
          />
        </div>
        <div
          className={`${showOnSearchExpanded(
            searchExpanded,
          )} w-full desktop:mx-auto desktop:block`}
        >
          <SearchBar
            inputRef={searchInputRef}
            setSearchExpanded={setSearchExpanded}
            searchToggleClicked={searchToggleClicked}
            setSearchToggleClicked={setSearchToggleClicked}
            setSelectedGame={setSelectedGame}
          />
        </div>
        <div
          className={`${hideOnSearchExpanded(
            searchExpanded,
          )} ml-auto flex items-center desktop:ml-0 desktop:flex desktop:gap-2`}
        >
          <SearchToggle
            searchExpanded={searchExpanded}
            setSearchExpanded={setSearchExpanded}
            setSearchToggleClicked={setSearchToggleClicked}
          />
          <PlayersSelect
            selectedPlayerAmount={selectedPlayerAmount}
            setSelectedPlayerAmount={setSelectedPlayerAmount}
          />
          <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </div>
      <CategorySelection
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  )
}

export default Header
