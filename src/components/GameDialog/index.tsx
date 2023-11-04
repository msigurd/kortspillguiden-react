import React from "react"
import { Game } from "../../types"
import categories from "../../data/categories.json"
import { Category } from "../../types"
import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon, PersonIcon, ClockIcon } from "@radix-ui/react-icons"
import GameCategory from "./GameCategory"
import { renderGamePlayers, sortCategoriesByOrder } from "../../utils/helpers"
import GameSetupSVG from "./GameSetupSVG"
import { renderGameAliases } from "../../utils/helpers"

interface GameDialogProps {
  game: Game
  setSelectedGame: React.Dispatch<React.SetStateAction<Game | null>>
}

const GameDialog: React.FC<GameDialogProps> = ({ game, setSelectedGame }) => {
  /** Handle close */
  const handleClose = (): void => {
    setSelectedGame(null)
  }

  // Array containing categories associated with the current game,
  // sorted by their "order" value
  const gameCategories: Category[] = categories
    .filter((category) => game.categories.includes(category.id))
    .sort((a, b) => a.order - b.order)

  /** Render a game's duration */
  const renderGameDuration = (
    minDurationMin: number,
    maxDurationMin: number,
  ): string => {
    // Single duration
    if (minDurationMin === maxDurationMin)
      return minDurationMin.toString() + " min"

    // Range of durations
    return minDurationMin.toString() + "-" + maxDurationMin.toString() + " min"
  }

  return (
    <Dialog.Root open onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black opacity-40 data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-2/4 top-2/4 z-40 max-h-5/6 w-11/12 max-w-xl translate-x-[-50%] translate-y-[-50%] overflow-x-hidden overflow-y-auto rounded-md bg-white p-6 shadow-lg focus:outline-none data-[state=open]:animate-contentShow dark:bg-neutral-900">
          <Dialog.Title className="text-mauve12 text-2xl font-bold">
            {game.name}
          </Dialog.Title>
          {game.aliases.length > 0 && (
            <p className="w-fit gap-4 rounded pt-1 pl-0.5 text-neutral-700 dark:text-neutral-400">
              {renderGameAliases(game.aliases)}
            </p>
          )}
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              {sortCategoriesByOrder(gameCategories).map((category) => (
                <GameCategory
                  key={category.id}
                  categoryName={category.nameSingular}
                  categoryIcon={category.icon}
                />
              ))}
            </div>
            <div className="flex w-fit gap-4 rounded p-1 pl-0 text-neutral-700 dark:text-neutral-400">
              <p className="flex items-center gap-0.5">
                <PersonIcon className="text-icon" />
                {renderGamePlayers(game.minPlayers, game.maxPlayers)}
              </p>
              <p className="flex items-center gap-1">
                <ClockIcon className="text-icon" />
                {renderGameDuration(game.minDurationMin, game.maxDurationMin)}
              </p>
            </div>
            <GameSetupSVG
              name={game.svg}
              aria-label={`Oppsett for ${game.name}`}
              className="mx-auto w-full h-fit max-w-sm max-h-64 mt-3 mb-5"
            />
            {game.lowestCard.length > 0 && game.highestCard.length > 0 && (
              <div className="bg-amber-300 text-black rounded-md py-2 px-3 flex flex-col gap-2 mb-4 max-w-fit">
                <div className="flex gap-4 items-end">
                  <p className="flex-grow">Laveste kort:</p>
                  <p className="font-bold">{game.lowestCard}</p>
                </div>
                <div className="flex gap-4 items-end">
                  <p className="flex-grow">Høyeste kort:</p>
                  <p className="font-bold">{game.highestCard}</p>
                </div>
              </div>
            )}
            <div>
              <h2 className="game-dialog-subheader">Mål</h2>
              <p className="whitespace-pre-wrap">{game.goal}</p>
              <br />
              <h2 className="game-dialog-subheader">Oppsett</h2>
              {!game.jokers && (
                <p>
                  Fjern alle jokere fra kortstokken.
                  <br /> <br />
                </p>
              )}
              <p className="whitespace-pre-wrap">{game.setup}</p>
              <br />
              <h2 className="game-dialog-subheader">Spillets gang</h2>
              <p className="whitespace-pre-wrap">{game.howToPlay}</p>
            </div>
          </div>
          <Dialog.Close asChild>
            <button
              className="focus:shadow-violet7 absolute right-4 top-4 inline-flex h-6 w-6 cursor-default appearance-none items-center justify-center rounded-full hover:bg-neutral-200 focus:shadow-[0_0_0_2px] focus:outline-none dark:hover:bg-darkSecondary"
              aria-label="Lukk"
            >
              <Cross2Icon className="h-7 w-7" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default GameDialog
