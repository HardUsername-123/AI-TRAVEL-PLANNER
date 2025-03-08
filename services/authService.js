import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getIdToken,
  signOut,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../config/FirebaseConfig";
import { API_URL } from "../constants/Api";
// Register user and store token
export const signUpUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await getIdToken(userCredential.user);
    console.log("My Token: ", token);
    await AsyncStorage.setItem("authToken", token);
    return { user: userCredential.user, token };
  } catch (error) {
    console.error("Sign Up Error:", error);
    return null;
  }
};

// Login user and store token
export const signInUser = async (email, password) => {
  try {
    // Sign in the user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await getIdToken(userCredential.user);

    console.log("My Token: ", token);

    // Save the token to AsyncStorage (optional, for persistence)
    await AsyncStorage.setItem("authToken", token);

    // Send the token to the backend for verification
    // const backendResponse = await fetch(`${API_URL}/verify-token-firebase`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    // if (!backendResponse.ok) {
    //   throw new Error("Backend token verification failed");
    // }

    // const backendData = await backendResponse.json();
    // console.log("Backend Response:", backendData);

    return { user: userCredential.user, token };
  } catch (error) {
    console.error("Sign In Error:", error);
    return null;
  }
};

// Logout user and remove token
export const logoutUser = async () => {
  await signOut(auth);
  await AsyncStorage.removeItem("authToken");
};

// Get stored token
export const getToken = async () => {
  return await AsyncStorage.getItem("authToken");
};
