import { View, Text } from 'react-native'
import React, { FC } from 'react'
import episodesStyles from '../../styles/episodes'
import { useThemedStyles } from '../../utils/theme-context'

interface MiniEpisodeProps {
  episode: string
  name: string
  air_date: string
}

const MiniEpisode: FC<MiniEpisodeProps> = ({ episode, name, air_date }) => {
  const styles = useThemedStyles(episodesStyles)

  return (
    <View style={styles.miniContainerBody}>
      <Text style={styles.miniContainerTitle}>{episode}</Text>
      <Text style={styles.miniContainerText}>{name}</Text>
      <Text style={styles.miniContainerText}>{air_date}</Text>
    </View>
  )
}

export default React.memo(MiniEpisode)
