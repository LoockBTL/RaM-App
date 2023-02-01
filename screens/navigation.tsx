import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FC, useContext } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TabNavigatorParamList } from '../types/navigation-type'
import { NavigationContainer } from '@react-navigation/native'
import CharactersNavigation from './characters/characters'
import LocationsScreen from './locations/locations'
import EpisodesScreen from './episodes/episodes'
import SettingsScreen from './settings'
import { ContextProvider } from '../utils/theme-context'
import { THEME } from '../assets/themes'

const Tab = createBottomTabNavigator<TabNavigatorParamList>()

const Navigation: FC = () => {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Characters"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = ''

              if (route.name === 'Characters') {
                iconName = focused ? 'man' : 'man-outline'
              } else if (route.name === 'Episodes') {
                iconName = focused ? 'library' : 'library-outline'
              } else if (route.name === 'Locations') {
                iconName = focused ? 'earth' : 'earth-outline'
              } else if (route.name === 'Settings') {
                iconName = focused ? 'ios-list' : 'ios-list-outline'
              }

              return <Ionicons name={iconName} size={size} color={color} />
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'white',
            headerShown: false,
            tabBarStyle: { backgroundColor: THEME.dark.background },
          })}
        >
          <Tab.Screen name="Characters" component={CharactersNavigation} />
          <Tab.Screen name="Locations" component={LocationsScreen} />
          <Tab.Screen name="Episodes" component={EpisodesScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ContextProvider>
  )
}

export default Navigation
