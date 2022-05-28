import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppLoading from "expo-app-loading";
import { useFonts, BreeSerif_400Regular } from "@expo-google-fonts/bree-serif";
import { useState, useMemo, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import Register from "./tabs/Register";
import CreateMemory from "./tabs/CreateMemory";

import TabBar from "./TabBar";

import HomeStack from "./tabs/Home";
import AccountStack from "./tabs/Account";
import StatisticsStack from "./tabs/Statistics";
import JournalStack from "./tabs/Journal";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./tabs/Login";

import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolate.CLAMP
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "#rgba(0, 0, 0, 0.5)",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  return <Animated.View pointerEvents="none" style={containerStyle} />;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const JWTContext = createContext({ JWT: "", setJWT: () => {} } as any);

export default function App() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["85%"], []);
  let [fontsLoaded] = useFonts({ BreeSerif_400Regular });
  let [JWT, setJWT] = useState<string | null>(null);
  let [bottomSheetIndex, setBottomSheetIndex] = useState(0);

  let [isCreatingAccount, setIsCreatingAccount] = useState<boolean>(false);

  useEffect(() => {
    AsyncStorage.getItem("jwt").then((token) => {
      if (token) {
        setJWT(token);
      }
    });
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (!JWT) {
    return (
      <JWTContext.Provider value={{ JWT, setJWT }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>
      </JWTContext.Provider>
    );
  }

  return (
    <JWTContext.Provider value={{ JWT, setJWT }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
          tabBar={(props: any) => (
            <TabBar
              onAddPress={() => bottomSheetRef.current?.expand()}
              {...props}
            />
          )}
        >
          <Tab.Screen name="tab.Home" component={HomeStack} />
          <Tab.Screen name="tab.Journal" component={JournalStack} />
          <Tab.Screen name="tab.Statistics" component={StatisticsStack} />
          <Tab.Screen name="tab.Account" component={AccountStack} />
        </Tab.Navigator>
      </NavigationContainer>
      <BottomSheet
        backdropComponent={(props) => <CustomBackdrop {...props} />}
        backgroundStyle={{ backgroundColor: "#fcfbfb", borderRadius: 20 }}
        enablePanDownToClose
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={-1}
        onChange={(index: number) => setBottomSheetIndex(index)}
        style={{
          marginLeft: 10,
          marginRight: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.15,
          shadowRadius: 20,
        }}
      >
        <CreateMemory
          visible={bottomSheetIndex !== -1}
          hide={() => {
            bottomSheetRef.current?.snapToPosition(0);
          }}
        />
      </BottomSheet>
    </JWTContext.Provider>
  );
}
