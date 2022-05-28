import { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useTags } from "../api/useTags";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";

export function AddTags({ onChange }: { onChange: (tags: number[]) => void }) {
  const [addedTags, setAddedTags] = useState<number[]>([]);
  const [tag, setTag] = useState<number | null>(null);

  useEffect(() => onChange(addedTags), [addedTags]);

  const [tags] = useTags();

  const onValueChange = (value: number) => {
    setTag(value);
  };

  const add = () => {
    if (tag === null) return;
    if (!addedTags.includes(tag)) {
      setAddedTags([...addedTags, tag]);
    }
  };

  const deleteCategories = (id: number) => {
    setAddedTags(addedTags.filter((e) => e !== id));
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

  const tagIcons = {
    PLACE: "office-building",
    PERSON: "account",
    ACTIVITY: "run",
    OTHER: "tag",
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

        // flexDirection: "row",
      }}
    >
      <View
        style={{
          display: "flex",
          // justifyContent: "center",
          alignContent: "stretch",
          alignItems: "stretch",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {addedTags.map((tag) => (
          <TouchableOpacity
            style={{
              paddingHorizontal: 15,
              paddingVertical: 14,
              margin: 5,
              backgroundColor: `rgb(255,113,89)`,
              borderRadius: 30,
              // alignSelf: "center",
            }}
            key={tag}
            onPress={() => deleteCategories(tag)}
          >
            <Text
              style={{
                width: "100%",
                textAlign: "center",
                textTransform: "capitalize",
                fontFamily: "BreeSerif_400Regular",
                color: "#fff",
                // paddingLeft: 10,
              }}
            >
              <MaterialCommunityIcons
                name={
                  tagIcons[
                    tags.find((e) => e.id === tag)
                      ?.type as keyof typeof tagIcons
                  ]
                }
                size={20}
                // color="#919191"
                color="#ffffff"
              />
              {tags.find((t) => t.id === tag)!.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <RNPickerSelect
        onValueChange={onValueChange}
        items={tags.map((tag) => ({
          label: tag.name,
          value: tag.id,
        }))}
        placeholder={{}}
        value={tag}
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
          Add a tag
        </Text>
      </TouchableOpacity>
    </View>
  );
}
