import { useState, useEffect } from "react"
import { Game } from "../../types"

interface RandomGameButtonProps {
  filteredGames: Game[]
  setSelectedGame: React.Dispatch<React.SetStateAction<Game | null>>
}

const RandomGameButton: React.FC<RandomGameButtonProps> = ({
  filteredGames,
  setSelectedGame,
}) => {
  const [shuffledGames, setShuffledGames] = useState<Game[]>([])
  const [shuffleIndex, setShuffleIndex] = useState<number>(0)

  /** Randomize array in-place using Durstenfeld shuffle algorithm
   *  Source: https://stackoverflow.com/a/12646864 */
  const shuffleGames = (games: Game[]): Game[] => {
    for (let i = games.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[games[i], games[j]] = [games[j], games[i]]
    }

    return games
  }

  // When filtered games change, shuffle games
  useEffect((): void => {
    setShuffledGames(shuffleGames(filteredGames))
  }, [filteredGames])

  /** Handle click event */
  const handleClick = (): void => {
    setSelectedGame(shuffledGames[shuffleIndex])
    setShuffleIndex((shuffleIndex) => shuffleIndex + 1)
  }

  // When button is clicked, and shuffle index is at the end of
  // or outside shuffled games array, reset shuffle index
  useEffect((): void => {
    if (shuffleIndex >= shuffledGames.length) setShuffleIndex(0)
  }, [handleClick])

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
