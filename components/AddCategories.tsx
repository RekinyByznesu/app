import { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useCategories } from "../api/useCategories";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";

export function AddCategories({
  onChange,
}: {
  onChange: (categories: number[]) => void;
}) {
  const [addedCategories, setAddedCategories] = useState<number[]>([]);
  const [category, setCategory] = useState<number | null>(null);

  useEffect(() => onChange(addedCategories), [addedCategories]);

  const [categories, _, __, ___] = useCategories();

  const onValueChange = (value: number) => {
    setCategory(value);
  };

  const add = () => {
    if (category === null) return;
    if (!addedCategories.includes(category)) {
      setAddedCategories([...addedCategories, category]);
    }
  };

  const deleteCategories = (id: number) => {
    setAddedCategories(addedCategories.filter((e) => e !== id));
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
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#efefef",
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
        {addedCategories.map((cat) => (
          <TouchableOpacity
            style={{
              paddingHorizontal: 15,
              paddingVertical: 14,
              margin: 5,
              backgroundColor: `rgb(255,113,89)`,
              borderRadius: 30,
              // alignSelf: "center",
            }}
            key={cat}
            onPress={() => deleteCategories(cat)}
          >
            <Text
              style={{
                color: "#fff",
                width: "100%",
                textAlign: "center",
                textTransform: "capitalize",
                fontFamily: "BreeSerif_400Regular",
                // paddingLeft: 10,
              }}
            >
              {categories.find((c) => c.id === cat)!.name}
              {"  "}
              <MaterialCommunityIcons
                name="close-thick"
                size={14}
                // color="#919191"
                color="#fff"
              />
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <RNPickerSelect
        onValueChange={onValueChange}
        items={categories.map((category) => ({
          label: category.name,
          value: category.id,
        }))}
        placeholder={{}}
        value={category}
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
          Add a category
        </Text>
      </TouchableOpacity>
    </View>
  );
}
