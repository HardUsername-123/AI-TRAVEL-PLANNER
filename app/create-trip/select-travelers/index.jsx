import {
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { SelectTravelesList } from "../../../constants/Options";
import OptionCard from "../../../components/CreateTrip/OptionCard";
import countriesData from "../../../assets/data/beautiful_countries_with_landmarks.json";
import { useContext } from "react";
import { CreateTripContext } from "../../../context/CreateTripContext";

export default function Travelers() {
  const [selectedTraveler, setSelectedTraveler] = useState();
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

  useEffect(() => {
    setTripData({ ...tripData, travelerCount: selectedTraveler });
  }, [selectedTraveler]);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  const onClickContinue = () => {
    if (!selectedTraveler) {
      ToastAndroid.show("Select Your Traveler", ToastAndroid.LONG);
      return;
    }
    router.push("/create-trip/select-date");
  };

  return (
    <View
      style={{
        padding: 25,
        height: "100%",
        backgroundColor: Colors.WHITE,
        paddingTop: 75,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        Who's Traveling
      </Text>
      <View>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 23 }}>
          Choose your travelers
        </Text>
        <FlatList
          data={SelectTravelesList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedTraveler(item)}
              style={{ marginVertical: 10 }}
            >
              <OptionCard option={item} selectOption={selectedTraveler} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <TouchableOpacity
        onPress={onClickContinue}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 20,
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
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
