import { Close as PopoverClose } from "@radix-ui/react-popover"
import { CheckIcon } from "@radix-ui/react-icons"

interface PlayerSelectItemProps {
  players: number
  selectedPlayerAmount: number
  setSelectedPlayerAmount: React.Dispatch<React.SetStateAction<number>>
  renderPlayers: (players: number) => string
}

const PlayerSelectItem: React.FC<PlayerSelectItemProps> = ({
  players,
  selectedPlayerAmount,
  setSelectedPlayerAmount,
  renderPlayers,
}) => {
  /** Handle click event */
  const handleClick = (): void => {
    setSelectedPlayerAmount(players)
  }

  // Check if the player amount is selected
  const isSelected = players === selectedPlayerAmount

  return (
    <PopoverClose
      onClick={handleClick}
      className="relative mx-auto flex w-full cursor-pointer items-center bg-transparent px-2 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-700"
    >
      <div className="absolute">
        {isSelected && <CheckIcon aria-label="Valgt:" className="h-5 w-5" />}
      </div>
      <div className="mx-6 truncate">{renderPlayers(players)}</div>
    </PopoverClose>
  )
}

export default PlayerSelectItem
