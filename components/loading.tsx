import { FC } from 'react'
import { View, Text, StatusBar, ActivityIndicator } from 'react-native'
import globalStyles from '../styles/global'
import { useThemedStyles } from '../utils/theme-context'

const Loading: FC = () => {
  const styles = useThemedStyles(globalStyles)

  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#216bdb" />
      <StatusBar />
    </View>
  )
}

export default Loading
