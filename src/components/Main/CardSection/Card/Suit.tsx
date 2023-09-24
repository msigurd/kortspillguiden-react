import { useEffect } from "react"

interface SuitProps {
  index: number
  className?: string
}

const Suit: React.FC<SuitProps> = ({ index, className }) => {
  // Render playing card suit based on the card's index value
  const renderSuit = (index: number): string => {
    const suits = ["♦️", "♠️", "♥️", "♣️"]
    const suitIndex = index % suits.length

    return suits[suitIndex]
  }

  // Render either a red or a black color value based on the card's suit
  const renderCardColor = (index: number): string => {
    if (renderSuit(index) === "♦️" || renderSuit(index) === "♥️") {
      return "red-600"
    }

    return "black"
  }

  // Apply larger font size for suits on Chrome browser
  useEffect((): void => {
    // Check if the user is using Chrome
    if (/chrome/i.test(navigator.userAgent)) {
      // Select suits and apply the Chrome suit class
      const chromeSuits = document.querySelectorAll(".suit")
      chromeSuits.forEach((suit) => {
        suit.classList.add("suit-chrome")
      })
    }
  }, [])

  return (
    <p
      className={`text-${renderCardColor(index)} leading-10 suit ${className}`}
    >
      {renderSuit(index)}
    </p>
  )
}

export default Suit
