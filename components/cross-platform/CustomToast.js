import { Alert, Platform, ToastAndroid } from "react-native";

export default function CustomToast({ title, message }) {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert(title, message);
  }
}
