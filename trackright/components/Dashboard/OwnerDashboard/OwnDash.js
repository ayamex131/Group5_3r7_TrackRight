import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Card, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const OwnDash = () => {
  const [employees, setEmployees] = useState([
    { id: "1", name: "Ledy Joy Bandiola", timeIn: "10:30 AM", timeOut: "05:00 PM", breakTime: "01:00 hr" },
    { id: "2", name: "Nathalie Jugapao", timeIn: "10:38 AM", timeOut: "05:05 PM", breakTime: "01:05 hr" },
    { id: "3", name: "Afiah Gino", timeIn: "09:40 AM", timeOut: "04:44 PM", breakTime: "01:00 hr" },
    { id: "4", name: "Rex Arnado", timeIn: "09:00 AM", timeOut: "05:00 PM", breakTime: "01:00 hr" },
    { id: "5", name: "Marben Cañizares", timeIn: "08:40 AM", timeOut: "04:40 PM", breakTime: "01:00 hr" },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNotifVisible, setIsNotifVisible] = useState(false); // For notifications
  const [isBurgerMenuVisible, setIsBurgerMenuVisible] = useState(false); // For burger menu
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const navigation = useNavigation();

  const handleAddEmployee = () => {
    if (firstName.trim() && lastName.trim()) {
      const newEmployee = {
        id: (employees.length + 1).toString(),
        name: `${firstName} ${lastName}`,
        timeIn: "N/A", // Placeholder for now
        timeOut: "N/A", // Placeholder for now
        breakTime: "N/A", // Placeholder for now
      };
      setEmployees([...employees, newEmployee]);
      setFirstName("");
      setLastName("");
      setIsModalVisible(false);
    } else {
      alert("Please fill in both first and last names.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsBurgerMenuVisible(true)}>
          <Icon name="menu" size={24} color="black" />
        </TouchableOpacity>
        <TextInput placeholder="Search" style={styles.searchInput} />
        <TouchableOpacity onPress={() => setIsNotifVisible(true)}>
          <Icon name="notifications" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Burger Menu Modal */}
      <Modal visible={isBurgerMenuVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Menu</Text>
            <Button
              mode="text"
              onPress={() => {
                navigation.navigate("OwnProfile");
                setIsBurgerMenuVisible(false);
              }}
            >
              Profile
            </Button>
            <Button
              mode="text"
              onPress={() => {
                navigation.navigate("RoleSelection");
                setIsBurgerMenuVisible(false);
              }}
            >
              Logout
            </Button>
            <Button onPress={() => setIsBurgerMenuVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>

      {/* Notifications Modal */}
      <Modal visible={isNotifVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Notifications</Text>
            <Text>No new notifications!</Text>
            <Button onPress={() => setIsNotifVisible(false)}>Close</Button>
          </View>
        </View>
      </Modal>

      {/* Date Picker */}
      <FlatList
        horizontal
        data={[
          { date: "20 Jan", active: true },
          { date: "21 Jan" },
          { date: "22 Jan" },
          { date: "23 Jan" },
          { date: "24 Jan" },
        ]}
        renderItem={({ item }) => (
          <View style={[styles.dateItem, item.active && styles.activeDate]}>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.datePicker}
      />

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        {['All', 'Employees', 'Active', 'Pending', 'Deactivated'].map((filter, index) => (
          <TouchableOpacity key={index} style={styles.filterButton}>
            <Text
              style={[
                styles.filterText,
                filter === 'All' && { fontWeight: 'bold' }, // Make "All" bold
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Employee List Header */}
      <View style={styles.listHeader}>
        <Button
          mode="contained"
          style={styles.addButton}
          onPress={() => setIsModalVisible(true)}
        >
          Add New Employee
        </Button>
        <TextInput placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#555"
        />
      </View>

      {/* Employee List */}
      <FlatList
        data={employees}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Text style={styles.employeeName}>{item.name}</Text>
            <Text>Time In: {item.timeIn}</Text>
            <Text>Time Out: {item.timeOut}</Text>
            <Text>Break: {item.breakTime}</Text>
          </Card>
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Add Employee Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Employee</Text>
            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
            />
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
            />
            <View style={styles.modalButtons}>
              <Button
                mode="contained"
                onPress={handleAddEmployee}
                style={styles.modalButton}
                labelStyle={{ color: "#FFFFFF" }} // White text for "Add"
              >
                Add
              </Button>
              <Button
                mode="text"
                onPress={() => setIsModalVisible(false)}
                style={styles.modalCancelButton}
                labelStyle={{ color: "#000000" }} // Black text for "Cancel"
              >
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#9AA6B2", padding: 16 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
  },
  datePicker: { marginBottom: 16 },
  dateItem: {
    padding: 13,
    marginHorizontal: 4,
    backgroundColor: "#ddd",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeDate: { backgroundColor: "#606676" },
  dateText: { color: "#fff", fontWeight: "bold" },
  filters: {
    flexDirection: "row",
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#606676",
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: "center", // Centers vertically
    alignItems: "center", // Centers horizontally
  },
  filterText: { color: "#FFFFFF", fontWeight: "400" },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    marginBottom: 16,
  },
  addButton: { backgroundColor: "#E2D4F7", borderRadius: 25 },
  card: {
    marginBottom: 8,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  employeeName: { fontWeight: "bold", fontSize: 16, marginBottom: 8 },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    height: 40,
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalButton: { flex: 1, marginRight: 8, backgroundColor: "#606676" },
  modalCancelButton: { flex: 1, backgroundColor: "#ccc" },
});

export default OwnDash;
