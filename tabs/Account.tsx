import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { JWTContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { useCategories } from "../api/useCategories";

const Stack = createNativeStackNavigator() as any;

function AccountScreen({ navigation, route }) {
  const { JWT, setJWT } = useContext(JWTContext);

  const [categories, addCategory, updateCategories, _] = useCategories();

  useEffect(() => {
    setTimeout(() => updateCategories(), 500);
  }, [route.params]);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: "#fcfbfb" }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#ffffff",
            flex: 1,
            marginTop: 20,
            padding: 20,
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.025,
            shadowRadius: 10,
            borderWidth: 1,
            borderColor: "rgba(224, 224, 224, 0.5)",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "#515151",
              fontSize: 20,
              fontWeight: "600",
              fontFamily: "BreeSerif_400Regular",
            }}
          >
            Categories:
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.name}
                onPress={() => {
                  navigation.navigate("EditCategory", category);
                }}
                style={{
                  backgroundColor: "#FF785B",
                  marginTop: 10,
                  marginRight: 5,
                  paddingTop: 6,
                  paddingBottom: 6,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 30,
                }}
              >
                <Text
                  style={{
                    color: "#ffffff",
                    fontSize: 14,
                  }}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              key={"new"}
              onPress={() => navigation.navigate("AddNewCategory")}
              style={{
                backgroundColor: "#ffffff",
                marginTop: 10,
                marginRight: 5,
                paddingTop: 6,
                paddingBottom: 6,
                paddingLeft: 10,
                paddingRight: 10,
                borderRadius: 30,
                borderColor: "#FF785B",
                borderStyle: "solid",
                borderWidth: 1,
              }}
            >
              <Text
                style={{
                  color: "#000000",
                  fontSize: 14,
                }}
              >
                + new
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={{
            width: 250,
            height: 50,
            borderRadius: 20,
            backgroundColor: "#ff785b",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
          onPress={() => {
            setJWT(null);
            AsyncStorage.removeItem("jwt");
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
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const AddNewCategoryScreen = ({ navigation }) => {
  const [_, addCategory, __, ___] = useCategories();

  const [name, setName] = useState("");

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: "#fcfbfb" }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#ffffff",
            flex: 1,
            marginTop: 50,
            padding: 20,
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.025,
            shadowRadius: 10,
            borderWidth: 1,
            borderColor: "rgba(224, 224, 224, 0.5)",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "#515151",
              fontSize: 20,
              fontWeight: "600",
              fontFamily: "BreeSerif_400Regular",
            }}
          >
            Add new category:
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <TextInput
              style={{
                backgroundColor: "#ffffff",
                marginTop: 20,
                marginRight: 5,
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 30,
                width: "100%",
                borderColor: "#FF785B",
                borderStyle: "solid",
                borderWidth: 1,
              }}
              placeholder="Name"
              onChangeText={(text) => setName(text)}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#FF785B",
                marginTop: 10,
                marginRight: 5,
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 30,
                width: "100%",
              }}
              onPress={() => {
                addCategory(name);
                setName("");
                navigation.navigate("Account", name);
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const EditCategoryScreen = ({ navigation, route }) => {
  const [_, __, ___, editCategory] = useCategories(route.params.id);

  const [name, setName] = useState(route.params.name);

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: "#fcfbfb" }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        <View
          style={{
            backgroundColor: "#ffffff",
            flex: 1,
            marginTop: 20,
            padding: 20,
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.025,
            shadowRadius: 10,
            borderWidth: 1,
            borderColor: "rgba(224, 224, 224, 0.5)",
            width: "100%",
          }}
        >
          <Text
            style={{
              color: "#515151",
              fontSize: 20,
              fontWeight: "600",
              fontFamily: "BreeSerif_400Regular",
            }}
          >
            Edit category:
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <TextInput
              style={{
                backgroundColor: "#ffffff",
                marginTop: 20,
                marginRight: 5,
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 30,
                width: "100%",
                borderColor: "#FF785B",
                borderStyle: "solid",
                borderWidth: 1,
              }}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#FF785B",
                marginTop: 10,
                marginRight: 5,
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 15,
                paddingRight: 15,
                borderRadius: 30,
                width: "100%",
              }}
              onPress={() => {
                editCategory(name);
                setName("");
                navigation.navigate("Account", name);
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerLargeTitleStyle: {
          color: "#ff785b",
          fontFamily: "BreeSerif_400Regular",
        },
        headerLargeStyle: { backgroundColor: "#fcfbfb" },
      }}
    >
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddNewCategory"
        component={AddNewCategoryScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EditCategory"
        component={EditCategoryScreen}
      />
    </Stack.Navigator>
  );
}
