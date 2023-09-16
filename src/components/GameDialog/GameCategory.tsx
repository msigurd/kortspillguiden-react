interface GameCategoryProps {
  categoryName: string
  categoryIcon: string
}

const GameCategory: React.FC<GameCategoryProps> = ({
  categoryName,
  categoryIcon,
}) => (
  <div className="rounded bg-neutral-200 px-2 text-center dark:bg-neutral-700">
    {categoryName} {categoryIcon}
  </div>
)

export default GameCategory
