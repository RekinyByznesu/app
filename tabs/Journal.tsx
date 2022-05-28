import {
  Text,
  TextInput,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useEffect, useState } from "react";
import { JWTContext } from "../App";
import { useEvents } from "../api/useEvents";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { deleteEvent } from "../api/deleteEvent";

const Stack = createNativeStackNavigator() as any;

function History({ title, children }: { title: string; children?: any }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fcfbfb",
        padding: 20,
      }}
    >
      <Text
        style={{
          color: "#515151",
          fontSize: 24,
          fontFamily: "BreeSerif_400Regular",
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}

function EventCard({
  title,
  tags,
  onPress,
}: {
  title: string;
  tags: string[];
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 16,
        marginTop: 16,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.025,
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: "rgba(224, 224, 224, 0.5)",
      }}
    >
      <Text
        style={{
          color: "#515151",
          fontSize: 20,
          fontFamily: "BreeSerif_400Regular",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          color: "#515151",
          fontSize: 16,
          fontFamily: "BreeSerif_400Regular",
        }}
      >
        {tags.join(", ")}
      </Text>
    </TouchableOpacity>
  );
}

function JournalScreen({ navigation }: { navigation: any }) {
  const [events, addNewDay] = useEvents();

  const [day, setDay] = useState(new Date());

  useEffect(() => {
    addNewDay(day);
    setDay(new Date(day.getTime() - 86400000));
  }, []);

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      data={events}
      renderItem={({ item }) => (
        <History title={item.name}>
          {item.data.length !== 0 ? (
            item.data.map((event) => (
              <EventCard
                key={event.id}
                {...event}
                onPress={() => navigation.navigate("Event", event)}
              />
            ))
          ) : (
            <Text>No events that day</Text>
          )}
        </History>
      )}
      onEndReached={() => {
        addNewDay(day);
        setDay(new Date(day.getTime() - 86400000));
      }}
      onEndReachedThreshold={0.3}
      style={{ backgroundColor: "#fcfbfb" }}
    />
  );
}

