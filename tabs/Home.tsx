import { Text, View, ScrollView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Dimensions } from "react-native";
import { useContext, useMemo, useState, useEffect } from "react";
import { JWTContext } from "../App";
import { parseJwt } from "../utils/jwt";
import { useEvents } from "../api/useEvents";
import { useRecents } from "../api/useRecents";
import Dropdown from "../components/Dropdown";
const Stack = createNativeStackNavigator() as any;

const ACTIVITIES = ["walking the dog", "drinking tea", "talking to mom"];
function ActivityList(props: string[]) {
  const listItems = props.map((item) => (
    <Text
      key={item}
      style={{
        color: "#FE7153",
        fontSize: 18,
        marginLeft: 30,
        fontFamily: "BreeSerif_400Regular",
      }}
    >
      {"\u2022"}
      {item}
    </Text>
  ));
  return <View style={{ marginBottom: 20 }}>{listItems}</View>;
}

function HelloHeader(props: string) {
  return (
    <Text
      style={{
        color: "#515151",
        fontSize: 24,
        marginBottom: 10,
        fontFamily: "BreeSerif_400Regular",
      }}
    >
      Hello, <Text style={{ color: "#FE7153" }}>{props}</Text> 👋 {"\n"}
      We're so glad to have you
    </Text>
  );
}
function HomeScreen() {
  const { JWT } = useContext(JWTContext);
  const username = useMemo(() => parseJwt(JWT).username, []);
  const [events, addNewDay] = useEvents();
  const [recents, fetchRecents] = useRecents();

  useEffect(() => {
    (async () => {
      await addNewDay(new Date());
      await fetchRecents(new Date());
    })();
    console.log(recents);
  }, []);

  //DROPDOWN VARS
  const [items, setItems] = useState([
    { label: "Places", value: "PLACE" },
    { label: "People", value: "PERSON" },
    { label: "Activities", value: "ACTIVITY" },
    { label: "Others", value: "OTHER" },
  ]);
  const [value, setValue] = useState("PLACE");
  const [open, setOpen] = useState(false);

  const countRecentsToday = (data: any) => {
    let count = 0;
    data.forEach((item: any) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const event = new Date(item.date);
      event.setHours(0, 0, 0, 0);
      if (today.getTime() === event.getTime()) {
        count++;
      }
    });
    return count;
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ backgroundColor: "#fcfbfb" }}
    >
      <View
        style={{
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20,
        }}
      >
        {HelloHeader(username)}
        <View
          style={{
            marginTop: 20,
            backgroundColor: "#fff",
            borderRadius: 30,
            borderColor: "rgba(224, 224, 224, 0.5)",
            borderWidth: 1,
          }}
        >
          <Text
            style={{
              color: "#515151",
              fontSize: 24,
              lineHeight: 34,
              fontFamily: "BreeSerif_400Regular",
              margin: 20,
            }}
          >
            Journal entries today:{"   "}
            <Text
              style={{
                fontSize: 34,
                color: "#FE7153",
              }}
            >
              {recents[0] ? recents[0].length : 0}/3
            </Text>
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            backgroundColor: "#fff",
            borderRadius: 30,
            borderColor: "rgba(224, 224, 224, 0.5)",
            borderWidth: 1,
          }}
        >
          <Text
            style={{
              color: "#515151",
              fontSize: 20,
              marginTop: 20,
              marginLeft: 20,
              marginBottom: 10,
              fontFamily: "BreeSerif_400Regular",
            }}
          >
            Today we suggest you do one of the following:
          </Text>
          {ActivityList(ACTIVITIES)}
        </View>
        <View
          style={{
            marginVertical: 20,
            backgroundColor: "#fff",
            borderRadius: 30,
            borderColor: "rgba(224, 224, 224, 0.5)",
            borderWidth: 1,
          }}
        >
          <Text
            style={{
              color: "#515151",
              fontSize: 20,
              fontFamily: "BreeSerif_400Regular",
              marginLeft: 20,
              marginRight: 20,
              marginTop: 20,
            }}
          >
            Positive events from last few days:
          </Text>
          <Text style={{ marginLeft: 30, marginTop: 10 }}>
            {recents.map((event) =>
              event.map((item) => (
                <>
                  <Text
                    key={item.id}
                    style={{
                      color: "#FE7153",
                      fontSize: 18,
                      marginLeft: 30,
                      marginTop: 20,
                      fontFamily: "BreeSerif_400Regular",
                    }}
                  >
                    {"\u2022"}
                    {item.title}
                    {"\n"}
                  </Text>
                  {/* <Text style={{ color: "#000" }}>{item.tags.join(", ")}</Text> */}

                  {/* {"\n"} */}
                </>
              ))
            )}
          </Text>
          {/* {recents.map((event) => {
              return (
                <Text
                  key={event.id}
                  style={{
                    color: "#FE7153",
                    fontSize: 18,
                    marginLeft: 30,
                    marginTop: 20,
                    fontFamily: "BreeSerif_400Regular",
                  }}
                >
                  {"\u2022"}
                  {event.title}
                  {"\n"}
                  <Text style={{ color: "#000000" }}>
                    {JSON.stringify(event.tags)}
                  </Text>
                  {"\n"}
                </Text>
              );
            })} */}
        </View>

        {/* <Dropdown
          multiple={true}
          items={items}
          searchable={true}
          editable={false}
          defaultValue={value}
          placeholder={"placeholder"}
          open={open}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        /> */}
      </View>

      {/* <Text style={{ marginLeft: 20, marginBottom: 20 }}>Home Screen</Text> */}
    </ScrollView>
  );
}

export default function HomeStack() {
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
      <Stack.Screen name="Moodify" component={HomeScreen} />
    </Stack.Navigator>
  );
}
