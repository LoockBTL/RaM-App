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
import { EpisodeInterface } from '../../types/data-types'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { EpisodesNavigationParamList } from '../../types/navigation-type'
import Loading from '../../components/loading'
import { takeId } from '../../utils/takeId'
import { useFocusEffect } from '@react-navigation/native'
import episodesStyles from '../../styles/episodes'
import { useThemedStyles } from '../../utils/theme-context'

type EpisodeDetailProps = NativeStackScreenProps<
  EpisodesNavigationParamList,
  'EpisodesDetailE'
>

const EpisodeDetail: FC<EpisodeDetailProps> = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true)
  const [episode, setEpisode] = useState<EpisodeInterface>()
  const { id, title } = route.params
  const episodeStyle = useThemedStyles(episodesStyles)

  const fetchEpisode = () => {
    axios
      .get<EpisodeInterface>('https://rickandmortyapi.com/api/episode/' + id)
      .then(({ data }) => {
        setEpisode(data)
      })
      .catch((err) => {
        console.log(err)
        Alert.alert("Error, can't load a character")
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
    <View style={episodeStyle.containerDetail}>
      <Text style={episodeStyle.titleDetail}>{episode?.episode}</Text>
      <View style={episodeStyle.sectionDetail}>
        <Text style={episodeStyle.textDetail}>Name: {episode?.name}</Text>
        <Text style={episodeStyle.textDetail}>Date: {episode?.air_date}</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CharacterListE', {
            name: episode?.name ? episode?.name : 'Unknown',
            charactersId: episode?.episode
              ? takeId(episode?.characters, 42)
              : 'Nothing',
          })
        }
      >
        <View style={episodeStyle.linkDetail}>
          <Text style={episodeStyle.textDetail}>
            List of characters in episode: {episode?.characters.length}
          </Text>
        </View>
      </TouchableOpacity>

      <StatusBar />
    </View>
  )
}

export default EpisodeDetail
