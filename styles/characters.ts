import { StyleSheet } from 'react-native'
import { THEME } from '../assets/themes'
import { Theme } from '../utils/theme-context'

const charactersStyles = (themeSelected: Theme) => {
  const theme = themeSelected === 'Light' ? THEME.light : THEME.dark
  return StyleSheet.create({
    miniContainerBody: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderWidth: 1,
      backgroundColor: theme.background,
      borderColor: theme.tertiary,
    },
    miniContainerImg: {
      width: 50,
      height: 50,
      marginRight: 16,
      borderRadius: 20,
    },
    miniContainerText: {
      color: theme.secondary,
      fontSize: 17,
      fontWeight: '700',
    },
    miniContainerStatus: {
      borderRadius: 100,
      width: 10,
      height: 10,
      backgroundColor: '#696969',
      margin: 5,
    },
    imageDetail: {
      width: 300,
      height: 300,
      borderRadius: 40,
      margin: 10,
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
      fontSize: 20,
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
    },
  })
}
export default charactersStyles
