export interface CharacterPageInterface {
  info: {
    count: string
    pages: string
    next: string
    prev: string
  }
  results: CharacterInterface[]
}

export interface CharacterInterface {
  id: string
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: CharacterLocation
  location: CharacterLocation
  image: string
  episode: string[]
  url: string
  created: string
}

export interface CharacterMiniInterface {
  id: string
  name: string
  image: string
  status: string
}

type CharacterLocation = {
  name: string
  url: string
}

export interface LocationPageInterface {
  info: {
    count: string
    pages: string
    next: string
    prev: string
  }
  results: LocationInterface[]
}

export interface LocationInterface {
  id: string
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: string
}

export interface EpisodePageInterface {
  info: {
    count: string
    pages: string
    next: string
    prev: string
  }
  results: EpisodeInterface[]
}

export interface EpisodeInterface {
  id: string
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: string
}

export interface EpisodeListInterface {
  id: string
  name: string
  air_date: string
  episode: string
}
