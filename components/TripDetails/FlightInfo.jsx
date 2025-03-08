import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { auth, db } from "../../config/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Colors } from "../../constants/Colors";

export default function FlightInfo() {
  const [loading, setLoading] = useState(false);
  const [userTrips, setUserTrips] = useState([]);

  const hasGeneratedTrip = useRef(false);
  const user = auth.currentUser;
  const router = useRouter();

  const { id } = useLocalSearchParams();
  console.log("lala", id);

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
      where("userEmail", "==", user?.email),
      where("docId", "==", id)
    );
    const querySnapshot = await getDocs(q);
    console.log(q);

    querySnapshot.forEach((doc) => {
      console.log("...", doc.id, "==", doc.data());
      setUserTrips((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };
  return (
    <View
      style={{
        marginTop: 20,
        backgroundColor: Colors.LIGHTGRAY,
        padding: 10,
        borderRadius: 15,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          ✈️ Flight
        </Text>
        <TouchableOpacity
          onPress={() =>
            router.push(
              "https://www.cheapflights.com.ph/?lang=en&tags=l%3Ao_cy-194_t_rt_v_f,t%3A336&skipapp=true&gclid=Cj0KCQiA4-y8BhC3ARIsAHmjC_GbY-q1GnsvxYLHJslLEtjTwGGmPuRvCbbiqQf6lgyQZ_RLi-uP83IaAj-YEALw_wcB"
            )
          }
          style={{
            backgroundColor: Colors.PRIMARY,
            padding: 5,
            width: 100,
            borderRadius: 7,
            marginTop: 7,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "outfit",
              color: Colors.WHITE,
            }}
          >
            Book Here
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 17,
          marginTop: 7,
        }}
      >
        Airline: Details{" "}
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 17,
        }}
      >
        Price:{" "}
        {userTrips[0]?.tripPlan?.flightDetails?.exampleFlight?.estimatedPrice}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
