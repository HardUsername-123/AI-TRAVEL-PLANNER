import React, { useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRouter } from "expo-router";
import { useAuth } from "../../../context/AuthContext";
import { Colors } from "../../../constants/Colors";
import { termsServices, pp } from "../../../constants/Options";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const router = useRouter();
  const { signIn } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, [navigation]);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Failed", "Email and Password are required!");
      return;
    }
    try {
      setLoading(true);
      await signIn(email, password);
      Platform.OS === "android"
        ? ToastAndroid.show("Signed in successfully!", ToastAndroid.SHORT)
        : Alert.alert("Success", "Signed in successfully!");
      router.replace("/myTrip");
    } catch (error) {
      const errorMessages = {
        "auth/invalid-email": "The email address is badly formatted.",
        "auth/wrong-password":
          "Invalid credentials. Please check your password.",
        "auth/user-not-found": "No account found with this email.",
        "auth/too-many-requests":
          "Too many failed attempts. Please try again later.",
        "auth/email-already-in-use":
          "This email is already associated with another account.",
        "auth/invalid-credential": "Invalid credentials provided.",
        "auth/weak-password":
          "The password is too weak. Please provide a stronger password.",
        "auth/network-request-failed": "No internet connection.",
      };

      Alert.alert(
        "Error",
        errorMessages[error.code] || "An error occurred during sign-up."
      );
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type) => {
    setContent(type === "terms" ? termsServices : pp);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Let's Sign You In</Text>
      <Text style={styles.subHeading}>Welcome Back</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail" size={24} color="black" />
          <TextInput
            placeholder="Enter Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed" size={24} color="black" />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            secureTextEntry={!showPassword}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Terms and Privacy Policy */}
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By logging in you agree to AI Travel Planner{" "}
          <Text style={styles.linkText} onPress={() => openModal("terms")}>
            Terms of Service
          </Text>{" "}
          and{" "}
          <Text style={styles.linkText} onPress={() => openModal("privacy")}>
            Privacy Policy
          </Text>
        </Text>
      </View>

      {/* Modal for Terms & Privacy */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {content.includes("Terms") ? "Terms of Service" : "Privacy Policy"}
          </Text>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalText}>{content}</Text>
          </ScrollView>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Sign In Button */}
      <TouchableOpacity
        onPress={handleSignIn}
        style={styles.signInButton}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity
        onPress={() => router.push("/auth/sign-up")}
        style={styles.signUpButton}
      >
        <Text style={styles.signUpButtonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    height: "100%",
    backgroundColor: Colors.WHITE,
  },
  heading: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    marginTop: 30,
  },
  subHeading: {
    fontFamily: "outfit",
    fontSize: 24,
    marginTop: 10,
    color: Colors.GRAY,
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontFamily: "outfit",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    padding: 15,
    gap: 10,
  },
  input: {
    flex: 1,
  },
  termsContainer: {
    padding: 10,
    marginTop: 15,
  },
  termsText: {
    fontFamily: "outfit",
    textAlign: "center",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalContent: {
    maxHeight: 300,
    paddingHorizontal: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "justify",
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signInButton: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 50,
    borderWidth: 1,
  },
  signUpButton: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontWeight: "bold",
  },
  signUpButtonText: {
    color: Colors.PRIMARY,
    textAlign: "center",
    fontWeight: "bold",
  },
});
