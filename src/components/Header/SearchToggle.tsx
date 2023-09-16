import * as Tooltip from "@radix-ui/react-tooltip"
import { MagnifyingGlassIcon, ArrowLeftIcon } from "@radix-ui/react-icons"

interface SearchToggleProps {
  searchExpanded: boolean
  setSearchExpanded: React.Dispatch<React.SetStateAction<boolean>>
  setSearchToggleClicked: React.Dispatch<React.SetStateAction<boolean>>
}

const SearchToggle: React.FC<SearchToggleProps> = ({
  searchExpanded,
  setSearchExpanded,
  setSearchToggleClicked,
}) => {
  // Handle click event
  const handleClick = (): void => {
    setSearchExpanded(!searchExpanded)
    setSearchToggleClicked(true)
  }

  return (
    <Tooltip.Provider delayDuration={100}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={handleClick}
            aria-label={searchExpanded ? "Lukk søk" : "Åpne søk"}
            className="transition-hover toggle icon-button desktop:hidden"
          >
            {searchExpanded ? (
              <ArrowLeftIcon className="toggle-icon" />
            ) : (
              <MagnifyingGlassIcon className="toggle-icon" />
            )}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="bottom"
            sideOffset={10}
            collisionPadding={20}
            className="tooltip-content"
          >
            {searchExpanded ? <p>Tilbake</p> : <p>Søk</p>}
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}

export default SearchToggle
