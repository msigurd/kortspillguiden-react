import { Game } from "../../types"
import CardSection from "./CardSection"
import RandomGameButton from "./RandomGameButton"

interface MainProps {
  filteredGames: Game[]
  setSelectedGame: React.Dispatch<React.SetStateAction<Game | null>>
}

const Main: React.FC<MainProps> = ({ filteredGames, setSelectedGame }) => {
  // Render all card sections
  const renderCardSections = (filteredGames: Game[]): JSX.Element[] => {
    const cardSections: JSX.Element[] = []

    // Number array of unique minimum players values
    // for all games, sorted in ascending order
    const uniqueMinPlayers: number[] = Array.from(
      new Set(filteredGames.map((game) => game.minPlayers)),
    ).sort((a, b) => a - b)

    // Add a card section to the array
    // for each unique minimum players value
    for (const minPlayers of uniqueMinPlayers) {
      let sectionGames = filteredGames

      // Filter games for the current section by minimum players value,
      // then sort them alphabetically
      sectionGames = sectionGames
        .filter((game) => game.minPlayers === minPlayers)
        .sort((a, b) => a.name.localeCompare(b.name))

      // Add new card section to the array
      // if any games have been filtered
      if (sectionGames.length > 0) {
        cardSections.push(
          <CardSection
            key={minPlayers}
            games={sectionGames}
            players={minPlayers}
            setSelectedGame={setSelectedGame}
          />,
        )
      }
    }

    return cardSections
  }

  // Get card sections
  const cardSections: JSX.Element[] = renderCardSections(filteredGames)

  return cardSections.length > 0 ? (
    <div className="flex flex-col">
      <div className="flex justify-center xs:justify-end">
        <div className="w-full xs:w-48">
          <RandomGameButton
            filteredGames={filteredGames}
            setSelectedGame={setSelectedGame}
          />
        </div>
      </div>
      <div className="mt-6 xs:mt-0">{cardSections}</div>
    </div>
  ) : (
    <div className="mt-5 text-lg">Ingen spill under de valgte filterne</div>
  )
}

export default Main
