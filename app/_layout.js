import { Stack } from "expo-router";
import { Amplify, DataStore, Hub, API } from "aws-amplify";
import awsconfig from "../src/aws-exports";
import { Authenticator } from "@aws-amplify/ui-react-native";
import { useEffect } from "react";
import { User } from "../src/models";
import { AppRegistry } from "react-native-web";

Amplify.configure(awsconfig);

const CreateUserMutation = `
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      handle
      bio
      subscriptionPrice
    }
  }
`;

export default function RootLayout() {
  useEffect(() => {
    const removeListener = Hub.listen("auth", async (data) => {
      console.log(data);
      if (data.payload.event === "signIn") {
        const userInfo = data.payload.data.attributes;
        // DataStore.save(new User({id: userInfo.sub, name: userInfo.name}))

        // Save user to database
        const newUser = {
          id: userInfo.sub,
          name: userInfo.name,
          handle: userInfo.nickname,
          subscriptionPrice: 0,
        };
        await API.graphql({
          query: CreateUserMutation,
          variables: { input: newUser },
        });
        console.log('User saved in database');
      }
    });

    return () => {
      removeListener();
    };
  }, []);

  return (
    <Authenticator.Provider>
      <Authenticator>
        <Stack screenOptions={{ headerShown: false }} />
      </Authenticator>
    </Authenticator.Provider>
  );
}
