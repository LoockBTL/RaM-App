import { FC } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LocationsNavigationParamList } from '../../types/navigation-type'
import LocationsMainScreen from './locations-main'
import LocationDetailScreen from './locations-detail'
import CharactersListScreen from '../episodes/character-list'
import CharactersDetailScreen from '../characters/characters-detail'
import { THEME } from '../../assets/themes'

const LocationsStack =
  createNativeStackNavigator<LocationsNavigationParamList>()

const EpisodesNavigation: FC = () => {
  return (
    <LocationsStack.Navigator
      initialRouteName="LocationsL"
      screenOptions={{
        headerStyle: { backgroundColor: THEME.dark.background },
      }}
    >
      <LocationsStack.Screen
        name="LocationsL"
        component={LocationsMainScreen}
        options={{ title: 'Locations' }}
      />
      <LocationsStack.Screen
        name="LocationsDetailL"
        component={LocationDetailScreen}
      />
      <LocationsStack.Screen
        name="CharacterListE"
        component={CharactersListScreen}
      />
      <LocationsStack.Screen
        name="CharactersDetailC"
        component={CharactersDetailScreen}
      />
    </LocationsStack.Navigator>
  )
}

export default EpisodesNavigation