const GetSuggested = ({
  id,
  navigation,
  params,
}: {
  id: number;
  navigation: any;
  params: any;
}) => {
  const { JWT } = useContext(JWTContext);
  const [generated, setGenerated] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const fetchSuggestion = async () => {
    const rawReq = await fetch(
      `http://91.206.245.239:5000/api/v1/events/${id}/suggestedSolution`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    return (await rawReq.json()).solutions;
  };

  const getSuggestion = () => {
    fetchSuggestion()
      .then((suggestions) => {
        if (suggestions === null) throw new Error("No suggestions");
        setSuggestions(suggestions);
        setGenerated(true);
      })
      .catch(alert);
  };

  const updateSolution = async (id: number, solution: string) => {
    const rawReq = await fetch(
      `http://91.206.245.239:5000/api/v1/events/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
        body: JSON.stringify({
          solution,
          positive: false,
        }),
      }
    );
    if (rawReq.status !== 200) {
      alert("Error updating solution");
    } else {
      navigation.navigate("Event", { ...params, solution });
    }
  };

  return generated ? (
    <View>
      {suggestions.map((suggestion) => (
        <TouchableOpacity
          style={{
            backgroundColor: "#ececec",
            borderRadius: 20,
            marginHorizontal: 20,
            marginVertical: 5,
            padding: 20,
          }}
          onPress={() => updateSolution(id, suggestion)}
          key={suggestion}
        >
          <Text
            style={{ fontFamily: "BreeSerif_400Regular", textAlign: "center" }}
          >
            {suggestion}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  ) : (
    <View>
      <TouchableOpacity
        onPress={getSuggestion}
        style={{
          marginHorizontal: 20,
          marginTop: 10,
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderRadius: 20,
          backgroundColor: "#ff785b",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontFamily: "BreeSerif_400Regular",
            color: "white",
            fontSize: 18,
          }}
        >
          Get suggested solutions
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const EventScreen = ({ navigation, route }) => {
  return (
    <View
      style={{ backgroundColor: "#fcfbfb", minHeight: "100%", paddingTop: 10 }}
    >
      <Text
        style={{
          color: "#515151",
          fontSize: 30,
          paddingHorizontal: 20,
          fontFamily: "BreeSerif_400Regular",
        }}
      >
        {route.params.title}
      </Text>
      <Text
        style={{
          color: "#515151",
          fontSize: 20,
          paddingHorizontal: 20,
          fontFamily: "BreeSerif_400Regular",
        }}
      >
        {route.params.description}
      </Text>
      <Text
        style={{
          color: "#515151",
          fontSize: 16,
          fontWeight: "100",
          paddingHorizontal: 20,
          fontFamily: "BreeSerif_400Regular",
        }}
      >
        {route.params.positive ? "Positive" : "Negative"}
      </Text>
      <Text
        style={{
          color: "#515151",
          fontSize: 16,
          fontWeight: "100",
          paddingHorizontal: 20,
          fontFamily: "BreeSerif_400Regular",
        }}
      >
        Date: {route.params.date.toDateString()}
      </Text>
      <Text
        style={{
          marginHorizontal: 20,
          marginTop: 10,
          fontFamily: "BreeSerif_400Regular",
        }}
      >
        Emotions:
      </Text>
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 20,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {route.params.emotions.map((emotion: string) => (
          <View
            style={{
              padding: 10,
              borderRadius: 20,
              marginRight: 5,
              backgroundColor: "#ececec",
            }}
            key={emotion}
          >
            <Text
              style={{
                fontFamily: "BreeSerif_400Regular",
                textTransform: "capitalize",
              }}
            >
              {emotion}
            </Text>
          </View>
        ))}
      </View>
      <Text
        style={{
          marginHorizontal: 20,
          marginTop: 10,
          fontFamily: "BreeSerif_400Regular",
        }}
      >
        Tags:
      </Text>
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 20,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {route.params.tags.map((tag: string) => (
          <View
            style={{
              padding: 10,
              borderRadius: 20,
              marginRight: 5,
              backgroundColor: "#ececec",
            }}
            key={tag}
          >
            <Text style={{ fontFamily: "BreeSerif_400Regular" }}>{tag}</Text>
          </View>
        ))}
      </View>
      <Text
        style={{
          marginHorizontal: 20,
          marginTop: 10,
          fontFamily: "BreeSerif_400Regular",
        }}
      >
        Categories:
      </Text>
      <View
        style={{
          marginVertical: 10,
          marginHorizontal: 20,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {route.params.categories.map((category: string) => (
          <View
            style={{
              padding: 10,
              marginRight: 5,
              borderRadius: 20,
              backgroundColor: "#ececec",
            }}
            key={category}
          >
            <Text style={{ fontFamily: "BreeSerif_400Regular" }}>
              {category}
            </Text>
          </View>
        ))}
      </View>
      {!route.params.positive ? (
        <>
          <Text
            style={{
              marginHorizontal: 20,
              marginTop: 10,
              fontFamily: "BreeSerif_400Regular",
            }}
          >
            Solution:
          </Text>
          {route.params.solution ? (
            <Text
              style={{
                marginHorizontal: 20,
                marginTop: 10,
              }}
            >
              {route.params.solution}
            </Text>
          ) : (
            <>
              <GetSuggested
                id={route.params.id}
                navigation={navigation}
                params={route.params}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AddSolution", { ...route.params })
                }
                style={{
                  backgroundColor: "#ececec",
                  borderRadius: 20,
                  marginHorizontal: 20,
                  marginVertical: 5,
                  padding: 15,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontFamily: "BreeSerif_400Regular",
                  }}
                >
                  Add new solution
                </Text>
              </TouchableOpacity>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </View>
  );
};

function AddSolutionScreen({ navigation, route }: any) {
  const { JWT } = useContext(JWTContext);
  const [solution, setSolution] = useState("");

  const updateSolution = async () => {
    const rawReq = await fetch(
      `http://91.206.245.239:5000/api/v1/events/${route.params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JWT}`,
        },
        body: JSON.stringify({
          solution,
          positive: false,
        }),
      }
    );
    if (rawReq.status !== 200) {
      alert("Error updating solution");
    } else {
      navigation.navigate("Event", { ...route.params, solution });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fcfbfb",
        alignItems: "center",
      }}
    >
      <TextInput
        style={{
          borderColor: "rgba(224, 224, 224, 0.8)",
          borderWidth: 1,
          width: "80%",
          height: 150,
          borderRadius: 20,
          padding: 20,
          marginVertical: 10,
          marginHorizontal: 20,
        }}
        multiline={true}
        placeholder="Solution"
        placeholderTextColor="#515151"
        autoCorrect={false}
        onChangeText={(text) => {
          setSolution(text);
        }}
      ></TextInput>
      <TouchableOpacity
        onPress={updateSolution}
        style={{
          backgroundColor: "#ff785b",
          width: "80%",
          borderRadius: 20,
          marginHorizontal: 20,
          marginVertical: 5,
          padding: 15,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            color: "#ffffff",
            fontFamily: "BreeSerif_400Regular",
          }}
        >
          Add
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function JournalStack() {
  const { JWT } = useContext(JWTContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerLargeTitleStyle: {
          color: "#ff785b",
          fontFamily: "BreeSerif_400Regular",
        },
        headerTitleStyle: {
          color: "#515151",
          fontFamily: "BreeSerif_400Regular",
        },
        headerBackTitleStyle: {
          color: "#515151",
          fontFamily: "BreeSerif_400Regular",
        },
        headerTintColor: "#ff785b",
        headerLargeStyle: { backgroundColor: "#fcfbfb" },
      }}
    >
      <Stack.Screen name="Journal" component={JournalScreen} />
      <Stack.Screen
        options={({ navigation, route }: any) => ({
          headerBackVisible: true,
          headerLargeTitle: false,
          headerTintColor: "#ff785b",
          headerTitle: "Event details",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                deleteEvent(JWT, route.params.id)
                  .then(() => navigation.goBack())
                  .catch((message) => alert(message));
              }}
            >
              <Ionicons name="ios-trash-outline" size={24} color="#ff785b" />
            </TouchableOpacity>
          ),
        })}
        name="Event"
        component={EventScreen}
      />
      <Stack.Screen
        options={{
          headerBackVisible: true,
          headerLargeTitle: false,
          headerTintColor: "#ff785b",
          headerTitle: "Add solution",
        }}
        name="AddSolution"
        component={AddSolutionScreen}
      />
    </Stack.Navigator>
  );
}
