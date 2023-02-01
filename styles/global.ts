import { StyleSheet } from 'react-native'
import { Theme } from '../utils/theme-context'
import { THEME } from '../assets/themes'
const globalStyles = (themeSelected: Theme) => {
  const theme = themeSelected === 'Light' ? THEME.light : THEME.dark
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
      height: '100%',
      width: '100%',
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    search: {
      backgroundColor: theme.primary,
      borderWidth: 2,
      marginHorizontal: 10,
      marginVertical: 5,
      borderRadius: 20,
      padding: 5,
    },
    top: {
      backgroundColor: theme.background,
    },
    text: {
      fontSize: 18,
      fontWeight: 'normal',
      color: theme.secondary,
    },
    background: {
      backgroundColor: theme.background,
      height: '100%',
      width: '100%',
    },
  })
}

export default globalStyles
