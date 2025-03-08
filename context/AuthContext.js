// AuthContext.js
// import React, { createContext, useContext, useState, useEffect } from "react";
// import * as SecureStore from "expo-secure-store";
// import { auth } from "../config/FirebaseConfig";
// import { signInWithEmailAndPassword, signOut } from "firebase/auth";
// import axios from "axios";
// import { API_URL } from "../constants/Api";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         const token = await SecureStore.getItemAsync("authToken");

//         if (token) {
//           // Validate the token with the backend
//           const response = await fetch(`${API_URL}/validate-token`, {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           if (response.ok) {
//             setUser({ token });
//             console.log("Token is Valid", token);
//           } else {
//             // Token is invalid, remove it from SecureStore
//             await SecureStore.deleteItemAsync("authToken");
//             setUser(null);
//           }
//         } else {
//           // No token found, user is not logged in
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Failed to check login status", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkLoginStatus();
//   }, []);

//   const login = async (email, password) => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       //   const = auth.credential()

//       const response = await axios.post(`${API_URL}/login`, {
//         email,
//         password,
//       });
//       const { token } = response.data;

//       await SecureStore.setItemAsync("authToken", token);
//       setUser({ token });

//       return true;
//     } catch (error) {
//       console.error("Login failed", error);
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       await signOut(auth);
//       await SecureStore.deleteItemAsync("authToken");
//       setUser(null);
//     } catch (error) {
//       console.error("Logout failed", error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { auth } from "../config/FirebaseConfig";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import axios from "axios";
import { API_URL } from "../constants/Api";
import { setItem, getItem, deleteItem } from "../constants/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email, password) => {
    try {
      const firebaseUserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = firebaseUserCredential.user;
      console.log("User", firebaseUser);

      // const response = await axios.post(`${API_URL}/login`, {
      //   email,
      //   password,
      // });
      // const { token, user } = response.data;

      // await setItem("authToken", token);
      // setUser({ token, user });

      return true;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  // const signUp = async (email, password) => {
  //   try {
  //     await createUserWithEmailAndPassword(auth, email, password);

  //     return true;
  //   } catch (error) {
  //     console.error("Login failed", error);
  //     throw error;
  //   }
  // };

  const signUp = async (fullName, email, password) => {
    try {
      // Generate a random avatar URL
      const randomAvatarUrl = `https://api.dicebear.com/7.x/identicon/png?seed=${Math.random()
        .toString(36)
        .substring(7)}`;

      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user profile with random avatar
      await updateProfile(user, {
        displayName: fullName,
        photoURL: randomAvatarUrl,
      });

      return true;
    } catch (error) {
      console.error("Signup failed", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);

      // await deleteItem("authToken");
      // setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
