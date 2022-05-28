import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, View, Text, TouchableOpacity } from "react-native";

export function ChooseDate({ onChange }: { onChange: (date: Date) => void }) {
  const [date, setDate] = useState(new Date());

  const dateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    onChange(currentDate);
  };

  const displayDatepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: dateChange,
      mode: "date",
      is24Hour: true,
    });
  };

  const displayTimepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: dateChange,
      mode: "time",
      is24Hour: true,
    });
  };

  return (
    <>
      {Platform.OS === "ios" ? (
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
            Choose date:
          </Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="datetime"
            is24Hour={true}
            onChange={dateChange}
            style={{ width: 200 }}
          />
        </View>
      ) : (
        <View>
          <TouchableOpacity
            onPress={displayDatepicker}
            style={{
              borderColor: "rgba(224, 224, 224, 0.8)",
              borderWidth: 1,
              marginTop: 20,
              width: "100%",
              height: 60,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
            }}
          >
            <Text
              style={{
                color: "#515151",
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "BreeSerif_400Regular",
              }}
            >
              Choose date
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={displayTimepicker}
            style={{
              borderColor: "rgba(224, 224, 224, 0.8)",
              borderWidth: 1,
              marginTop: 20,
              width: "100%",
              height: 60,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
            }}
          >
            <Text
              style={{
                color: "#515151",
                fontSize: 16,
                fontWeight: "600",
                fontFamily: "BreeSerif_400Regular",
              }}
            >
              Choose time
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
