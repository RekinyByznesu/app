import { Platform, Text, View, ScrollView, SafeAreaView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BarChart, LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { useState, useEffect } from "react";
import { useStatistics } from "../api/useStatistics";
import type { ChartData } from "react-native-chart-kit/dist/HelperTypes";
import type { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";
import DropDownPicker from "react-native-dropdown-picker";

const Stack = createNativeStackNavigator() as any;

const chartConfig = {
  backgroundColor: "#fcfbfb",
  backgroundGradientFrom: "#fcfbfb",
  backgroundGradientTo: "#fcfbfb",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 113, 83, 0.2)`,
  labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
  fillShadowGradientFrom: "rgba(255, 113, 83, 1)",
  fillShadowGradientTo: "rgba(255, 113, 83, 1)",
  fillShadowGradientFromOpacity: 1,
  fillShadowGradientToOpacity: 1,
  barPercentage: 1,
  style: {
    borderRadius: 16,
    zIndex: -1000,
  },
};

const Dropdown = (props: any) => {
  DropDownPicker.setListMode("SCROLLVIEW");

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Places", value: "PLACE" },
    { label: "People", value: "PERSON" },
    { label: "Activities", value: "ACTIVITY" },
    { label: "Others", value: "OTHER" },
  ]);
  //const [value, setValue] = useState(null);
  /*const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);*/ return (
    <View style={{ margin: 10 }}>
      <DropDownPicker
        open={open}
        value={props.value}
        items={items}
        setOpen={setOpen}
        setValue={props.setValue}
        setItems={setItems}
        style={{
          width: "75%",
          borderRadius: 30,
          borderColor: "#FE7153",
          borderWidth: 2,
          zIndex: 1000,
        }}
        dropDownContainerStyle={{
          width: "75%",
          borderColor: "#FE7153",
          borderWidth: 1,
          borderRadius: 30,
          flexDirection: "column-reverse",
          zIndex: 1000,
        }}
        dropDownDirection="BOTTOM"
        // containerStyle={{
        //   display: "flex",
        //   justifyContent: "center",
        // }}
        placeholder="Select a category"
        searchable={false}
        addCustomItem={false}
        textStyle={{
          alignSelf: "center",
          textAlign: "center",
          fontFamily: "BreeSerif_400Regular",
          fontSize: 16,
        }}
        searchContainerStyle={{
          borderBottomColor: "#eee",
        }}
        customItemLabelStyle={{}}
        searchTextInputStyle={{
          borderColor: "#fff",
        }}
        searchPlaceholder="Add a tag"
        showTickIcon={false}
      />
    </View>
  );
};

function StatisticsScreen() {
  const [statistics, fetchStatistics] = useStatistics();
  // const [statistics2, fetchStatistics2] = useStatistics2();
  const [value, setValue] = useState("PLACE");
  //TODO: might require undruting
  useEffect(() => {
    fetchStatistics(value);
    // fetchStatistics2(new Date());
  }, []);
  useEffect(() => {
    fetchStatistics(value);
    // fetchStatistics2(new Date());
    setData(updateData());
    // setData2(updateData2(new Date()));
  }, [value, statistics]);

  const updateData = () => {
    return {
      labels: [
        ...statistics.stats.map((stat) => {
          if (stat.tag.length <= 10) {
            return stat.tag;
          }
          return stat.tag.slice(0, 10) + "...";
        }),
      ],
      datasets: [
        {
          data: statistics.stats.map((stat) => stat.score),
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 2, // optional
        },
      ],
      //legend: ["THING"], // optional
    };
  };
  // const updateData2 = (date: Date) => {
  //   const days = [-6, -5, -4, -3, -2, -1, 0].map((offset) => {
  //     return new Date(date.getTime() + offset * 86400000).getDate().toString();
  //   });
  //   return {
  //     labels: days,
  //     datasets: [
  //       {
  //         data: statistics2.map((stat) => stat.score),
  //         color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
  //         strokeWidth: 2, // optional
  //       },
  //     ],
  //     legend: ["Rainy Days"], // optional
  //   };
  // };
  const [data, setData] = useState<ChartData>(updateData());
  // const [data2, setData2] = useState<LineChartData>(updateData2(new Date()));
  return (
    <ScrollView
      // contentInsetAdjustmentBehavior="automatic"
      style={{
        backgroundColor: "#fcfbfb",
      }}
    >
      <View
        style={{
          // padding: 20,
          width: "100%",
          display: "flex",
          alignItems: "center",
          marginTop: Platform.OS === "ios" ? 130 : 0,
          height: 1000,
        }}
      >
        <Text
          style={{
            color: "#FE7153",
            fontSize: 18,
            marginTop: 20,
            fontFamily: "BreeSerif_400Regular",
          }}
        >
          Pick a category
        </Text>
        <Dropdown
          value={value}
          setValue={setValue}
          searchable={false}

          // items={items}
          //setItems={setItems}
        />
        <BarChart
          data={data}
          width={Dimensions.get("window").width * 0.75} // from react-native
          height={420}
          fromZero={true}
          yAxisLabel={""}
          yAxisSuffix={""}
          yAxisInterval={1} // optional, defaults to 1
          xLabelsOffset={-15}
          verticalLabelRotation={90}
          chartConfig={chartConfig}
          showBarTops={false}
          style={{ marginVertical: 40, zIndex: -1000 }}
        />
        {/* <Dropdown /> */}
        {/* <LineChart
          data={data2}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={chartConfig}
          withDots={false}
          style={{ zIndex: -1000 }}
          bezier
        /> */}
      </View>
    </ScrollView>
  );
}

export default function StatisticsStack() {
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
      <Stack.Screen name="Statistics" component={StatisticsScreen} />
    </Stack.Navigator>
  );
}
