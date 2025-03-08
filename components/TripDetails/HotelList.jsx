import { Image, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { auth, db } from "../../config/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Colors } from "../../constants/Colors";
import PlannedTrip from "./PlannedTrip";
import { randomHotelImages } from "../../constants/Options";

export default function HotelList() {
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

  const tripOptions = userTrips[0]?.tripPlan?.hotelOptions;

  const dailyPlan = userTrips[0]?.tripPlan?.dailyPlan;

  const getRandomHotelImage = () => {
    return randomHotelImages[
      Math.floor(Math.random() * randomHotelImages.length)
    ];
  };

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
        }}
      >
        🏨 Hotel recommendation
      </Text>

      <FlatList
        data={tripOptions}
        style={{
          marginTop: 8,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              marginRight: 20,
              width: 180,
            }}
          >
            <Image
              source={{ uri: getRandomHotelImage() }}
              style={{
                width: 180,
                height: 120,
                borderRadius: 15,
              }}
            />
            <View
              style={{
                padding: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  fontSize: 17,
                  flex: 1,
                }}
              >
                {item.hotelName}
              </Text>
              <View
              // style={{
              //   display: "flex",
              //   flexDirection: "row",
              //   justifyContent: "space-between",
              // }}
              >
                <Text
                  style={{
                    fontFamily: "outfit",
                  }}
                >
                  ⭐ {item.rating}
                </Text>
                <Text
                  style={{
                    fontFamily: "outfit",
                  }}
                >
                  💰 {item.price}
                </Text>
              </View>
            </View>
          </View>
        )}
      />

      {/**Trip Day Planner Info*/}
      <PlannedTrip dailyPlan={dailyPlan} />
    </View>
  );
}

const styles = StyleSheet.create({});
