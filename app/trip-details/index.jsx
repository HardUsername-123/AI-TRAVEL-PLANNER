import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import moment from "moment";
import FlightInfo from "../../components/TripDetails/FlightInfo";
import HotelList from "../../components/TripDetails/HotelList";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../../config/FirebaseConfig";

export default function TripDetails() {
  const [tripDetails, setTripDetails] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [userTrips, setUserTrips] = useState([]);
  const hasFetchedTrips = useRef(false); // Prevents multiple fetch calls

  const navigation = useNavigation();
  const { trip, id, img, location, startDate, endDate, travelers, budget } =
    useLocalSearchParams();
  const user = auth.currentUser;

  console.log(";;;", startDate, endDate, travelers);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });

    if (trip) {
      try {
        setTripDetails(JSON.parse(trip));
      } catch (error) {
        console.error("Error parsing trip data:", error);
      }
    }
  }, [trip]);

  useEffect(() => {
    if (user && !hasFetchedTrips.current) {
      hasFetchedTrips.current = true;
    }
  }, [user]);

  if (!tripDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading trip details...</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {tripDetails?.country?.landmark_image ? (
        <Image source={{ uri: img }} style={styles.image} />
      ) : (
        <Text>No Image Available</Text>
      )}

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{location}</Text>

        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {moment(startDate).format("DD MM yyyy")}
          </Text>
          <Text style={styles.dateText}> to </Text>
          <Text style={styles.dateText}>
            {moment(endDate).format("DD MM yyyy")}
          </Text>
        </View>

        <Text style={styles.travelerCount}>🚘 {travelers}</Text>
        <View style={{ marginTop: 10 }}></View>
        <Text style={styles.travelerCount}>💰 {budget}</Text>

        {/* Flight Info */}
        <FlightInfo />

        {/* Hotel List */}
        <HotelList />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  image: {
    width: "100%",
    height: 330,
  },
  detailsContainer: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    height: "100%",
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 25,
    fontFamily: "outfit-bold",
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },
  dateText: {
    fontFamily: "outfit-medium",
    fontSize: 14,
    color: Colors.GRAY,
  },
  travelerCount: {
    fontFamily: "outfit",
    fontSize: 17,
    color: Colors.GRAY,
  },
});
