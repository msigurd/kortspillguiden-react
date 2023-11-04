interface LogoCardsProps {
  text: string
  firstCharBlack?: boolean
}

const LogoCards: React.FC<LogoCardsProps> = ({ text, firstCharBlack }) => {
  // Split text into letters
  const letters: string[] = text.split("")

  /** Render a card's text color and position based on the given index */
  const renderCardTextColorAndPosition = (index: number): string => {
    // Component is set to have a black first character (firstCharBlack === true)
    if (firstCharBlack) {
      // Apply different styling for even and odd index cards
      if (index % 2 === 0) return "text-black translate-y-px z-10"

      return "text-red-600 -translate-y-px"
    }

    // Apply different styling for even and odd index cards
    if (index % 2 === 0) return "text-red-600 -translate-y-px"

    return "text-black translate-y-px z-10"
  }

  return (
    <div className="flex">
      {letters.map((character, index) => (
        <p
          key={index}
          className={`${renderCardTextColorAndPosition(
            index,
          )} -mr-0.5 rounded-sm bg-white px-[5px] font-semibold shadow`}
        >
          {character}
        </p>
      ))}
    </div>
  )
}

export default LogoCards
