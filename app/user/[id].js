import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "expo-router";

import users from "../../assets/data/users";
import posts from "../../assets/data/posts";
import UserProfileHeader from "../../src/components/UserProfileHeader";
import Posts from "../../src/components/Posts";
import { FlatList } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

const ProfilePage = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const router = useRouter();
  const { id } = useSearchParams();
  const user = users.find((u) => u.id === id);

  if (!user) {
    return (
      <SafeAreaView
        style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
      >
        <Text onPress={() => router.back()}>User not found!</Text>
      </SafeAreaView>
    );
  }

  if (!isSubscribed) {
    return (
      <View>
        <UserProfileHeader
          user={user}
          isSubscribed={isSubscribed}
          setIsSubscribed={setIsSubscribed}
        />
        <View
          style={{
            backgroundColor: "gainsboro",
            alignItems: "center",
            padding: 20,
          }}
        >
          <FontAwesome name="lock" size={50} color="gray" />
          <Text
            style={{
              backgroundColor: "royalblue",
              padding: 15,
              height: 50,
              borderRadius: 25,
              overflow: "hidden",
              color: 'white',
              fontWeight: '500'
            }}
          >
            Subscribe to see user's posts
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <Posts post={item} />}
        ListHeaderComponent={() => (
          <UserProfileHeader
            user={user}
            isSubscribed={isSubscribed}
            setIsSubscribed={setIsSubscribed}
          />
        )}
      />
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({});
