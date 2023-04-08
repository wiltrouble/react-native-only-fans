import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import { Link } from "expo-router";

import React from "react";

const UserCard = ({ user }) => {
  return (
    <Link href={`/user/${user.id}`} asChild>
      <Pressable>
        <ImageBackground
          source={{ uri: user.coverImage }}
          style={styles.userCard}
        >
          <View style={styles.overlay} />
          {/* image */}
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          {/* name & handle */}
          <View style={{ justifyContent: "flex-end" }}>
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "500",
                marginBottom: 5,
              }}
            >
              {user.name}
            </Text>
            <Text style={{ color: "white" }}>@{user.handle}</Text>
          </View>
        </ImageBackground>
      </Pressable>
    </Link>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  userCard: {
    backgroundColor: "gray",
    padding: 10,
    flexDirection: "row",

    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 3,
    marginRight: 20,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0, 0.5)",
    position: "absolute",
    ...StyleSheet.absoluteFillObject,
  },
});
