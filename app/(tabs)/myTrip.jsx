import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import StartNewTripCard from "../../components/MyTrips/StartNewTripCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/FirebaseConfig";
import UserTripList from "../../components/MyTrips/UserTripList";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { getItem } from "../../constants/storage";
import { useAuth } from "../../store/authStorage";

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  const hasGeneratedTrip = useRef(false);
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    if (user && !hasGeneratedTrip.current) {
      GetMyTrips();
      hasGeneratedTrip.current = true;
    }
  }, [user]);

  const GetMyTrips = async () => {
    setLoading(true);

    const q = query(
      collection(db, "UserTrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log("...", doc.id, "==", doc.data());
      setUserTrips((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };
  console.log(userTrips);

  // const token = getItem("authToken");
  // console.log("Token", token);

  // const logout = useAuth((state) => state.logout);

  // const userA =

  return (
    <ScrollView
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: "500%",
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 35,
          }}
        >
          My Trips
        </Text>
        <TouchableOpacity onPress={() => router.push("/create-trip")}>
          <Ionicons name="add-circle" size={50} color="black" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        </View>
      ) : userTrips?.length === 0 ? (
        <StartNewTripCard />
      ) : (
        <UserTripList userTrips={userTrips} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
