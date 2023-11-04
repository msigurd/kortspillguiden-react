import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import games from "./data/games.json"
import { Game } from "./types"
import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import useDarkMode from "./hooks/useDarkMode"
import GameDialog from "./components/GameDialog"

const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams({ game: "" })
  const { darkMode, toggleDarkMode } = useDarkMode()
  const [selectedPlayerAmount, setSelectedPlayerAmount] = useState<number>(0)
  const [selectedCategory, setSelectedCategory] = useState<number>(0)
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)

  // When selectedGame state changes, change page title
  useEffect((): void => {
    // If a game is displayed, include game name in title
    if (selectedGame) {
      document.title = selectedGame.name + " - Kortspillguiden"
      return
    }

    // If a game isn't displayed, show only website name in title
    document.title = "Kortspillguiden"
  }, [selectedGame])

  /** Set query parameters */
  const updateQueryParams = (): void => {
    const params = new URLSearchParams()

    // If a game is selected, set parameters to selected game id
    if (selectedGame) {
      params.set("game", selectedGame.id.toString())
    }

    // If a game isn't selected, leave parameters blank
    setSearchParams(params, { replace: true })
  }

  // When selectedGame state changes, update query parameters
  useEffect((): void => {
    updateQueryParams()
  }, [selectedGame])

  // When the component mounts, get game id from the query parameters
  // from the URL and set selected game based on game id
  useEffect((): void => {
    const gameParam = searchParams.get("game")

    if (gameParam) {
      const gameId = parseInt(gameParam)
      const selectedGame = games.find((game) => game.id === gameId)

      if (selectedGame) {
        setSelectedGame(selectedGame)
      }
    }
  }, [])

  /** Filter games by selected player amount and category */
  const filterGames = (
    games: Game[],
    selectedPlayerAmount: number,
    selectedCategory: number,
  ): Game[] => {
    let filteredGames = games

    // Filter games by selected player amount if set
    if (selectedPlayerAmount > 0) {
      filteredGames = filteredGames.filter(
        (game) =>
          game.minPlayers <= selectedPlayerAmount &&
          game.maxPlayers >= selectedPlayerAmount,
      )
    }

    // Filter games further by selected category if set
    if (selectedCategory > 0) {
      filteredGames = filteredGames.filter((game) =>
        game.categories.includes(selectedCategory),
      )
    }

    return filteredGames
  }

  // Get filtered games
  const filteredGames: Game[] = useMemo(
    () => filterGames(games, selectedPlayerAmount, selectedCategory),
    [games, selectedPlayerAmount, selectedCategory],
  )

  return (
    <div className="flex flex-col items-center">
      <header className="fixed z-10 w-full max-w-6xl px-2">
        <Header
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          selectedPlayerAmount={selectedPlayerAmount}
          setSelectedPlayerAmount={setSelectedPlayerAmount}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSelectedGame={setSelectedGame}
        />
      </header>
      <div className="flex min-h-screen w-full max-w-6xl flex-col px-4">
        <main className="mt-32">
          <Main
            filteredGames={filteredGames}
            setSelectedGame={setSelectedGame}
          />
        </main>
        <footer className="mb-8 mt-auto pt-12">
          <Footer />
        </footer>

        {selectedGame && (
          <GameDialog game={selectedGame} setSelectedGame={setSelectedGame} />
        )}
      </div>
    </div>
  )
}

export default App
