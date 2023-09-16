export type Game = {
  id: number
  name: string
  aliases: string[]
  icon: string
  minPlayers: number
  maxPlayers: number
  minDurationMin: number
  maxDurationMin: number
  lowestCard: string
  highestCard: string
  jokers: boolean
  goal: string
  setup: string
  howToPlay: string
  categories: number[]
  svg: string
}

export type Category = {
  id: number
  nameSingular: string
  namePlural: string
  icon: string
  order: number
}
