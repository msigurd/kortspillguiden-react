import { useState } from "react"
import { Game } from "../../types"

interface RandomGameButtonProps {
  filteredGames: Game[]
  setSelectedGame: React.Dispatch<React.SetStateAction<Game | null>>
}

const RandomGameButton: React.FC<RandomGameButtonProps> = ({
  filteredGames,
  setSelectedGame,
}) => {
  const [previousGame, setPreviousGame] = useState<Game | null>(null)

  // Get a random game from the filtered games array
  const getRandomGame = (filteredGames: Game[]): Game => {
    const randomIndex = Math.floor(Math.random() * filteredGames.length)
    const randomGame = filteredGames[randomIndex]
    return randomGame
  }

  // Handle click event
  const handleClick = (): void => {
    let randomGame: Game | null = null

    // Only one game filtered
    if (filteredGames.length === 1) {
      // Get random game
      randomGame = getRandomGame(filteredGames)
    }

    // More than one game filtered
    if (filteredGames.length > 1) {
      // Get random game until it's different from the last
      do {
        randomGame = getRandomGame(filteredGames)
      } while (randomGame === previousGame)
    }

    setPreviousGame(randomGame)
    setSelectedGame(randomGame)
  }

  return (
    <button
      onClick={handleClick}
      className={`transition-hover w-full rounded-full bg-amber-300 py-2 text-black shadow-[0_5px_0] shadow-amber-700 hover:bg-amber-400 focus:bg-amber-400 focus:outline-none active:translate-y-[5px] active:bg-amber-500 active:shadow-none xxs:px-12`}
    >
      Tilfeldig spill
    </button>
  )
}

export default RandomGameButton
