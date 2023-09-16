import * as Tooltip from "@radix-ui/react-tooltip"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"

interface ScrollButtonProps {
  direction: "left" | "right"
  containerRef: React.RefObject<HTMLDivElement>
}

const ScrollButton: React.FC<ScrollButtonProps> = ({
  direction,
  containerRef,
}) => {
  // Handle scroll event
  const handleScroll = (): void => {
    if (!containerRef.current) return

    // Width of category selection component
    const containerWidth = containerRef.current.clientWidth
    // Extra padding added to the scroll position
    const bufferPadding = 192

    // If direction is "left", scroll to the left
    if (direction === "left") {
      containerRef.current.scrollBy({
        left: -(containerWidth - bufferPadding),
        behavior: "smooth",
      })

      return
    }

    // Otherwise, scroll to the right
    containerRef.current.scrollBy({
      left: containerWidth - bufferPadding,
      behavior: "smooth",
    })
  }

  // Render position for scroll button based on value of direction parameter
  const renderPosition = (direction: "left" | "right"): string => {
    if (direction === "left") {
      return "left-0 justify-start bg-gradient-to-r"
    }

    return "right-0 justify-end bg-gradient-to-l"
  }

  return (
    <div
      className={`${renderPosition(
        direction,
      )} absolute flex w-24 from-lightPrimary from-50% dark:from-darkPrimary`}
    >
      <Tooltip.Provider delayDuration={100}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button onClick={handleScroll} className="icon-button p-1.5">
              {direction === "left" ? (
                <ChevronLeftIcon className="h-5 w-5" />
              ) : (
                <ChevronRightIcon className="h-5 w-5" />
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
              {direction === "left" ? <p>Forrige</p> : <p>Neste</p>}
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  )
}

export default ScrollButton
