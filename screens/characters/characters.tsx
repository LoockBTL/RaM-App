import { FC } from 'react'
import { CharactersNavigationParamList } from '../../types/navigation-type'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CharactersMain from './characters-main'
import CharactersDetail from './characters-detail'
import EpisodeList from './episode-list'
import CharactersList from '../episodes/character-list'
import LocationDetail from '../locations/locations-detail'
import EpisodeDetail from '../episodes/episodes-detail'
import { THEME } from '../../assets/themes'

const CharactersStack =
  createNativeStackNavigator<CharactersNavigationParamList>()

const CharactersNavigation: FC = () => {
  return (
    <CharactersStack.Navigator
      initialRouteName="CharactersC"
      screenOptions={{
        headerStyle: { backgroundColor: THEME.dark.background },
      }}
    >
      <CharactersStack.Screen
        name="CharactersC"
        component={CharactersMain}
        options={{ title: 'Characters' }}
      />
      <CharactersStack.Screen
        name="CharactersDetailC"
        component={CharactersDetail}
      />
      <CharactersStack.Screen name="EpisodeListC" component={EpisodeList} />
      <CharactersStack.Screen
        name="EpisodesDetailE"
        component={EpisodeDetail}
      />
      <CharactersStack.Screen
        name="CharacterListE"
        component={CharactersList}
      />
      <CharactersStack.Screen
        name="LocationsDetailL"
        component={LocationDetail}
      />
    </CharactersStack.Navigator>
  )
}

export default CharactersNavigation
