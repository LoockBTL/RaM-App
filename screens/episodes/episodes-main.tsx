import React, { FC } from 'react'
import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { EpisodesNavigationParamList } from '../../types/navigation-type'
import episodesStyles from '../../styles/episodes'
import globalStyles from '../../styles/global'
import { useThemedStyles } from '../../utils/theme-context'

type EpisodesMainProps = NativeStackScreenProps<
  EpisodesNavigationParamList,
  'EpisodesE'
>

const EpisodesMain: FC<EpisodesMainProps> = ({ navigation }) => {
  const globalStyle = useThemedStyles(globalStyles)
  const episodeStyle = useThemedStyles(episodesStyles)
  const seasons = [
    {
      id: '1',
      title: 'Season 1',
      episodes: 'S01',
    },
    {
      id: '2',
      title: 'Season 2',
      episodes: 'S02',
    },
    {
      id: '3',
      title: 'Season 3',
      episodes: 'S03',
    },
    {
      id: '4',
      title: 'Season 4',
      episodes: 'S04',
    },
    {
      id: '5',
      title: 'Season 5',
      episodes: 'S05',
    },
  ]

  return (
    <SafeAreaView style={globalStyle.background}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={seasons}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EpisodeSeasonE', {
                id: item.id,
                title: item.title,
                episodes: item.episodes,
              })
            }
          >
            <View style={episodeStyle.seasonContainer}>
              <Text style={episodeStyle.season}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <StatusBar />
    </SafeAreaView>
  )
}

export default EpisodesMain
