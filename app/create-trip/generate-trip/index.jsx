import { Image, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { CreateTripContext } from "../../../context/CreateTripContext";
import { Colors } from "../../../constants/Colors";
import { AI_PROMPT } from "../../../constants/Options";
import { chatSession } from "../../../config/AiModel";
import { auth, db } from "../../../config/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import LottieView from "lottie-react-native";

export default function GenerateTrip() {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);

  const hasGeneratedTrip = useRef(false);

  const navigation = useNavigation();
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    if (tripData && !hasGeneratedTrip.current) {
      generateAiTrip();
      hasGeneratedTrip.current = true;
    }
  }, [tripData]);

  const generateAiTrip = async () => {
    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      tripData?.country?.name
    )
      .replace("{totalDays}", tripData.totalNoOfDate)
      .replace("{totalNight}", tripData.totalNoOfDate - 1)
      .replace("{traveler}", tripData.travelerCount?.title)
      .replace("{budget}", tripData.budget);

    console.log(FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripResponse = JSON.parse(result.response.text());

      const docId = Date.now().toString();

      await setDoc(doc(db, "UserTrips", docId), {
        userEmail: user.email,
        tripPlan: tripResponse,
        tripData: JSON.stringify(tripData),
        docId: docId,
      });

      router.push("(tabs)/myTrip");
    } catch (error) {
      console.error("Error generating trip:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
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
          textAlign: "center",
        }}
      >
        Please Wait...
      </Text>

      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
          textAlign: "center",
          marginTop: 40,
        }}
      >
        We are working to generate your dream trip
      </Text>
      <LottieView
        source={require("../../../assets/animation/welcome.json")}
        autoPlay
        loop
        style={{
          width: "100%",
          height: 300,
        }}
      />
      <Text
        style={{
          fontFamily: "outfit",
          color: Colors.GRAY,
          textAlign: "center",
        }}
      >
        Do not go back
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({});
