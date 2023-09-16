import { Game } from "../../../types"
import {
  renderGameAliases,
  renderGamePlayers,
  renderGamePlayersAriaLabel,
} from "../../../utils/helpers"
import { PersonIcon } from "@radix-ui/react-icons"

interface SearchResultProps {
  game: Game
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>
  searchText: string
  setSelectedGame: React.Dispatch<React.SetStateAction<Game | null>>
}

const SearchResult: React.FC<SearchResultProps> = ({
  game,
  setShowResults,
  searchText,
  setSelectedGame,
}) => {
  // Handle click event
  const handleClick = (): void => {
    setShowResults(false)
    setSelectedGame(game)
  }

  // Format game name
  const formatGameName = (name: string, searchText: string): JSX.Element => {
    searchText = searchText.toLowerCase().trim()
    const index = name.toLowerCase().indexOf(searchText)

    // If searchText is found in the name, format it with non-matching text in bold
    if (index !== -1) {
      const firstPart = name.substring(0, index)
      const match = name.substring(index, index + searchText.length)
      const lastPart = name.substring(index + searchText.length)

      return (
        <>
          <strong>{firstPart}</strong>
          {match}
          <strong>{lastPart}</strong>
        </>
      )
    }

    // If searchText is not found in the name, return the entire name in bold
    return (
      <>
        <strong>{name}</strong>
      </>
    )
  }

  return (
    <button
      onClick={handleClick}
      className="flex h-14 items-center truncate px-4 hover:bg-neutral-200 dark:hover:bg-neutral-700 focus:bg-neutral-200 dark:focus:bg-neutral-700 outline-none"
    >
      <p className="text-2xl w-8">{game.icon}</p>
      <div className="flex flex-col pl-2">
        <div className="flex">
          <p>{formatGameName(game.name, searchText)}</p>
          {game.aliases.length > 0 && (
            <p className="text-neutral-700 dark:text-neutral-400">
              &nbsp;({renderGameAliases(game.aliases)})
            </p>
          )}
        </div>
        <p
          aria-label={renderGamePlayersAriaLabel(
            game.minPlayers,
            game.maxPlayers,
          )}
          className="flex items-center gap-0.5 text-sm text-neutral-500 dark:text-neutral-400"
        >
          <PersonIcon className="h-3.5 w-3.5" />
          {renderGamePlayers(game.minPlayers, game.maxPlayers)}
        </p>
      </div>
    </button>
  )
}

export default SearchResult
