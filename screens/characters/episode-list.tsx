import { FC, useState, useEffect } from 'react'
import {
  View,
  Text,
  StatusBar,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native'
import globalStyles from '../../styles/global'
import axios from 'axios'
import {
  CharacterInterface,
  EpisodeInterface,
  EpisodeListInterface,
} from '../../types/data-types'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CharactersNavigationParamList } from '../../types/navigation-type'
import Loading from '../../components/loading'
import charactersStyles from '../../styles/characters'
import MiniEpisodes from '../../components/episodes/mini-episodes'
import SafeAreaView from 'react-native-safe-area-view'
import { useFocusEffect } from '@react-navigation/native'
import { useThemedStyles } from '../../utils/theme-context'

type CharactersDetailProps = NativeStackScreenProps<
  CharactersNavigationParamList,
  'EpisodeListC'
>

const EpisodeList: FC<CharactersDetailProps> = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true)
  const [episodes, setEpisodes] = useState<EpisodeListInterface[]>([])
  const { id, name, episodesId } = route.params
  const styles = useThemedStyles(globalStyles)

  const fetchEpisodes = () => {
    axios
      .get<EpisodeInterface[] | EpisodeInterface>(
        'https://rickandmortyapi.com/api/episode/' + episodesId
      )
      .then(({ data }) => {
        if (Array.isArray(data)) {
          setEpisodes(
            data.map((obj) => ({
              id: obj.id,
              name: obj.name,
              episode: obj.episode,
              air_date: obj.air_date,
            }))
          )
        } else {
          setEpisodes([
            {
              id: data.id,
              name: data.name,
              episode: data.episode,
              air_date: data.air_date,
            },
          ])
        }
      })
      .catch((err) => {
        console.log(err)
        Alert.alert("Error, can't load a episodes")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    navigation.setOptions({
      title: `Episodes with: ${name}`,
    })
    fetchEpisodes()
  }, [])
  useFocusEffect(() => {
    fetchEpisodes()
  })
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.background}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={episodes}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EpisodesDetailE', {
                id: item.id,
                title: item.name,
              })
            }}
          >
            <MiniEpisodes
              name={item.name}
              episode={item.episode}
              air_date={item.air_date}
            />
          </TouchableOpacity>
        )}
      />
      <StatusBar />
    </SafeAreaView>
  )
}

export default EpisodeList
