import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import countriesData from "../../../assets/data/beautiful_countries_with_landmarks.json";
import { CreateTripContext } from "../../../context/CreateTripContext";

export default function SelectDate() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);

  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const onDateChange = (date, type) => {
    if (type === "START_DATE") {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };

  const onDateSelectionContinue = () => {
    // Check if both start and end dates are selected
    if (!startDate || !endDate) {
      ToastAndroid.show(
        "Please select both Start date and End date",
        ToastAndroid.LONG
      );
      return;
    }

    // Ensure endDate is after startDate
    if (endDate.isBefore(startDate)) {
      ToastAndroid.show("End date must be after Start date", ToastAndroid.LONG);
      return;
    }

    // Calculate the number of days between start and end dates
    const totalNoOfDate = endDate.diff(startDate, "days");
    console.log("Total days:", totalNoOfDate + 1);
    setTripData({
      ...tripData,
      startDate: startDate,
      endDate: endDate,
      totalNoOfDate: totalNoOfDate + 1,
    });
    router.push("/create-trip/select-budget");
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 35,
          marginTop: 20,
          marginBottom: 30,
        }}
      >
        Travel Dates
      </Text>

      <CalendarPicker
        onDateChange={onDateChange}
        allowRangeSelection={true}
        minDate={new Date()}
        maxRangeDuration={5}
        selectedRangeStyle={{
          backgroundColor: Colors.PRIMARY,
        }}
        selectedDayTextStyle={{
          color: Colors.WHITE,
        }}
      />

      <TouchableOpacity
        onPress={onDateSelectionContinue}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 35,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: Colors.WHITE,
            fontFamily: "outfit-medium",
            fontSize: 20,
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
