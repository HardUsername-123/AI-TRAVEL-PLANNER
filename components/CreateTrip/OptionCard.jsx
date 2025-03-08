import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function OptionCard({ option, selectOption }) {
  return (
    <View
      style={[
        {
          padding: 25,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: Colors.LIGHTGRAY,
          borderRadius: 15,
        },
        selectOption?.id == option?.id && { borderWidth: 2 },
      ]}
    >
      <View>
        <Text style={{ fontSize: 20, fontFamily: "outfit-bold" }}>
          {option?.title}
        </Text>
        <Text
          style={{ fontSize: 17, fontFamily: "outfit", color: Colors.GRAY }}
        >
          {option?.desc}
        </Text>
      </View>
      <Text style={{ fontSize: 35 }}>{option.icon}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
