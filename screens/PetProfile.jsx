import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import _ from "lodash";
import {
  Appbar,
  Avatar,
  Button,
  DataTable,
  Divider,
  List,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import moment from "moment";
import { collection, orderBy, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { fs } from "../firebaseConfig";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

const PetProfile = ({ route, navigation }) => {
  const { pet } = route.params;
  const { colors } = useTheme();

  const medRecordRef = collection(fs, "medical_records");
  const medRecordQuery = query(
    medRecordRef,
    where("petId", "==", pet.id),
    orderBy("createdAt", "desc")
  );
  const [medicalRecords, loadingRecords] = useCollection(medRecordQuery);

  const groomRef = collection(fs, "groom_records");
  const groomQuery = query(
    groomRef,
    where("petId", "==", pet.id),
    orderBy("createdAt", "desc")
  );
  const [groomRecords, loadingGroom] = useCollection(groomQuery);

  const vaccineRef = collection(fs, "vaccine_records");
  const vaccineQuery = query(
    vaccineRef,
    where("petId", "==", pet.id),
    orderBy("createdAt", "desc")
  );
  const [vaccineRecords, loadingVaccing] = useCollection(vaccineQuery);

  const editProfileHandler = () => {
    navigation.navigate("EditPetProfile", { pet });
  };

  if (loadingRecords || loadingGroom || loadingVaccing) {
    return <Spinner visible color={colors.primary} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header mode="small">
        <Appbar.BackAction onPress={navigation.goBack} />
      </Appbar.Header>
      <View
        style={[styles.profileHeader, { backgroundColor: colors.tertiary }]}
      >
        {pet?.petProfilePic ? (
          <Avatar.Image
            style={{ alignSelf: "center", marginTop: 50 }}
            size={100}
            source={{ uri: pet?.petProfilePic }}
          />
        ) : (
          <Avatar.Icon
            icon="paw"
            size={100}
            style={{ alignSelf: "center", marginTop: 50 }}
          />
        )}
        <Text
          variant="headlineMedium"
          style={{ alignSelf: "center", marginTop: 10, fontWeight: "bold" }}
        >
          {_.capitalize(pet?.nickname)}
        </Text>
        <Text
          variant="labelMedium"
          style={{ alignSelf: "center", marginBottom: 8 }}
        >
          {pet?.breed} - {_.capitalize(pet?.animalType)}
        </Text>
        <Button
          mode="contained"
          style={{
            width: 150,
            alignSelf: "center",
            marginTop: 5,
            backgroundColor: "#6eab4d",
            marginBottom: 20,
          }}
          onPress={editProfileHandler}
        >
          Edit Pet
        </Button>
      </View>
      <View style={{ flex: 1, borderRadius: 8 }}>
        <Tab.Navigator
          screenOptions={{
            lazy: true,
            tabBarActiveTintColor: "black",
            tabBarIndicatorStyle: { backgroundColor: "#e74c3c" },
            tabBarLabelStyle: { fontSize: 12, textTransform: "capitalize" },
          }}
          style={{ flex: 1, height: 650 }}
        >
          <Tab.Screen
            name="Basic Info"
            component={PetDetails}
            initialParams={{ pet }}
          />
          <Tab.Screen
            name="Records"
            component={Records}
            initialParams={{ medicalRecords, groomRecords, vaccineRecords }}
          />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default PetProfile;

function PetDetails({ route }) {
  const { pet } = route.params;
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      <View>
        <List.Section>
          <List.Subheader>Pet Details</List.Subheader>
          <List.Item
            title="Nickname"
            left={() => <List.Icon icon="paw" />}
            description={pet?.nickname}
          />
          <List.Item
            title="Type"
            left={() => <List.Icon icon="paw" />}
            description={_.capitalize(pet?.animalType)}
          />
          <List.Item
            title="Breed"
            left={() => <List.Icon icon="paw" />}
            description={pet?.breed}
            descriptionStyle={{ textTransform: "capitalize" }}
          />
          {pet.birthDate && (
            <>
              <List.Item
                title="Birth date"
                left={() => <List.Icon icon="calendar" />}
                description={moment(pet.birthDate.toDate()).format("LL")}
              />
              <List.Item
                title="Age"
                left={() => <List.Icon icon="calendar" />}
                description={moment().diff(
                  moment(pet.birthDate.toDate()),
                  "year"
                )}
              />
            </>
          )}
          <List.Item
            title="Gender"
            left={() => (
              <List.Icon
                icon={
                  pet?.gender === "Female" ? "gender-female" : "gender-male"
                }
              />
            )}
            description={pet?.gender || "Male"}
          />

          <List.Item
            title="Status"
            left={() => <List.Icon icon="information" />}
            description={pet?.status}
          />
        </List.Section>
      </View>
    </ScrollView>
  );
}

function Records({ route }) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { medicalRecords, groomRecords, vaccineRecords } = route.params;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ padding: 16, flex: 1 }}
    >
      <View style={{ marginBottom: 24 }}>
        <Text
          variant="titleSmall"
          style={{ marginBottom: 8, fontWeight: "600" }}
        >
          Vaccine History
        </Text>
        {vaccineRecords.empty ? (
          <View>
            <Text style={{ textAlign: "center", marginBottom: 8 }}>
              No records yet.
            </Text>
            <TouchableRipple
              onPress={() => navigation.navigate("SetAppointments")}
            >
              <Text style={{ color: colors.primary, textAlign: "center" }}>
                Add an appointment.
              </Text>
            </TouchableRipple>
          </View>
        ) : (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Type</DataTable.Title>
              <DataTable.Title>Dr. Notation</DataTable.Title>
              <DataTable.Title>Date</DataTable.Title>
            </DataTable.Header>
            {vaccineRecords.docs.map((vr) => (
              <DataTable.Row key={vr.id}>
                <DataTable.Cell>{vr.data().vaccineType}</DataTable.Cell>
                <DataTable.Cell>{vr.data().doctorsNotation}</DataTable.Cell>
                <DataTable.Cell>
                  {moment(vr.data().dateCompleted).format("ll")}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        )}
      </View>
      <View style={{ marginBottom: 24 }}>
        <Text
          variant="titleSmall"
          style={{ marginBottom: 8, fontWeight: "600" }}
        >
          Medical Records
        </Text>
        {medicalRecords.empty ? (
          <View>
            <Text style={{ textAlign: "center", marginBottom: 8 }}>
              No records yet.
            </Text>
            <TouchableRipple
              onPress={() => navigation.navigate("SetAppointments")}
            >
              <Text style={{ color: colors.primary, textAlign: "center" }}>
                Add an appointment.
              </Text>
            </TouchableRipple>
          </View>
        ) : (
          <View>
            {medicalRecords.docs.map((mr) => {
              console.log(mr.data());
              return (
                <DataTable key={mr.id} style={{ marginBottom: 8 }}>
                  <DataTable.Header>
                    <DataTable.Title>Type</DataTable.Title>
                    <DataTable.Title>Description</DataTable.Title>
                    <DataTable.Title>Diagnosis</DataTable.Title>
                    <DataTable.Title>Date</DataTable.Title>
                  </DataTable.Header>

                  <DataTable.Row>
                    <DataTable.Cell>{mr.data()?.type}</DataTable.Cell>
                    <DataTable.Cell>{mr.data()?.description}</DataTable.Cell>
                    <DataTable.Cell>{mr.data()?.diagnosis}</DataTable.Cell>
                    <DataTable.Cell>
                      {moment(mr.data().dateCompleted).format("ll")}
                    </DataTable.Cell>
                  </DataTable.Row>

                  <Divider
                    bold
                    style={{ marginBottom: 8, backgroundColor: "#6c6c6c" }}
                  />
                </DataTable>
              );
            })}
          </View>
        )}
      </View>
      <View style={{ marginBottom: 24 }}>
        <Text
          variant="titleSmall"
          style={{ marginBottom: 8, fontWeight: "600" }}
        >
          Groom History
        </Text>
        {groomRecords.empty ? (
          <View>
            <Text style={{ textAlign: "center", marginBottom: 8 }}>
              No records yet.
            </Text>
            <TouchableRipple
              onPress={() => navigation.navigate("SetAppointments")}
            >
              <Text style={{ color: colors.primary, textAlign: "center" }}>
                Add an appointment.
              </Text>
            </TouchableRipple>
          </View>
        ) : (
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Date Groomed</DataTable.Title>
            </DataTable.Header>
            {groomRecords.docs.map((gr) => (
              <DataTable.Row key={gr.id}>
                <DataTable.Cell>
                  {moment(gr.data().dateGroomed).format("ll")}
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    flex: 0.5,
    paddingVertical: 20,
    justifyContent: "center",
  },
});
