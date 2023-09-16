import { Category } from "../types"

// Render a game's player amount
export const renderGamePlayers = (
  minPlayers: number,
  maxPlayers: number,
): string => {
  if (minPlayers === maxPlayers) {
    return minPlayers.toString()
  }

  // Range of possible players
  return minPlayers + "-" + maxPlayers
}

// Render aria label for a game's player amount
export const renderGamePlayersAriaLabel = (
  minPlayers: number,
  maxPlayers: number,
): string => {
  if (minPlayers === maxPlayers) {
    // Singular
    if (minPlayers === 1) {
      return minPlayers.toString() + " spiller"
    }

    // Plural
    return minPlayers.toString() + " spillere"
  }

  // Range of possible players
  return minPlayers + " til " + maxPlayers + " spillere"
}

// Render a game's aliases
export const renderGameAliases = (aliases: string[]): JSX.Element => {
  // Separate each alias with a comma
  const formattedAliases = aliases.join(", ")

  return (
    <>
      eller&nbsp;
      <i>{formattedAliases}</i>
    </>
  )
}

// Sort categories by their order value
export const sortCategoriesByOrder = (categories: Category[]): Category[] => {
  return categories.sort((a, b) => a.order - b.order)
}
