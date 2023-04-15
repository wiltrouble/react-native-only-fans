import { StyleSheet, Text, View, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import React from "react";
import { AntDesign, Feather } from "@expo/vector-icons";

const Posts = ({ post }) => {
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
        <Image source={{ uri: post.User.avatar }} style={styles.avatar} />
        <View>
          <Text style={{ fontWeight: "500", fontSize: 16, marginBottom: 3 }}>
            {post.User.name}
          </Text>
          <Text>@{post.User.handle}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "auto",
          }}
        >
          <Text style={{ marginRight: 5, color: "gray" }}>3 hours ago</Text>
          <Entypo name="dots-three-horizontal" size={18} color="gray" />
        </View>
      </View>
      <Text style={{ margin: 5, lineHeight: 18 }}>{post.text}</Text>
      <Image
        source={{ uri: post.image }}
        style={{ width: "100%", aspectRatio: 1 }}
      />
      <View style={{ margin: 10, flexDirection: "row" }}>
        <AntDesign
          name="heart"
          size={22}
          color="gray"
          style={{ marginRight: 10 }}
        />
        <Feather
          name="dollar-sign"
          size={20}
          color="gray"
          style={{ marginRight: 10 }}
        />
        <Text>Sent tip</Text>
      </View>
      <Text style={{ fontWeight: 500, marginHorizontal: 10 }}>
        {post.likes} Likes
      </Text>
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 3,
    marginRight: 20,
  },
});
