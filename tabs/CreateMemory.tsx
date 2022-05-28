import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Keyboard } from "react-native";
import Toggle from "react-native-toggle-element";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback } from "react";
import { AddTags } from "../components/AddTags";
import { AddCategories } from "../components/AddCategories";
import { AddEmotions } from "../components/AddEmotions";
import { ChooseDate } from "../components/ChooseDate";
import { addEvent } from "../api/addEvent";
import { JWTContext } from "../App";

export default function CreateMemory({
  visible,
  hide,
}: {
  visible: boolean;
  hide: () => void;
}) {
  const { JWT } = useContext(JWTContext);

  useEffect(() => {
    if (!visible) {
      Keyboard.dismiss();
    }
  }, [visible]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [positive, setPositive] = useState<boolean>(true);
  const [date, setDate] = useState(new Date());
  const [emotions, setEmotions] = useState<string[]>([]);
  const [categories, setCategories] = useState<number[]>([]);
  const [tags, setTags] = useState<number[]>([]);

  const createEvent = () => {
    addEvent(
      JWT,
      title,
      description,
      positive,
      date,
      emotions,
      categories,
      tags
    )
      .then(() => {
        setTitle("");
        setDescription("");
        setPositive(true);
        setDate(new Date());
        setEmotions([]);
        setCategories([]);
        setTags([]);
        hide();
      })
      .catch(alert);
  };

  return (
    <ScrollView style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 25 }}>
      <Text
        style={{
          color: "#FE7153",
          fontSize: 20,
          textAlign: "center",
          fontFamily: "BreeSerif_400Regular",
        }}
      >
        Create new memory
      </Text>
      <TextInput
        style={{
          backgroundColor: "#fff",
          borderColor: "rgba(224, 224, 224, 0.8)",
          borderWidth: 1,
          height: 50,
          borderRadius: 20,
          paddingLeft: 15,
          paddingRight: 15,
          marginTop: 30,
          marginLeft: 0,
          marginRight: 0,
        }}
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={{
          backgroundColor: "#fff",
          borderColor: "rgba(224, 224, 224, 0.8)",
          borderWidth: 1,
          height: 100,
          borderRadius: 20,
          paddingLeft: 15,
          paddingRight: 15,
          paddingVertical: 10,
          marginTop: 10,
        }}
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        multiline={true}
      />
      <View
        style={{
          backgroundColor: "#fff",
          borderColor: "rgba(224, 224, 224, 0.8)",
          borderWidth: 1,
          height: 50,
          borderRadius: 20,
          padding: 10,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            paddingLeft: 6,
            fontSize: 16,
            fontWeight: "400",
          }}
        >
          Is this emotion positive?
        </Text>
        <Toggle
          value={positive}
          onPress={(newState: boolean) => setPositive(newState)}
          thumbActiveComponent={
            <MaterialCommunityIcons
              name="emoticon-happy-outline"
              size={24}
              // color="#919191"
              color="#7bd169"
            />
          }
          thumbInActiveComponent={
            <MaterialCommunityIcons
              name="emoticon-sad-outline"
              size={24}
              // color="#919191"
              color="#ff785b"
            />
          }
          thumbStyle={{
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
          thumbButton={{
            width: 38,
            height: 38,
            radius: 38,
            activeBackgroundColor: "#fff",
            inActiveBackgroundColor: "#fff",
          }}
          trackBar={{
            // activeBackgroundColor: "#ff785b",
            // borderActiveColor: "#d05d43",
            activeBackgroundColor: "#0e2",
            borderActiveColor: "#e8e8e8",
            inActiveBackgroundColor: "#f55",
            borderInActiveColor: "#e8e8e8",
            borderWidth: 1,
            width: 60,
            height: 40,
          }}
        />
      </View>
      <ChooseDate onChange={setDate} />
      <AddEmotions onChange={setEmotions} />
      <AddCategories onChange={setCategories} />
      <AddTags onChange={setTags} />
      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={createEvent}
        activeOpacity={0.75}
      >
        <View
          style={{
            width: "100%",
            height: 60,
            backgroundColor: "#ff785b",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "600",
              fontFamily: "BreeSerif_400Regular",
            }}
          >
            Add memory
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
