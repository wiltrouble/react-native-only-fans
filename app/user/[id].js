import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

import users from "../../assets/data/users";
import UserProfileHeader from "../../src/components/UserProfileHeader";

const ProfilePage = () => {
  const router = useRouter();
  const { id } = useSearchParams();

  const [isSubscribed, setIsSubscribed] = useState(false);

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
  return (
    <View>
      <UserProfileHeader user={user}/>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({

});
