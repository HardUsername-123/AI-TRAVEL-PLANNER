import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";

export default function UserTripCard({ trip }) {
  const formatData = (data) => {
    return JSON.parse(data);
  };
  console.log(trip);
  return (
    <View
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      <Image
        source={{ uri: formatData(trip.tripData).country.landmark_image }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 15,
        }}
      />

      <View>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 18,
          }}
        >
          {trip.tripPlan?.tripDetails?.location}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 14,
            color: Colors.GRAY,
          }}
        >
          {moment(formatData(trip.tripData).startDate).format("DD MM yyyy")}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 14,
            color: Colors.GRAY,
          }}
        >
          Travelling: {formatData(trip.tripData).travelerCount.title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
