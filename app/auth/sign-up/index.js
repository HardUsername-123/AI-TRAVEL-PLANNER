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
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth } from "../../../config/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Colors } from "../../../constants/Colors";
import { Checkbox } from "react-native-paper";
import axios from "axios";
import { API_URL } from "../../../constants/Api";
import { useAuth } from "../../../context/AuthContext";
import { pp, termsServices } from "../../../constants/Options";
import Modal from "react-native-modal";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const router = useRouter();
  const { signUp } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, [navigation]);

  const handleSignUp = async () => {
    if (!fullName || !email || !password) {
      Alert.alert("Failed", "All fields are required!");
      return;
    }

    if (!checked) {
      Alert.alert(
        "Failed",
        "Please agree to the Terms of Service and Privacy Policy."
      );
      return;
    }

    try {
      setLoading(true);
      await signUp(fullName, email, password);

      if (Platform.OS === "android") {
        ToastAndroid.show("Account created successfully!", ToastAndroid.SHORT);
      } else {
        Alert.alert("Success", "Signed in successfully!");
      }

      router.push("/auth/sign-in");
    } catch (error) {
      console.log(error);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Account</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputStyle}>
          <Ionicons name="person" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Enter Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputStyle}>
          <Ionicons name="mail" size={24} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputStyle}>
          <Ionicons name="lock-closed" size={24} color="black" />
          <TextInput
            secureTextEntry={showPassword}
            style={[styles.input, { flex: 1 }]}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
          />
          <Ionicons
            onPress={togglePasswordVisibility}
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </View>
      </View>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked ? "checked" : "unchecked"}
          onPress={() => setChecked(!checked)}
        />
        <Text style={styles.checkboxText}>
          I agree to the{" "}
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

      <TouchableOpacity
        onPress={handleSignUp}
        style={styles.button}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/auth/sign-in")}
        style={styles.signInButton}
      >
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    height: "100%",
    backgroundColor: Colors.WHITE,
  },
  header: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    marginTop: 30,
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontFamily: "outfit",
  },
  inputStyle: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  checkboxText: {
    fontFamily: "outfit",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 50,
    borderWidth: 1,
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
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
  },
  signInButton: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginTop: 20,
    borderWidth: 1,
  },
  signInText: {
    color: Colors.PRIMARY,
    textAlign: "center",
  },
});
