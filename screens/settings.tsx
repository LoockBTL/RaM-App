import { FC, useState, useContext } from 'react'
import { View, Text, StatusBar, Switch } from 'react-native'
import globalStyles from '../styles/global'
import { ThemeContext, useThemedStyles } from '../utils/theme-context'

const Settings: FC = () => {
  const styles = useThemedStyles(globalStyles)
  const { theme, changeTheme } = useContext(ThemeContext)
  const deffaultStatus = theme === 'Dark' ? true : false
  const [isEnabled, setIsEnabled] = useState(deffaultStatus)
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled)
    if (isEnabled) {
      changeTheme('Dark')
    } else if (!isEnabled) {
      changeTheme('Light')
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text style={styles.text}>Dark mode</Text>
      <StatusBar />
    </View>
  )
}

export default Settings
