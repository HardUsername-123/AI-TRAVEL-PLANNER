import "react-native-get-random-values";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Link, router, useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import countriesData from "../../assets/data/beautiful_countries_with_landmarks.json";
import { CreateTripContext } from "../../context/CreateTripContext";

export default function SearchPlace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countriesData);
  const [loading, setLoading] = useState(false);
  const { tripData, setTripData } = useContext(CreateTripContext);

  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search",
    });
  }, [navigation]);

  useEffect(() => {
    console.log(tripData);
  }, [tripData]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = countriesData.filter((country) =>
        country.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countriesData);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.GRAY} />
        </View>
      );
    }

    if (searchQuery.length === 0 || filteredCountries.length > 0) {
      return (
        <FlatList
          data={filteredCountries}
          keyExtractor={(item) => item.iso_alpha_2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.countryItem}
              onPress={() => {
                setTripData({
                  ...tripData,
                  country: item,
                });
                console.log("Selected Country:", item.name);
                router.push("/create-trip/select-travelers");
              }}
            >
              {/* <Image
                source={{ uri: item.landmark_image }}
                style={styles.image}
              /> */}
              <View style={{ gap: 5 }}>
                <Text style={styles.countryName}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      );
    }

    return (
      <View style={styles.loadingContainer}>
        <Text style={{ fontFamily: "outfit-medium" }}>Not Found</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 75,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchQuery}
        onChangeText={handleSearch}
        autoCapitalize="none"
      />
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: "outfit",
    marginBottom: 10,
  },
  countryItem: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
    gap: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  countryName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
  },
});
