import { StyleSheet } from 'react-native'
import { Theme } from '../utils/theme-context'
import { THEME } from '../assets/themes'
const locationsStyles = (themeSelected: Theme) => {
  const theme = themeSelected === 'Light' ? THEME.light : THEME.dark
  return StyleSheet.create({
    miniContainerBody: {
      flex: 1,
      flexDirection: 'column',
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderWidth: 1,
      backgroundColor: theme.background,
      borderColor: theme.tertiary,
    },
    miniContainerText: {
      color: theme.secondary,
      fontSize: 17,
      fontWeight: 'normal',
    },
    miniContainerTitle: {
      color: theme.secondary,
      fontSize: 20,
      fontWeight: '700',
    },
    sectionDetail: {
      marginHorizontal: 5,
      borderTopWidth: 1,
      borderBottomWidth: 1,

      paddingLeft: 10,
      width: '100%',
      margin: 5,
    },
    textDetail: {
      color: theme.secondary,
      fontSize: 24,
    },
    linkDetail: {
      flex: 0,
      textAlign: 'center',
      padding: 5,
      borderWidth: 1,
      backgroundColor: theme.primary,
      borderRadius: 20,
      margin: 10,
    },
    containerDetail: {
      backgroundColor: theme.background,
      height: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
}

export default locationsStyles
