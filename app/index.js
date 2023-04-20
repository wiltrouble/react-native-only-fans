import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";
import { Link } from 'expo-router'
import { useAuthenticator } from '@aws-amplify/ui-react-native'
import { DataStore } from 'aws-amplify'
import { User } from '../src/models/index'
import { useState, useEffect} from 'react'

import UserCard from "../src/components/UserCard";

export default function Page() {

  const [users, setUsers] = useState([])

  const { signOut } = useAuthenticator()

  useEffect(() => {
    // fetch users
    DataStore.query(User).then(setUsers);
  }, [])
  
  return (
    <View style={styles.container}>
      <Link href={'/newPost'}>New post</Link>
      <Text onPress={() => signOut()}>Sign out</Text>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserCard user={item} key={item.id} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 76,
  },
});
