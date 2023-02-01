import { View, Text } from 'react-native'
import React, { FC } from 'react'
import locationsStyles from '../../styles/locations'
import { useThemedStyles } from '../../utils/theme-context'

interface MiniLocaitionProps {
  name: string
  type: string
}

const MiniLocaition: FC<MiniLocaitionProps> = ({ name, type }) => {
  const styles = useThemedStyles(locationsStyles)

  return (
    <View style={styles.miniContainerBody}>
      <Text style={styles.miniContainerTitle}>{name}</Text>
      <Text style={styles.miniContainerText}>{type}</Text>
    </View>
  )
}

export default React.memo(MiniLocaition)
