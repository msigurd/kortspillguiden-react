import { useState, useEffect, useRef, useCallback } from "react"
import games from "../../../data/games.json"
import { Game } from "../../../types"
import { MagnifyingGlassIcon, Cross1Icon } from "@radix-ui/react-icons"
import SearchResult from "./SearchResult"

interface SearchBarProps {
  inputRef: React.RefObject<HTMLInputElement>
  setSearchExpanded: React.Dispatch<React.SetStateAction<boolean>>
  searchToggleClicked: boolean
  setSearchToggleClicked: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedGame: React.Dispatch<React.SetStateAction<Game | null>>
}

const SearchBar: React.FC<SearchBarProps> = ({
  inputRef,
  setSearchExpanded,
  searchToggleClicked,
  setSearchToggleClicked,
  setSelectedGame,
}) => {
  const [searchText, setSearchText] = useState<string>("")
  const [searchResults, setSearchResults] = useState<Game[]>([])
  const [showResults, setShowResults] = useState<boolean>(false)
  const searchResultsRef = useRef<HTMLDivElement>(null)

  // Handle input state
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value)

    // Filter games based on search text
    const results = games.filter((game: Game) => {
      const formattedSearchText = event.target.value.toLowerCase().trim()

      const gameAliases = game.aliases.map((alias) => alias.toLowerCase())

      // Check if game name or any alias matches search text
      return (
        game.name.toLowerCase().includes(formattedSearchText) ||
        gameAliases.some((alias) => alias.includes(formattedSearchText))
      )
    })

    // Set filtered game(s) as search result(s)
    setSearchResults(results)

    // If there are search results, set showResults to true
    if (results.length > 0) {
      setShowResults(true)
    }
  }

  // Handle clear
  const handleClear = (): void => {
    // Clear search text
    setSearchText("")

    // Re-focus on input after clear, but wait until
    // searchResults have been fully cleared
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 250)
  }

  // Handle search input's focus and click events
  const handleFocusAndClick = (): void => {
    setShowResults(true)
    setSearchExpanded(true)
  }

  // Handle search input's blur event
  const handleBlur = (): void => {
    // If screen size is wider than mobile width, set searchExpanded to false on blur
    if (window.innerWidth > 768) {
      setSearchExpanded(false)
    }
  }

  // Handle click outside search input and -results
  const handleClickOutside = useCallback(
    (event: MouseEvent): void => {
      let wasSearchToggleClicked = false

      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node)
      ) {
        // If search toggle was clicked, set wasSearchToggleClicked to true
        // and reset searchToggleClicked state
        if (searchToggleClicked) {
          wasSearchToggleClicked = true
          setSearchToggleClicked(false)
        }

        // If search toggle wasn't clicked, hide search results
        if (!wasSearchToggleClicked) {
          setShowResults(false)
        }
      }
    },
    [searchToggleClicked],
  )

  // Handle keydown events
  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      // Handle "Escape" key press event
      if (event.key === "Escape") {
        // If there are search results, hide the search results
        if (searchResults.length > 0) {
          setShowResults(false)
        }

        // If search input is focused and search results are already hidden,
        // or search input is focused and there are no search results,
        // unfocus (blur) the input
        if (
          (inputRef.current && !showResults) ||
          (inputRef.current && searchResults.length === 0)
        ) {
          inputRef.current.blur()
        }
      }
    },
    [searchResults, showResults],
  )

  // Handle keyup events
  const handleKeyUp = useCallback(
    (event: KeyboardEvent): void => {
      // Handle "Enter" key release event
      if (
        event.key === "Enter" &&
        inputRef.current === document.activeElement
      ) {
        // If there are only one search result, set the search result
        // as selected
        if (searchResults.length === 1) {
          setSelectedGame(searchResults[0])
        }
      }
    },
    [searchResults],
  )

  useEffect(() => {
    // Add event listener for click event to handle click outside search input
    // and -results
    document.addEventListener("click", handleClickOutside)
    // Add event listener for keydown event to handle key presses
    document.addEventListener("keydown", handleKeyDown)
    // Add event listener for keyup event to handle key releases
    document.addEventListener("keyup", handleKeyUp)

    // Remove event listeners when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [handleClickOutside, handleKeyDown, handleKeyUp])

  return (
    <div className="relative flex select-none flex-col">
      <div className="flex items-center rounded-full border-2 border-transparent bg-white shadow-md dark:border-neutral-700 dark:bg-transparent dark:shadow-none">
        <MagnifyingGlassIcon className="ml-4 h-6 w-6 flex-shrink-0 text-neutral-400" />
        <input
          type="text"
          ref={inputRef}
          placeholder="Søk etter spill"
          value={searchText}
          onChange={handleSearch}
          onFocus={handleFocusAndClick}
          onBlur={handleBlur}
          onClick={handleFocusAndClick}
          className="h-12 w-full bg-transparent px-3 outline-none"
        />
        {searchText && (
          <button
            onClick={handleClear}
            className="mr-3 flex-shrink-0 rounded-full p-2 text-neutral-400 hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-darkHover dark:active:bg-darkSecondary"
          >
            <Cross1Icon
              onClick={handleClear}
              aria-label="Tøm søk"
              className="h-5 w-5"
            />
          </button>
        )}
      </div>

      {searchText && searchResults.length > 0 && showResults && (
        <div
          ref={searchResultsRef}
          className="absolute z-10 mt-14 flex min-w-full flex-col rounded-2xl bg-white py-4 shadow-md dark:bg-neutral-800"
        >
          {searchResults.slice(0, 7).map((game) => (
            <SearchResult
              key={game.id}
              game={game}
              setShowResults={setShowResults}
              searchText={searchText}
              setSelectedGame={setSelectedGame}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
