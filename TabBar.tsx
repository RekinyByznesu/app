import { View, Text, TouchableOpacity, Platform } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ICONS = {
  "tab.Home": "home",
  "tab.Journal": "book",
  "tab.Statistics": "barschart",
  "tab.Account": "user",
};

const mapTabs = (
  route: any,
  index: number,
  { state, descriptors, navigation }: any
) => {
  const { options } = descriptors[route.key];
  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
      ? options.title
      : route.name;

  const isFocused = state.index === index;

  const onPress = () => {
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      navigation.navigate({ name: route.name, merge: true });
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: "tabLongPress",
      target: route.key,
    });
  };

  return (
    <TouchableOpacity
      key={route.name}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <AntDesign
        name={
          ICONS[
            label as
              | "tab.Home"
              | "tab.Journal"
              | "tab.Statistics"
              | "tab.Account"
          ] as "home" | "book" | "barschart" | "user"
        }
        size={24}
        color={isFocused ? "#ff785b" : "#515151"}
      />
      <Text
        style={{
          color: isFocused ? "#ff785b" : "#515151",
          textAlign: "center",
          marginTop: 5,
          fontFamily: "BreeSerif_400Regular",
        }}
      >
        {label.substring(4)}
      </Text>
    </TouchableOpacity>
  );
};

export default function TabBar(props: any) {
  return (
    <View
      style={{
        flexDirection: "row",
        height: Platform.OS === "ios" ? 95 : 75,
        paddingBottom: Platform.OS === "ios" ? 20 : 0,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: "rgba(224, 224, 224, 0.8)",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        justifyContent: "space-evenly",
      }}
    >
      {props.state.routes
        .slice(0, 2)
        .map((route: any, index: number) => mapTabs(route, index, props))}

      <TouchableOpacity activeOpacity={0.75} onPress={props.onAddPress}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ff785b",
            height: 60,
            width: 60,
            borderRadius: 60,
            top: -10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.15,
            shadowRadius: 4,
          }}
        >
          <AntDesign name="plus" size={24} color="white" />
        </View>
      </TouchableOpacity>

      {props.state.routes
        .slice(2, 4)
        .map((route: any, index: number) => mapTabs(route, index + 2, props))}
    </View>
  );
}
