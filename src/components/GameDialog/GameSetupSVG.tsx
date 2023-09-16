interface GameSetupSVGProps {
  name: string
  ariaLabel?: string
  className?: string
}

const GameSetupSVG: React.FC<GameSetupSVGProps> = ({
  name,
  ariaLabel,
  className,
}) => {
  // Import SVG modules dynamically from game-setups directory
  const svgModule: Record<
    string,
    { ReactComponent: React.FC<React.SVGProps<SVGSVGElement>> }
  > = import.meta.glob("../../statics/game-setups/*.svg", { eager: true })

  // Get React component for the displayed game's SVG file
  const SvgComponent =
    svgModule[`../../statics/game-setups/${name}.svg`]?.ReactComponent

  // If the SVG component doesn't exist, return null
  if (!SvgComponent) {
    return null
  }

  return <SvgComponent aria-label={ariaLabel} className={className} />
}

export default GameSetupSVG
