import { FC, useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  StatusBar,
  Alert,
  TouchableOpacity,
} from 'react-native'
import globalStyles from '../../styles/global'
import axios from 'axios'
import { EpisodeInterface, LocationInterface } from '../../types/data-types'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { LocationsNavigationParamList } from '../../types/navigation-type'
import Loading from '../../components/loading'
import { takeId } from '../../utils/takeId'
import { useFocusEffect } from '@react-navigation/native'
import locationsStyles from '../../styles/locations'
import { useThemedStyles } from '../../utils/theme-context'

type LocationsMainMainProps = NativeStackScreenProps<
  LocationsNavigationParamList,
  'LocationsDetailL'
>

const LocationDetail: FC<LocationsMainMainProps> = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true)
  const [location, setLocation] = useState<LocationInterface>()
  const { id, title } = route.params
  const styles = useThemedStyles(locationsStyles)
  const fetchEpisode = () => {
    axios
      .get<LocationInterface>('https://rickandmortyapi.com/api/location/' + id)
      .then(({ data }) => {
        setLocation(data)
      })
      .catch((err) => {
        console.log(err)
        Alert.alert("Error, can't load a location")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    navigation.setOptions({
      title,
    })
    fetchEpisode()
  }, [])

  useFocusEffect(() => {
    fetchEpisode()
  })
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>
    )
  }

  return (
    <View style={styles.containerDetail}>
      <View style={styles.sectionDetail}>
        <Text style={styles.textDetail}>Name: {location?.name}</Text>
        <Text style={styles.textDetail}>Type: {location?.type}</Text>
        <Text style={styles.textDetail}>Dimension: {location?.dimension}</Text>
      </View>
      <View style={styles.linkDetail}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CharacterListE', {
              name: location?.name ? location?.name : 'Unknown',
              charactersId: location?.residents
                ? takeId(location?.residents, 42)
                : 'Nothing',
            })
          }
        >
          <Text style={styles.textDetail}>
            List of characters in location: {location?.residents.length}
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar />
    </View>
  )
}

export default LocationDetail
