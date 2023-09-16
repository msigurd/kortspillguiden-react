import { Game } from "../../../types"
import Card from "./Card"

interface CardSectionProps {
  games: Game[]
  players: number
  setSelectedGame: React.Dispatch<React.SetStateAction<Game | null>>
}

const CardSection: React.FC<CardSectionProps> = ({
  games,
  players,
  setSelectedGame,
}) => {
  // Check if any games in the section have a varied player amount
  const gameWithVaryingPlayers = (games: Game[]): boolean => {
    for (const game of games) {
      if (game.maxPlayers > game.minPlayers) {
        return true
      }
    }

    return false
  }

  // Render card section's header
  const renderSectionHeader = (games: Game[], players: number): string => {
    // If no games in the section have a varied player amount,
    // don't add a plus symbol
    if (!gameWithVaryingPlayers(games)) {
      if (players === 1) {
        // Singular
        return players + " spiller"
      }

      // Plural
      return players + " spillere"
    }

    // Plural with plus symbol
    return players + "+ spillere"
  }

  return (
    <div className="mb-12">
      <h1 className="mb-3 border-b-2 border-black pb-2 text-2xl dark:border-neutral-200">
        {renderSectionHeader(games, players)}
      </h1>
      <div className="grid grid-flow-dense gap-5 xxs:grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {games.map((game, index) => (
          <div key={game.id} className="mx-auto my-3 w-32">
            <Card
              game={game}
              index={players + index - 1}
              setSelectedGame={setSelectedGame}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CardSection
