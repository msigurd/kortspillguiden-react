import LogoCards from "./LogoCards"

const Logo: React.FC = () => {
  // Handle click event
  const handleClick = (): void => {
    window.location.reload()
  }

  return (
    <a
      href="/"
      onClick={handleClick}
      aria-label="Oppfrisk siden"
      className="flex select-none flex-col"
    >
      <div className="z-10 translate-y-px">
        <LogoCards text="Kortspill" />
      </div>
      <div className="-translate-y-px self-center">
        <LogoCards text="-guiden" firstCharBlack={true} />
      </div>
    </a>
  )
}

export default Logo
