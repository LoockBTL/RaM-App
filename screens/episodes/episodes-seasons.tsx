import React, { FC, useState, useEffect } from 'react'
import {
  View,
  Text,
  StatusBar,
  Alert,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native'
import axios from 'axios'
import { EpisodePageInterface } from '../../types/data-types'
import Loading from '../../components/loading'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { EpisodesNavigationParamList } from '../../types/navigation-type'
import MiniEpisodes from '../../components/episodes/mini-episodes'
import globalStyles from '../../styles/global'
import { useThemedStyles } from '../../utils/theme-context'

type EpisodesMainProps = NativeStackScreenProps<
  EpisodesNavigationParamList,
  'EpisodeSeasonE'
>

const EpisodesSeason: FC<EpisodesMainProps> = ({ route, navigation }) => {
  const [episodesList, setEpisodes] = useState<EpisodePageInterface>()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState('')
  const { id, title, episodes } = route.params
  const styles = useThemedStyles(globalStyles)
  const fetchEpisodes = () => {
    setLoading(true)
    axios
      .get<EpisodePageInterface>(
        `https://rickandmortyapi.com/api/episode/?episode=${episodes}`
      )
      .then(({ data }) => setEpisodes(data))
      .catch((err) => {
        console.log(err)
        Alert.alert("Can't load episodes")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    navigation.setOptions({
      title,
    })
    fetchEpisodes()
  }, [search])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.top}>
        <Text style={styles.text}>Search</Text>
        <TextInput
          style={styles.search}
          placeholder="Searech character by name..."
          onSubmitEditing={(e) => {
            setSearch(e.nativeEvent.text)
          }}
        />
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              fetchEpisodes()
            }}
          />
        }
        keyExtractor={(item) => item.id}
        data={episodesList?.results}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EpisodesDetailE', {
                id: item.id,
                title: item.name,
              })
            }
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

export default EpisodesSeason
