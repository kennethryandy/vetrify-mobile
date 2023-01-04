import { Image, SafeAreaView, StyleSheet } from "react-native";
import { useEffect } from "react";
import { Text, useTheme } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addDoc, collection } from "firebase/firestore";
import { fs } from "../firebaseConfig";

const AddAppointmentLoading = () => {
  const { colors } = useTheme();
  const { params } = useRoute();
  const navigation = useNavigation();

  const appointmentsColRef = collection(fs, "appointments");

  useEffect(() => {
    addDoc(appointmentsColRef, params)
      .then(() => {
        navigation.navigate("Appointment");
      })
      .catch(() => {
        navigation.navigate("Appointment");
      });
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.primary }]}
    >
      <Text variant="titleLarge">Setting up appointment...</Text>
      <Image style={styles.loader} source={require("../assets/paws.gif")} />
    </SafeAreaView>
  );
};

export default AddAppointmentLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    height: 280,
    width: 280,
  },
});
