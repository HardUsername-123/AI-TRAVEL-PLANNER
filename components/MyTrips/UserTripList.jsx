import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import UserTripCard from "./UserTripCard";
import { useRouter } from "expo-router";

export default function UserTripList({ userTrips }) {
  const latestTrip = JSON.parse(userTrips[0].tripData);

  const router = useRouter();

  console.log("lala", latestTrip);
  console.log("nono", userTrips[0]?.tripData?.country?.budget);

  const uid = userTrips[0].docId;

  const formatData = (data) => {
    return JSON.parse(data);
  };

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      {userTrips.map((trip, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() =>
              router.push({
                pathname: "/trip-details",
                params: {
                  trip: JSON.stringify(latestTrip),
                  id: trip.docId,
                  img: formatData(trip.tripData).country.landmark_image,
                  location: formatData(trip.tripData)?.country?.name,
                  startDate: formatData(trip.tripData)?.startDate,
                  endDate: formatData(trip.tripData)?.endDate,
                  travelers: formatData(trip.tripData)?.travelerCount?.title,
                  budget: formatData(trip.tripData)?.budget,
                },
              })
            }
          >
            <UserTripCard trip={trip} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
