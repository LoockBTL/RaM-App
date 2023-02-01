import React, { FC, useState, useEffect } from 'react'
import {
  View,
  Text,
  StatusBar,
  Alert,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native'
import axios from 'axios'
import { CharacterPageInterface } from '../../types/data-types'
import Loading from '../../components/loading'
import MiniCharacter from '../../components/characters/mini-character'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CharactersNavigationParamList } from '../../types/navigation-type'
import charactersStyles from '../../styles/characters'
import globalStyles from '../../styles/global'
import { useThemedStyles } from '../../utils/theme-context'

type CharactersMainProps = NativeStackScreenProps<
  CharactersNavigationParamList,
  'CharactersC'
>

const CharactersMain: FC<CharactersMainProps> = ({ navigation }) => {
  const [characters, setCharacters] = useState<CharacterPageInterface>()
  const [page, setPage] = useState(1)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState('')
  const styles = useThemedStyles(globalStyles)

  const fetchCharacters = () => {
    setLoading(true)
    axios
      .get<CharacterPageInterface>(
        `https://rickandmortyapi.com/api/character?page=${page}&name=${search}`
      )
      .then(({ data }) => setCharacters(data))
      .catch((err) => {
        console.log(err)
        Alert.alert("Can't load characters")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => fetchCharacters(), [page, search])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.top}>
        <Text style={styles.text}>Search</Text>
        <TextInput
          style={styles.search}
          placeholder="Searech character by name..."
          onSubmitEditing={(e) => {
            setPage(1)
            setSearch(e.nativeEvent.text)
          }}
        />
        <View style={styles.buttons}>
          <Button
            onPress={() => setPage(page - 1)}
            title="Prev"
            disabled={characters?.info.prev == null ? true : false}
          />
          <Text style={styles.text}>Page {page}</Text>
          <Button
            onPress={() => setPage(page + 1)}
            title="Next"
            disabled={characters?.info.next == null ? true : false}
          />
        </View>
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              setPage(1)
              fetchCharacters()
            }}
          />
        }
        keyExtractor={(item) => item.id}
        data={characters?.results}
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
              name={item.name}
              image={item.image}
              status={item.status}
            />
          </TouchableOpacity>
        )}
      />

      <StatusBar />
    </SafeAreaView>
  )
}

export default CharactersMain
