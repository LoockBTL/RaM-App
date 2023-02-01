export type TabNavigatorParamList = {
  Characters: undefined
  Locations: undefined
  Episodes: undefined
  Settings: undefined
}

export type CharactersNavigationParamList = {
  CharactersC: undefined
  CharactersDetailC: { id: string; title: string }
  LocationsDetailL: { id: string; title: string }
  EpisodeListC: { id: string; name: string; episodesId: string }
  EpisodesDetailE: { id: string; title: string }
  CharacterListE: { name: string; charactersId: string }
}

export type EpisodesNavigationParamList = {
  EpisodesE: undefined
  EpisodeSeasonE: { id: string; title: string; episodes: string }
  EpisodesDetailE: { id: string; title: string }
  CharacterListE: { name: string; charactersId: string }
  CharactersDetailC: { id: string; title: string }
}

export type LocationsNavigationParamList = {
  LocationsL: undefined
  LocationsDetailL: { id: string; title: string }
  CharacterListE: { name: string; charactersId: string }
  CharactersDetailC: { id: string; title: string }
}
