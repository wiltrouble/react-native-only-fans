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

const UserProfileHeader = ({ user }) => {
  const router = useRouter();

  const [isSubscribed, setIsSubscribed] = useState(false);

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
      <ImageBackground source={{ uri: user.coverImage }} style={styles.cover}>
        <View style={styles.overlay} />
        <SafeAreaView style={{ marginHorizontal: 10, flexDirection: "row" }}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="white"
            onPress={() => router.back()}
            style={{ marginRight: 10 }}
          />
          <View>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: 500,
                marginBottom: 5,
              }}
            >
              {user.name}
            </Text>
            <Text style={{ color: "white" }}>
              1.4K Posts · 64.5K Likes · 3.5M Views
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <View style={{ padding: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: -50,
          }}
        >
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={{ flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="message-text-outline"
              size={24}
              color="royalblue"
            />
            <FontAwesome name="star-o" size={24} color="royalblue" />
            <FontAwesome name="share-square-o" size={24} color="royalblue" />
          </View>
          {/* <MaterialCommunityIcons name="progress-check" size={24} color="royalblue" /> */}
        </View>
        <Text style={{ fontSize: 20, fontWeight: 500, marginVertical: 5 }}>
          {user.name}
        </Text>
        <Text style={{ color: "gray", marginBottom: 10 }}>{user.handle}</Text>
        <Text style={{ lineHeight: 20 }} numberOfLines={2}>
          {user.bio}
        </Text>
        <Text style={{ color: "gray", fontWeight: "bold", marginVertical: 10 }}>
          SUBSCRIPTION
        </Text>

        <Pressable
          style={[
            styles.button,
            { backgroundColor: isSubscribed ? "white" : "royalblue" },
          ]}
          onPress={() => setIsSubscribed(!isSubscribed)}
        >
          <Text
            style={[
              styles.buttonText,
              { color: isSubscribed ? "royalblue" : "white" },
            ]}
          >
            {isSubscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
          </Text>
          <Text
            style={[
              styles.buttonText,
              { color: isSubscribed ? "royalblue" : "white" },
            ]}
          >
            {user.subscriptionPrice === 0
              ? "FOR FREE"
              : `$${user.subscriptionPrice} / month`}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UserProfileHeader;

const styles = StyleSheet.create({
  cover: {
    height: 200,
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 3,
    marginRight: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 50,
    padding: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: "royalblue",
    fontWeight: "600",
  },
});
