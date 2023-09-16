import * as Tooltip from "@radix-ui/react-tooltip"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"

interface DarkModeToggleProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({
  darkMode,
  toggleDarkMode,
}) => (
  <Tooltip.Provider delayDuration={100}>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          onClick={toggleDarkMode}
          aria-label={`Valgt tema: ${darkMode ? "Mørkt" : "Lyst"}`}
          className="transition-hover icon-button toggle"
        >
          {darkMode ? (
            <SunIcon className="toggle-icon" />
          ) : (
            <MoonIcon className="toggle-icon" />
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
          Endre tema
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
)

export default DarkModeToggle
