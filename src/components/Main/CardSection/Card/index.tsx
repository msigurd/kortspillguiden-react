import { Game } from "../../../../types"
import Suit from "./Suit"
import {
  renderGamePlayers,
  renderGamePlayersAriaLabel,
} from "../../../../utils/helpers"
import { PersonIcon } from "@radix-ui/react-icons"

interface CardProps {
  game: Game
  index: number
  setSelectedGame: React.Dispatch<React.SetStateAction<Game | null>>
}

const Card: React.FC<CardProps> = ({ game, index, setSelectedGame }) => {
  // Handle click event
  const handleClick = (): void => {
    setSelectedGame(game)
  }

  return (
    <div className="flex transform flex-col items-center transition-all hover:scale-110 active:scale-110">
      <div
        onClick={handleClick}
        className="h-36 w-24 cursor-pointer select-none rounded-md bg-white shadow-md dark:bg-neutral-100 dark:shadow-none"
      >
        <div className="flex h-full flex-col">
          <Suit index={index} className="ml-2 mb-auto self-start" />
          <p className="my-auto self-center text-5xl text-black">{game.icon}</p>
          <Suit index={index} className="mr-2 mt-auto self-end" />
        </div>
      </div>
      <button
        onClick={handleClick}
        className="mt-2 flex max-w-full flex-col items-center"
      >
        <p className="w-full text-lg xxs:truncate">{game.name}</p>
        <p
          aria-label={renderGamePlayersAriaLabel(
            game.minPlayers,
            game.maxPlayers,
          )}
          className="flex select-none items-center gap-0.5"
        >
          <PersonIcon className="text-icon" />
          {renderGamePlayers(game.minPlayers, game.maxPlayers)}
        </p>
      </button>
    </div>
  )
}

export default Card
