import { FC, useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  StatusBar,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import axios from 'axios'
import { CharacterInterface } from '../../types/data-types'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CharactersNavigationParamList } from '../../types/navigation-type'
import Loading from '../../components/loading'
import charactersStyles from '../../styles/characters'
import { takeId } from '../../utils/takeId'
import { useFocusEffect } from '@react-navigation/native'
import { useThemedStyles } from '../../utils/theme-context'

type CharactersDetailProps = NativeStackScreenProps<
  CharactersNavigationParamList,
  'CharactersDetailC'
>

const CharactersDetail: FC<CharactersDetailProps> = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(true)
  const [character, setCharacter] = useState<CharacterInterface>()
  const { id, title } = route.params
  const styles = useThemedStyles(charactersStyles)

  const fetchCharacter = () => {
    axios
      .get<CharacterInterface>(
        'https://rickandmortyapi.com/api/character/' + id
      )
      .then(({ data }) => {
        setCharacter(data)
      })
      .catch((err) => {
        console.log(err)
        Alert.alert("Error, can't load a character")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    navigation.setOptions({
      title,
    })
    fetchCharacter()
  }, [])
  useFocusEffect(() => {
    fetchCharacter()
  })
  const colorStyle = StyleSheet.create({
    color: {
      backgroundColor:
        character?.status === 'Alive'
          ? '#62ff00'
          : character?.status === 'Dead'
          ? '#ff0000'
          : '#696969',
    },
  })
  const statusStyle = StyleSheet.compose(
    styles.miniContainerStatus,
    colorStyle.color
  )

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>
    )
  }

  return (
    <>
      <View style={styles.containerDetail}>
        <Image style={styles.imageDetail} source={{ uri: character?.image }} />
        <View style={styles.sectionDetail}>
          <Text style={styles.textDetail}>Name: {character?.name}</Text>
          <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.textDetail}>Status: </Text>
            <Text style={styles.textDetail}>
              {character?.status === 'unknown' ? 'Unknown' : character?.status}
            </Text>
            <View style={statusStyle}></View>
          </View>
        </View>
        <View style={styles.sectionDetail}>
          <Text style={styles.textDetail}>
            Species:{' '}
            {character?.species === 'unknown' ? 'Unknown' : character?.species}
          </Text>
          {character?.type.length !== undefined &&
          character.type.length >= 1 ? (
            <Text style={styles.textDetail}>Type: {character?.type}</Text>
          ) : (
            <></>
          )}
          <Text style={styles.textDetail}>Gender: {character?.gender}</Text>
        </View>
        <View style={styles.sectionDetail}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('LocationsDetailL', {
                id: character?.origin.url
                  ? takeId(character?.origin.url, 41)
                  : '1',
                title: character?.origin.name
                  ? character?.origin.name
                  : 'Unknown',
              })
            }
          >
            <Text style={styles.textDetail}>
              Last known location:{' '}
              {character?.origin.name === 'unknown'
                ? 'Unknown'
                : character?.origin.name}
            </Text>
          </TouchableOpacity>
          <Text style={styles.textDetail}>
            Was in {character?.episode.length}{' '}
            {character?.episode.length === 1 ? 'episode' : 'episodes'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EpisodeListC', {
              id,
              name: character?.name ? character?.name : 'Unknown',
              episodesId: character?.episode
                ? takeId(character?.episode, 40)
                : 'Nothing',
            })
          }
        >
          <View style={styles.linkDetail}>
            <Text style={styles.textDetail}>List of episodes</Text>
          </View>
        </TouchableOpacity>
      </View>
      <StatusBar />
    </>
  )
}

export default CharactersDetail
