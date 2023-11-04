interface CategoryButtonProps {
  id: number
  name: string
  selectedCategory: number
  setSelectedCategory: React.Dispatch<React.SetStateAction<number>>
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  id,
  name,
  selectedCategory,
  setSelectedCategory,
}) => {
  /** Handle click event */
  const handleClick = (): void => {
    setSelectedCategory(id)
  }

  /** Render default colors of text and background
   *  unless the category is currently selected */
  const renderTextAndBackgroundColor = (
    id: number,
    selectedCategory: number,
  ): string => {
    if (id === selectedCategory)
      return "bg-neutral-950 text-white hover:bg-black dark:bg-slate-50 dark:text-black dark:hover:bg-white"

    return "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 focus:bg-neutral-200 dark:focus:bg-neutral-700"
  }

  return (
    <button
      onClick={handleClick}
      className={`${renderTextAndBackgroundColor(
        id,
        selectedCategory,
      )} transition-hover select-none rounded-lg px-3 py-1 focus:outline-none whitespace-nowrap`}
    >
      {name}
    </button>
  )
}

export default CategoryButton
