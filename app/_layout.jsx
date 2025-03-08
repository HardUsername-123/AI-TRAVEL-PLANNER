import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { CreateTripContext } from "../context/CreateTripContext";
import { useEffect, useState } from "react";
import { AuthProvider } from "../context/AuthContext";
import { getItem } from "../constants/storage";

export default function RootLayout() {
  const [tripData, setTripData] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });

  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       const token = await getItem("authToken");

  //       if (token) {
  //         // Token exists, navigate to Home
  //         router.replace("/(tabs)/myTrip");
  //       } else {
  //         // No token, navigate to Login
  //         router.replace("/");
  //       }
  //     } catch (error) {
  //       console.error("Error checking token:", error);
  //       router.replace("/");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   checkToken();
  // }, []);
  return (
    <AuthProvider>
      <CreateTripContext.Provider value={{ tripData, setTripData }}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </CreateTripContext.Provider>
    </AuthProvider>
  );
}
