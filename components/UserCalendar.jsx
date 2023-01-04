import { Image, StyleSheet, View } from "react-native";
import { useContext, useMemo, useState } from "react";
import {
  Button,
  Chip,
  Text,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CalendarList } from "react-native-calendars";
import moment from "moment";
import {
  collection,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, fs } from "../firebaseConfig";
import AuthContext from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";
import { useCollection } from "react-firebase-hooks/firestore";
import axios from "axios";

const today = moment().format("YYYY-MM-DD");

const times = [
  ["7:00 AM", "9:00 AM"],
  ["10:00 AM", "12:00 PM"],
  ["1:00 PM", "3:00 PM"],
  ["3:00 PM", "5:00 PM"],
  ["5:00 PM", "7:00 PM"],
];

const purposes = ["Groom", "Vaccine", "Checkup", "Surgery"];

const UserCalendar = () => {
  const { user, pets, admins } = useContext(AuthContext);
  const { colors } = useTheme();
  const [selectedPets, setSelectedPet] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [day, setDay] = useState(today);
  const [selectedTime, setSelectedTime] = useState(null);
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  const appointmentsColRef = collection(fs, "appointments");
  const appointmentsQuery = query(
    appointmentsColRef,
    where("userId", "==", auth.currentUser.uid),
    where("status", "not-in", ["Deleted", "Cancelled", "Completed"]),
    orderBy("status"),
    orderBy("createdAt")
  );
  const [appointments, loading] = useCollection(appointmentsQuery);
  const allAppointmentsQuery = query(
    appointmentsColRef,
    where("status", "not-in", ["Deleted", "Cancelled"]),
    orderBy("status"),
    orderBy("createdAt")
  );
  const [allAppointments, loadingAllAppointments] =
    useCollection(allAppointmentsQuery);

  const appointmentsMarks = useMemo(() => {
    if (appointments?.docs.length > 0) {
      return appointments?.docs
        .filter((apt) => apt.status !== "Cancelled")
        .reduce((acc, doc) => {
          let statusColor = "#50cebb";
          switch (doc.data().status) {
            case "Pending":
              statusColor = colors.warning;
              break;
            case "Approved":
              statusColor = colors.success;
              break;
            case "Cancelled":
              statusColor = colors.error;
              break;
            default:
              break;
          }
          acc[doc.data().day] = {
            selected: true,
            marked: true,
            selectedColor: statusColor,
          };
          return acc;
        }, {});
    }
    return [];
  }, [loading]);

  const handleDayPress = (day) => {
    setSelectedTime(null);
    setDay(day.dateString);
  };

  const handleSelectedPets = (id) => {
    const isSelected = selectedPets.findIndex((p) => p === id);
    if (isSelected !== -1) {
      const newSelected = selectedPets.filter((p) => p !== id);
      setSelectedPet(newSelected);
    } else {
      setSelectedPet((curr) => [...curr, id]);
    }
  };

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleSubmit = async () => {
    if (purpose === "" || selectedPets.length === 0 || !selectedTime) return;
    const data = {
      userId: user.uid,
      photoURL: user.photoURL,
      email: user.email,
      gender: user?.gender || null,
      fullname: user.firstname + " " + user.lastname,
      day,
      time: selectedTime[0] + " - " + selectedTime[1],
      petIds: selectedPets,
      purpose,
      description,
      createdAt: serverTimestamp(),
      status: "Pending",
    };
    navigation.navigate("AddAppointmentLoading", data);

    if (admins && !admins.empty) {
      const notifPromises = admins.docs.map((doc) => {
        return axios.post("https://exp.host/--/api/v2/push/send", {
          to: doc.data().pushToken,
          title: `New Appointment`,
          body: `${user.firstname} ${
            user.lastname
          } set an appointment on ${moment(day).format("LL")} - ${
            selectedTime[0]
          } to ${selectedTime[1]}.`,
        });
      });
      await Promise.all(notifPromises);
    }
  };

  if (loading || loadingAllAppointments) {
    return <Spinner visible={true} color={colors.primary} />;
  }

  return (
    <>
      <View style={styles.header}>
        <Text variant="titleMedium">Select Date</Text>
      </View>
      <CalendarList
        horizontal={true}
        pagingEnabled={true}
        minDate={today}
        onDayPress={handleDayPress}
        markedDates={{
          [day]: {
            selected: true,
            marked: true,
            dotColor: "#50cebb",
          },
          ...appointmentsMarks,
        }}
      />
      <View style={styles.header}>
        <Text variant="titleMedium">Select Time</Text>
      </View>
      <View style={styles.timeContainer}>
        {times.map((time, idx) => {
          const alreadySet = allAppointments.docs.findIndex(
            (doc) =>
              doc.data().day === day &&
              doc.data().time === `${time[0]} - ${time[1]}`
          );
          return (
            <View style={styles.time} key={idx}>
              <TouchableRipple
                disabled={alreadySet !== -1}
                style={[
                  styles.timeBtn,
                  {
                    backgroundColor:
                      alreadySet !== -1
                        ? "rgba(0, 0, 0, 0.12)"
                        : selectedTime === time
                        ? "#50cebb"
                        : "#fff",
                  },
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={{
                    color: alreadySet !== -1 ? "rgba(0, 0, 0, 0.26)" : "#000",
                  }}
                  variant="titleSmall"
                >
                  {time[0]} - {time[1]}
                </Text>
              </TouchableRipple>
            </View>
          );
        })}
      </View>

      <View style={styles.header}>
        <Text variant="titleMedium">Select your Pet(s)</Text>
      </View>
      <View style={styles.chipContainer}>
        {pets.docs.map((doc) => {
          const isSelected = selectedPets.findIndex((p) => p === doc.id);
          return (
            <Chip
              key={doc.id}
              style={styles.chip}
              onPress={() => handleSelectedPets(doc.id)}
              mode="outlined"
              showSelectedOverlay
              avatar={
                doc.data()?.petProfilePic ? (
                  <Image source={{ uri: doc.data().petProfilePic }} />
                ) : (
                  <MaterialCommunityIcons name="paw" size={24} />
                )
              }
              selected={isSelected !== -1}
              textStyle={{ textTransform: "capitalize" }}
            >
              {doc.data().nickname}
            </Chip>
          );
        })}
      </View>

      <View style={styles.header}>
        <Text variant="titleMedium">Purpose</Text>
      </View>
      <View style={styles.chipContainer}>
        {purposes.map((p, idx) => (
          <Chip
            key={idx}
            style={styles.chip}
            onPress={() => setPurpose(p)}
            mode="outlined"
            showSelectedOverlay
            selected={purpose === p}
            textStyle={{ textTransform: "capitalize" }}
          >
            {p}
          </Chip>
        ))}
      </View>

      <View style={styles.header}>
        <Text variant="titleMedium">Description</Text>
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <TextInput
          mode="outlined"
          multiline
          value={description}
          label="Description (Optional)"
          placeholder="Enter description of your appointment."
          onChangeText={handleDescriptionChange}
          numberOfLines={3}
        />
      </View>
      <View style={styles.submitBtn}>
        <Button onPress={handleSubmit} mode="contained">
          Set Appointment
        </Button>
      </View>
    </>
  );
};

export default UserCalendar;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginTop: 16,
    marginBottom: 4,
  },
  timeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  timeBtn: {
    alignItems: "center",
    padding: 8,
    margin: 4,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 4,
    minWidth: 160,
  },
  time: {
    width: "50%",
  },
  submitBtn: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  chipContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
    paddingHorizontal: 16,
  },
  chip: {
    margin: 4,
    minWidth: 80,
  },
});
