import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { auth } from "../../config/FirebaseConfig";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { Lock } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Failed", "All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Failed", "New passwords do not match.");
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Failed", "No user is logged in.");
      return;
    }

    try {
      setLoading(true)
      // Create credential for reauthentication
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      // Reauthenticate user
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      Alert.alert("Success", "Password updated successfully.");

      router.push("/(tabs)/myTrip");
    } catch (error) {
      console.error("Password change error:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false)
    }
  };

  const [showPasswordc, setShowPasswordc] = useState(true);
  const [showPasswordn, setShowPasswordn] = useState(true);
  const [showPasswordcon, setShowPasswordcon] = useState(true);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    if (showPasswordc === true) {
      setShowPasswordc(false);
    } else if (showPasswordc === false) {
      setShowPasswordc(true);
    }
  };

  const togglePasswordVisibilityn = () => {
    if (showPasswordn === true) {
      setShowPasswordn(false);
    } else if (showPasswordn === false) {
      setShowPasswordn(true);
    }
  };

  const togglePasswordVisibilitycon = () => {
    if (showPasswordcon === true) {
      setShowPasswordcon(false);
    } else if (showPasswordcon === false) {
      setShowPasswordcon(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change your Password?</Text>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text style={{ fontFamily: "outfit" }}>Current Password</Text>
        <View style={styles.inputStytle}>
          <Ionicons name="lock-closed" size={24} color="black" />
          <TextInput
            secureTextEntry={showPasswordc}
                style={[styles.input, { flex: 1 }]}
            placeholder="Enter Current Password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={showPasswordc === true ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text style={{ fontFamily: "outfit" }}>New Password</Text>
        <View style={styles.inputStytle}>
          <Ionicons name="lock-closed" size={24} color="black" />
          <TextInput
            secureTextEntry={showPasswordn}
                style={[styles.input, { flex: 1 }]}
            placeholder="Enter New Password"
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibilityn}>
            <Ionicons
              name={showPasswordn === true ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text style={{ fontFamily: "outfit" }}>Password</Text>
        <View style={styles.inputStytle}>
          <Ionicons name="lock-closed" size={24} color="black" />
          <TextInput
            secureTextEntry={showPasswordcon}
                style={[styles.input, { flex: 1 }]}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibilitycon}>
            <Ionicons
              name={showPasswordcon === true ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
          onPress={handleChangePassword}
          style={styles.button}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Save Change</Text>
          )}
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    height: "100%",
    backgroundColor: Colors.WHITE,
    paddingTop: 75,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    marginTop: 30,
    marginBottom: 50,
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontFamily: "outfit",
  },
  inputStytle: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderRadius: 15,
      borderColor: Colors.GRAY,
      padding: 15,
      gap: 10,
  },
  input: {
    flex: 1
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 50,
    borderWidth: 1,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
  },
});
