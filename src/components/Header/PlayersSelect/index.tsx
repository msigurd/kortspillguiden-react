import games from "../../../data/games.json"
import * as Popover from "@radix-ui/react-popover"
import * as Tooltip from "@radix-ui/react-tooltip"
import { PersonIcon } from "@radix-ui/react-icons"
import PlayerSelectItem from "./PlayersSelectItem"

interface PlayerSelectProps {
  selectedPlayerAmount: number
  setSelectedPlayerAmount: React.Dispatch<React.SetStateAction<number>>
}

const PlayerSelect: React.FC<PlayerSelectProps> = ({
  selectedPlayerAmount,
  setSelectedPlayerAmount,
}) => {
  // Number array of unique possible player counts for all games
  const playerCounts: number[] = (() => {
    // Set to store unique player counts
    const playerCountsSet = new Set<number>()

    // Iterate through each game
    for (const game of games) {
      // Iterate through the range of player counts for current game
      for (
        let playerCount = game.minPlayers;
        playerCount <= game.maxPlayers;
        playerCount++
      ) {
        playerCountsSet.add(playerCount)
      }
    }

    // Convert the set to an array and sort it in ascending order
    return Array.from(playerCountsSet).sort((a, b) => a - b)
  })()

  // Render text for the amount of players
  const renderPlayers = (players: number): string => {
    if (players === 0) {
      // Undefined player amount
      return "Ubestemt"
    }

    if (players === 1) {
      // One player
      return players + " spiller"
    }

    // Multiple players
    return players + " spillere"
  }

  return (
    <Popover.Root>
      <Tooltip.Provider delayDuration={100}>
        <Tooltip.Root>
          <Popover.Trigger asChild>
            <Tooltip.Trigger asChild>
              <button
                className="transition-hover toggle icon-button flex select-none items-center data-[state=open]:bg-lightSecondary dark:data-[state=open]:bg-darkSecondary"
                aria-label={
                  "Antall spillere: " + renderPlayers(selectedPlayerAmount)
                }
              >
                <PersonIcon className="toggle-icon" />
                <div className="text-2xl">{selectedPlayerAmount}</div>
              </button>
            </Tooltip.Trigger>
          </Popover.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              side="bottom"
              sideOffset={10}
              collisionPadding={20}
              className="tooltip-content"
            >
              Velg antall spillere
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
      <Popover.Portal>
        <Popover.Content
          onCloseAutoFocus={(event) => {
            event.preventDefault()
          }}
          sideOffset={5}
          className="z-20 mx-5 rounded bg-white
          shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]
          will-change-[transform,opacity]
          focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.green.300)] 
          data-[state=open]:data-[side=bottom]:animate-slideUpAndFade
          data-[state=open]:data-[side=left]:animate-slideRightAndFade
          data-[state=open]:data-[side=right]:animate-slideLeftAndFade
          data-[state=open]:data-[side=top]:animate-slideDownAndFade
          dark:bg-neutral-800
          dark:focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.neutral.600)]"
        >
          <div className="flex flex-col">
            <p className="mt-2 px-8 pb-1 font-medium shadow dark:shadow-md">
              Antall spillere
            </p>
            <div className="h-48 overflow-y-auto py-2">
              <PlayerSelectItem
                key={0}
                players={0}
                selectedPlayerAmount={selectedPlayerAmount}
                setSelectedPlayerAmount={setSelectedPlayerAmount}
                renderPlayers={renderPlayers}
              />
              {playerCounts.map((players) => (
                <PlayerSelectItem
                  key={players}
                  players={players}
                  selectedPlayerAmount={selectedPlayerAmount}
                  setSelectedPlayerAmount={setSelectedPlayerAmount}
                  renderPlayers={renderPlayers}
                />
              ))}
            </div>
          </div>
          <Popover.Arrow className="fill-white dark:fill-neutral-800" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default PlayerSelect
