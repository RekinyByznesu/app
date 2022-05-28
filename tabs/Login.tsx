import { useContext, useEffect, useRef, useState } from "react";
import { Animated, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { JWTContext } from "../App";

export const Login = ({ navigation }: any) => {
  const { setJWT } = useContext(JWTContext);
  let [login, setLogin] = useState<string | null>(null);
  let [password, setPassword] = useState<string | null>(null);
  let [isKeyboardOpen, setIsKeyboardOpen] = useState<boolean>(false);
  const loginOffsetAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(loginOffsetAnim, {
      toValue: isKeyboardOpen ? -80 : 0,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [isKeyboardOpen]);

  const sendLogin = async () => {
    const rawReq = await fetch(
      "http://91.206.245.239:5000/api/v1/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: login,
          password: password,
        }),
      }
    );
    if (rawReq.status === 200) {
      const res = await rawReq.json();
      setJWT(res.token);
      AsyncStorage.setItem("jwt", res.token);
    } else {
      console.log("error");
    }
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        transform: [
          {
            translateY: loginOffsetAnim,
          },
        ],
      }}
    >
      <Text
        style={{
          color: "#515151",
          fontSize: 24,
          fontFamily: "BreeSerif_400Regular",
          marginBottom: 10,
        }}
      >
        Please log in
      </Text>
      <TextInput
        style={{
          borderColor: "rgba(224, 224, 224, 0.8)",
          borderWidth: 1,
          width: 250,
          height: 50,
          borderRadius: 20,
          padding: 10,
          marginBottom: 10,
        }}
        placeholder="Username"
        placeholderTextColor="#515151"
        autoCorrect={false}
        onChangeText={(text) => {
          setLogin(text);
        }}
        onFocus={() => {
          setIsKeyboardOpen(true);
        }}
        onBlur={() => {
          setIsKeyboardOpen(false);
        }}
      />
      <TextInput
        style={{
          borderColor: "rgba(224, 224, 224, 0.8)",
          borderWidth: 1,
          width: 250,
          height: 50,
          borderRadius: 20,
          padding: 10,
        }}
        placeholder="Password"
        placeholderTextColor="#515151"
        secureTextEntry={true}
        autoCorrect={false}
        onChangeText={(text) => {
          setPassword(text);
        }}
        onFocus={() => {
          setIsKeyboardOpen(true);
        }}
        onBlur={() => {
          setIsKeyboardOpen(false);
        }}
      />
      <TouchableOpacity
        style={{
          width: 250,
          height: 50,
          borderRadius: 20,
          backgroundColor: "#ff785b",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
        onPress={sendLogin}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "600",
            fontFamily: "BreeSerif_400Regular",
          }}
        >
          Log in
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={{ color: "#ff785b" }}>Create account</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
