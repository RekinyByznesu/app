import { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export function AddEmotions({
  onChange,
}: {
  onChange: (emotions: string[]) => void;
}) {
  const [emotions, setEmotions] = useState<string[]>([]);
  const [emotion, setEmotion] = useState("HAPPY");

  useEffect(() => onChange(emotions), [emotions]);

  const onValueChange = (value: string) => {
    setEmotion(value);
  };

  const add = () => {
    if (!emotions.includes(emotion)) {
      setEmotions([...emotions, emotion]);
    }
  };

  const deleteEmotion = (name: string) => {
    setEmotions(emotions.filter((e) => e !== name));
  };

  const pickerStyle = {
    borderWidth: 1,
    borderColor: "#efefef",
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginTop: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    color: "#444444",
    paddingRight: 30, // to ensure the text is never behind the icon
  };

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#efefef",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 20,
        marginVertical: 10,
      }}
    >
      {emotions.map((emotion) => (
        <TouchableOpacity
          style={{
            paddingHorizontal: 10,
            paddingVertical: 14,
            marginVertical: 5,
            backgroundColor: "#ffffff",
            borderRadius: 20,
          }}
          key={emotion}
          onPress={() => deleteEmotion(emotion)}
        >
          <Text
            style={{
              textTransform: "capitalize",
              fontFamily: "BreeSerif_400Regular",
              paddingLeft: 10,
            }}
          >
            {emotion}
          </Text>
        </TouchableOpacity>
      ))}
      <RNPickerSelect
        onValueChange={onValueChange}
        items={[
          { label: "Happy", value: "HAPPY" },
          { label: "Sad", value: "SAD" },
          { label: "Angry", value: "ANGRY" },
          { label: "Guilt", value: "GUILT" },
          { label: "Worried", value: "WORRIED" },
          { label: "Anxious", value: "ANXIOUS" },
        ]}
        placeholder={{}}
        value={emotion}
        useNativeAndroidPickerStyle={false}
        style={{
          inputAndroid: pickerStyle,
          inputIOS: pickerStyle,
        }}
      />
      <TouchableOpacity
        onPress={add}
        style={{
          width: "100%",
          height: 50,
          borderRadius: 20,
          backgroundColor: "#ff785b",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontFamily: "BreeSerif_400Regular",
          }}
        >
          Add an emotion
        </Text>
      </TouchableOpacity>
    </View>
  );
}
