import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";

export default function PlannedTrip({ dailyPlan }) {
  console.log("..", dailyPlan);

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontFamily: "outfit-bold",
        }}
      >
        🏕️ Plan Details
      </Text>
      <View>
        {/* Iterate over the daily plan excluding bestTimeToVisit */}
        {Object.entries(dailyPlan ?? {})
          .filter(([key]) => key !== "bestTimeToVisit")
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([day, schedule]) => (
            <View key={day}>
              {/* Display day name */}
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  fontSize: 20,
                  marginTop: 20,
                }}
              >
                🌞 {day}
              </Text>

              {/* Render the schedule for each time slot */}
              {Object.entries(schedule ?? {})
                .filter(([key]) => key !== "bestTimeToVisit")
                .map(([time, details]) => (
                  <View
                    key={time}
                    style={{
                      marginTop: 20,
                      backgroundColor: Colors.LIGHTGRAY,
                      padding: 10,
                      borderRadius: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "outfit-bold",
                      }}
                    >{`${time.charAt(0).toUpperCase() + time.slice(1)}:`}</Text>
                    <Text
                      style={{
                        fontFamily: "outfit",
                      }}
                    >
                      Activity: {details?.activity ?? "N/A"}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "outfit",
                      }}
                    >
                      Description: {details?.description ?? "N/A"}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "outfit",
                      }}
                    >
                      ⏱️ {details?.time ?? "N/A"}
                    </Text>
                  </View>
                ))}
            </View>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
