import { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { EpisodesNavigationParamList } from '../../types/navigation-type'
import EpisodesMainScreen from './episodes-main'
import EpisodesSeasonScreen from './episodes-seasons'
import EpisodeDetailScreen from './episodes-detail'
import CharactersListScreen from './character-list'
import CharactersDetailScreen from '../characters/characters-detail'
import { THEME } from '../../assets/themes'

const EpisodesStack = createNativeStackNavigator<EpisodesNavigationParamList>()

const EpisodesNavigation: FC = () => {
  return (
    <EpisodesStack.Navigator
      initialRouteName="EpisodesE"
      screenOptions={{
        headerStyle: { backgroundColor: THEME.dark.background },
      }}
    >
      <EpisodesStack.Screen
        name="EpisodesE"
        component={EpisodesMainScreen}
        options={{ title: 'Episodes' }}
      />
      <EpisodesStack.Screen
        name="EpisodeSeasonE"
        component={EpisodesSeasonScreen}
      />
      <EpisodesStack.Screen
        name="EpisodesDetailE"
        component={EpisodeDetailScreen}
      />
      <EpisodesStack.Screen
        name="CharacterListE"
        component={CharactersListScreen}
      />
      <EpisodesStack.Screen
        name="CharactersDetailC"
        component={CharactersDetailScreen}
      />
    </EpisodesStack.Navigator>
  )
}

export default EpisodesNavigation
