import { Alert, Platform } from "react-native";

export default function ShowAlert(title, message) {
  if (Platform.OS === "web") {
    // Use the browser's alert
    window.alert(`${title}\n${message}`);
  } else {
    // Use React Native's Alert
    Alert.alert(title, message);
  }
}
