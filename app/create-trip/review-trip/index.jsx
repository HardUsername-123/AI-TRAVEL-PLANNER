import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import countriesData from "../../../assets/data/beautiful_countries_with_landmarks.json";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CreateTripContext } from "../../../context/CreateTripContext";
import moment from "moment";

export default function ReviewTrip() {
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
        }}
      >
        Review Trip
      </Text>

      <View>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 20,
          }}
        >
          Before generating your trip, please review your selection
        </Text>
      </View>
      <View
        style={{
          marginTop: 30,
          display: "flex",
          flexDirection: "row",
          gap: 20,
        }}
      >
        {/* <Distination */}
        <Text
          style={{
            fontSize: 30,
          }}
        >
          🌍
        </Text>
        <View>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 20,
              color: Colors.GRAY,
            }}
          >
            Destination
          </Text>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
            }}
          >
            {tripData?.country?.name}
          </Text>
        </View>
        <View></View>
      </View>

      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          gap: 20,
        }}
      >
        {/* Travel Date */}
        <Text
          style={{
            fontSize: 30,
          }}
        >
          📅
        </Text>
        <View>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 20,
              color: Colors.GRAY,
            }}
          >
            Travel Date
          </Text>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
            }}
          >
            {moment(tripData?.startDate).format("DD MMM") +
              " to " +
              moment(tripData.endDate).format("DD MMM")}
            {"  "}({tripData?.totalNoOfDate} days)
          </Text>
        </View>
        <View></View>
      </View>

      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          gap: 20,
        }}
      >
        {/* Who is Traveling */}
        <Text
          style={{
            fontSize: 30,
          }}
        >
          👫
        </Text>
        <View>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 20,
              color: Colors.GRAY,
            }}
          >
            Who is Traveling
          </Text>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
            }}
          >
            {tripData?.travelerCount?.title}
          </Text>
        </View>
        <View></View>
      </View>

      <View
        style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "row",
          gap: 20,
        }}
      >
        {/* Budget */}
        <Text
          style={{
            fontSize: 30,
          }}
        >
          💰
        </Text>
        <View>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 20,
              color: Colors.GRAY,
            }}
          >
            Budget
          </Text>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 20,
            }}
          >
            {tripData?.budget}
          </Text>
        </View>
        <View></View>
      </View>

      <TouchableOpacity
        onPress={() => router.replace("/create-trip/generate-trip")}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 100,
          textAlign: "center",
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
          Build My Trip
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
