import { useCallback, useEffect, useRef, useState } from "react"
import ScrollButton from "./ScrollButton"
import categories from "../../../data/categories.json"
import CategoryButton from "./CategoryButton"
import { sortCategoriesByOrder } from "../../../utils/helpers"

interface CategorySelectionProps {
  selectedCategory: number
  setSelectedCategory: React.Dispatch<React.SetStateAction<number>>
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [maxScroll, setMaxScroll] = useState(0)
  const [containerScrollLeft, setContainerScrollLeft] = useState(0)

  /** Handle container resize */
  const handleResize = useCallback((): void => {
    // Set new max scroll based on current container width
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth
      setMaxScroll(containerRef.current.scrollWidth - containerWidth)
    }
  }, [selectedCategory])

  // When container is resized, set new max scroll
  useEffect(() => {
    // Set initial max scroll
    handleResize()

    // Add event listener for handling container resize
    window.addEventListener("resize", handleResize)

    // When component unmounts, remove event listener
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [handleResize])

  const isLeftHidden: boolean = containerScrollLeft === 0
  const isRightHidden: boolean = containerScrollLeft > maxScroll - 1 // Within 1 pixel of maxScroll

  return (
    <div className="relative flex items-center gap-2.5">
      {!isLeftHidden && (
        <ScrollButton direction="left" containerRef={containerRef} />
      )}

      <div
        ref={containerRef}
        onScroll={(e) => setContainerScrollLeft(e.currentTarget.scrollLeft)}
        className="flex h-full gap-2.5 overflow-x-hidden p-1"
      >
        <CategoryButton
          key={0}
          id={0}
          name={"Alle"}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {sortCategoriesByOrder(categories).map((category) => (
          <CategoryButton
            key={category.id}
            id={category.id}
            name={category.namePlural}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        ))}
      </div>
      {!isRightHidden && (
        <ScrollButton direction="right" containerRef={containerRef} />
      )}
    </div>
  )
}

export default CategorySelection
