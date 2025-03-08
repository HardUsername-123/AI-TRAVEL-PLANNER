import {
  FlatList,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigation, useRouter } from "expo-router";
import { SelectBudgetOptions } from "../../../constants/Options";
import OptionCard from "../../../components/CreateTrip/OptionCard";
import { Colors } from "../../../constants/Colors";
import { CreateTripContext } from "../../../context/CreateTripContext";

export default function SelectBudget() {
  const [selectOption, setSelectOption] = useState();
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
    selectOption &&
      setTripData({
        ...tripData,
        budget: selectOption?.title,
      });
  }, [selectOption]);

  const onClickContinue = () => {
    if (!selectOption) {
      ToastAndroid.show("Select Your Budget", ToastAndroid.LONG);
      return;
    }
    router.push("/create-trip/review-trip");
  };
  return (
    <View
      style={{
        paddingTop: 75,
        padding: 25,
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
        Budget
      </Text>
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
          Choose spending habbits for your trip
        </Text>

        <FlatList
          data={SelectBudgetOptions}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectOption(item)}
              style={{ marginVertical: 10 }}
            >
              <OptionCard option={item} selectOption={selectOption} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <TouchableOpacity
        onPress={() => onClickContinue()}
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
