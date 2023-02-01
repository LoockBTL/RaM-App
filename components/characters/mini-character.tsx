import { View, Image, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react'
import charactersStyles from '../../styles/characters'
import { useThemedStyles } from '../../utils/theme-context'

interface MiniCharactersProps {
  name: string
  image: string
  status: string
}

const MiniCharacter: FC<MiniCharactersProps> = ({ image, name, status }) => {
  const styles = useThemedStyles(charactersStyles)

  const colorStyle = StyleSheet.create({
    color: {
      backgroundColor:
        status === 'Alive'
          ? '#62ff00'
          : status === 'Dead'
          ? '#ff0000'
          : '#696969',
    },
  })
  const statusStyle = StyleSheet.compose(
    styles.miniContainerStatus,
    colorStyle.color
  )
  return (
    <View style={styles.miniContainerBody}>
      <Image style={styles.miniContainerImg} source={{ uri: image }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.miniContainerText}>{name}</Text>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={statusStyle}></View>
          <Text>{status === 'unknown' ? 'Unknown' : status}</Text>
        </View>
      </View>
    </View>
  )
}

export default React.memo(MiniCharacter)
