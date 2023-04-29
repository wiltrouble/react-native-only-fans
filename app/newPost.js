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
import { DataStore, Storage } from "aws-amplify";
import { Post } from "../src/models";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import * as Crypto from 'expo-crypto';

const newPost = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const { user } = useAuthenticator();

  const router = useRouter();
  

  const onPost = async () => {
    const imageKey = await uploadImage()
    await DataStore.save(
      new Post({ text, likes: 0, userID: '51ab0958-d958-4624-b446-6cd83859d1c7', image: imageKey })
    );
    setText("");
    setImage('');
  };

  async function uploadImage() {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const fileKey = `${Crypto.randomUUID()}.png`
      console.log(fileKey);
      await Storage.put(fileKey, blob, {
        contentType: 'image/jpeg' // contentType is optional
      });
      return fileKey
    } catch (err) {
      console.log('Error uploading file:', err);
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={{ margin: 10 }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => router.back()}
          style={{ marginRight: 10 }}
        />
        <Text style={{ fontWeight: "500", fontSize: 20 }}>New post</Text>
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
