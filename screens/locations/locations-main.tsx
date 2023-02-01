import React, { FC, useState, useEffect } from 'react'
import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Alert,
  TextInput,
} from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import { LocationsNavigationParamList } from '../../types/navigation-type'
import { LocationPageInterface } from '../../types/data-types'
import axios from 'axios'
import globalStyles from '../../styles/global'
import MiniLocaitions from '../../components/locaitins/mini-locaitions'
import { useThemedStyles } from '../../utils/theme-context'
import Loading from '../../components/loading'

type LocationsMainMainProps = NativeStackScreenProps<
  LocationsNavigationParamList,
  'LocationsL'
>

const LocationsMain: FC<LocationsMainMainProps> = ({ navigation }) => {
  const [locations, setLocations] = useState<LocationPageInterface>()
  const [page, setPage] = useState<number>(1)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [search, setSearch] = useState('')
  const styles = useThemedStyles(globalStyles)
  const fetchLocations = () => {
    setLoading(true)
    axios
      .get(
        `https://rickandmortyapi.com/api/location?page=${page}&name=${search}`
      )
      .then(({ data }) => setLocations(data))
      .catch((err) => {
        console.log(err)
        Alert.alert("Can't load locations")
      })
      .finally(() => {
        setLoading(false)
      })
  }
  useEffect(() => fetchLocations(), [page, search])
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
            disabled={locations?.info.prev == null ? true : false}
          />
          <Text style={styles.text}>Page {page}</Text>
          <Button
            onPress={() => setPage(page + 1)}
            title="Next"
            disabled={locations?.info.next == null ? true : false}
          />
        </View>
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={locations?.results}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('LocationsDetailL', {
                id: item.id,
                title: item.name,
              })
            }
          >
            <MiniLocaitions name={item.name} type={item.type} />
          </TouchableOpacity>
        )}
      />
      <StatusBar />
    </SafeAreaView>
  )
}

export default LocationsMain
