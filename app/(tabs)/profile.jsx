// Profile.js
import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useNavigation, useRouter } from "expo-router";
import axios from "axios";
import { API_URL } from "../../constants/Api";
import ProfileDetails from "../../components/profile/ProfileDetails";
import { Colors } from "../../constants/Colors";
import { auth } from "../../config/FirebaseConfig";

const Profile = () => {
  const { logout } = useAuth();

  const user = auth.currentUser;

  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <View
      style={{
        padding: 25,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      <ProfileDetails user={user} logout={handleLogout} />
    </View>
  );
};

export default Profile;
