import { FC, useState, useEffect } from 'react'
import {
  View,
  Text,
  StatusBar,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native'
import globalStyles from '../../styles/global'
import axios from 'axios'
import {
  CharacterInterface,
  CharacterMiniInterface,
} from '../../types/data-types'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { EpisodesNavigationParamList } from '../../types/navigation-type'
import Loading from '../../components/loading'
import MiniCharacter from '../../components/characters/mini-character'
import SafeAreaView from 'react-native-safe-area-view'
import { useFocusEffect } from '@react-navigation/native'
import { useThemedStyles } from '../../utils/theme-context'

type CharactersListProps = NativeStackScreenProps<
  EpisodesNavigationParamList,
  'CharacterListE'
>

const CharactersList: FC<CharactersListProps> = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true)
  const [episodes, setEpisodes] = useState<CharacterMiniInterface[]>([])
  const { name, charactersId } = route.params
  const styles = useThemedStyles(globalStyles)

  const fetchEpisodes = () => {
    axios
      .get<CharacterInterface[] | CharacterInterface>(
        'https://rickandmortyapi.com/api/character/' + charactersId
      )
      .then(({ data }) => {
        if (Array.isArray(data)) {
          setEpisodes(
            data.map((obj) => ({
              id: obj.id,
              name: obj.name,
              image: obj.image,
              status: obj.status,
            }))
          )
        } else {
          setEpisodes([
            {
              id: data.id,
              name: data.name,
              image: data.image,
              status: data.status,
            },
          ])
        }
      })
      .catch((err) => {
        console.log(err)
        Alert.alert("Error, can't load a characters")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    navigation.setOptions({
      title: `Episodes with: ${name}`,
    })
    fetchEpisodes()
  }, [])
  useFocusEffect(() => {
    fetchEpisodes()
  })
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>
    )
  }

  return (
    <SafeAreaView>
      <View style={styles.background}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={episodes}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CharactersDetailC', {
                  id: item.id,
                  title: item.name,
                })
              }
            >
              <MiniCharacter
                image={item.image}
                name={item.name}
                status={item.status}
              />
            </TouchableOpacity>
          )}
        />
        <StatusBar />
      </View>
    </SafeAreaView>
  )
}

export default CharactersList
