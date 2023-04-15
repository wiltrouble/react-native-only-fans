import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";
import { Link } from 'expo-router'

import users from "../assets/data/users";
import UserCard from "../src/components/UserCard";

export default function Page() {
  return (
    <View style={styles.container}>
      <Link href={'/newPost'}>New post</Link>
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
