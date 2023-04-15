import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  Image,
} from "react-native";
import React, { useState } from "react";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

const newPost = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const router = useRouter();

  const onPost = () => {
    console.warn("Post");
    setText("");
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ margin: 10 }}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20,}}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => router.back()}
          style={{ marginRight: 10 }}
        />
        <Text style={{fontWeight: '500', fontSize: 20}}>New post</Text>
      </View>
      <TextInput
        placeholder="Compose new post..."
        value={text}
        onChangeText={setText}
        numberOfLines={3}
        multiline
      />
      <View style={{ marginVertical: 10 }}>
        <EvilIcons name="image" size={24} color="gray" onPress={pickImage} />
      </View>
      {image && <Image src={image} style={{ width: "100%", aspectRatio: 1 }} />}

      <Button title="Post" onPress={onPost} />
    </SafeAreaView>
  );
};

export default newPost;

const styles = StyleSheet.create({});
