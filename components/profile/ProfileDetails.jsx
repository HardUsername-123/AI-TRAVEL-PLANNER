import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";
import { useRouter } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { CirclePlus, Lock, LogOut, Plane } from "lucide-react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ProfileDetails({ user, logout }) {
  const router = useRouter();
  const [photoURL, setPhotoURL] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.photoURL) {
        setPhotoURL(currentUser.photoURL);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.profileContainer}>
        <Avatar.Image size={70} source={{ uri: photoURL }} />
        <Text style={styles.welcomeText}>
          Welcome, {user ? user.displayName || "None" : "Guest"}
        </Text>
      </View>

      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => router.push("(tabs)/myTrip")}>
            <View style={styles.cell}>
            <Text
             style={{
              marginBottom: 5,
            }}
            >✈️</Text>
              <Text style={styles.font}>My Trips</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/create-trip")}>
            <View style={styles.cell}>
            <Text
             style={{
              marginBottom: 5,
            }}
            >➕</Text>
              
              <Text style={styles.font}>Add Trip</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => router.push("/change-pass")}>
            <View style={styles.cell}>
            <Text
             style={{
              marginBottom: 5,
            }}
            >🔒</Text>          
              <Text style={styles.font}>Change pass</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={logout}>
            <View style={styles.cell}>
            <AntDesign name="logout" size={24} color="black" />
              <Text style={styles.font}>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "outfit-bold",
    fontSize: 30,
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 75,
  },
  welcomeText: {
    fontFamily: "outfit-medium",
    fontSize: 17,
    marginTop: 10,
  },
  container: {
    marginHorizontal: "auto",
    gap: 20,
    marginTop: 30,
  },
  row: {
    flexDirection: "row",
    gap: 20,
  },
  cell: {
    width: 150,
    height: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 15,
  },
  font: {
    fontFamily: "outfit-medium",
  },
});
