import { StyleSheet } from 'react-native'
import { THEME } from '../assets/themes'
import { Theme } from '../utils/theme-context'

const episodesStyles = (themeSelected: Theme) => {
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
    season: {
      color: theme.secondary,
      fontSize: 24,
      fontWeight: '700',
      textAlign: 'center',
    },
    seasonContainer: {
      marginVertical: 5,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      padding: 20,
      width: '100%',
      margin: 5,
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
    titleDetail: {
      color: theme.secondary,
      fontSize: 24,
      fontWeight: 'bold',
    },
  })
}
export default episodesStyles
