import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Modal } from "react-native";
import { Card, Button, Chip } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const OwnDash = () => {
  const [employees, setEmployees] = useState([
    { id: "1", name: "Ledy Joy Bandiola", timeIn: "10:30 AM", timeOut: "05:00 PM", breakTime: "01:00 hr" },
    { id: "2", name: "Nathalie Jugapao", timeIn: "10:38 AM", timeOut: "05:05 PM", breakTime: "01:05 hr" },
    { id: "3", name: "Afiah Gino", timeIn: "09:40 AM", timeOut: "04:44 PM", breakTime: "01:00 hr" },
    { id: "4", name: "Rex Arnado", timeIn: "09:00 AM", timeOut: "05:00 PM", breakTime: "01:00 hr" },
    { id: "5", name: "Marben Cańizares", timeIn: "08:40 AM", timeOut: "04:40 PM", breakTime: "01:00 hr" },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
        <Icon name="menu" size={24} />
        <TextInput placeholder="Search" style={styles.searchInput} />
        <Icon name="notifications" size={24} />
      </View>

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
      <View style={styles.filters}>
        <Chip style={styles.chip}>All</Chip>
        <Chip style={styles.chip}>Employees</Chip>
        <Chip style={styles.chip}>Active</Chip>
        <Chip style={styles.chip}>Pending</Chip>
        <Chip style={styles.chip}>Deactivated</Chip>
      </View>

      {/* Employee List Header */}
      <View style={styles.listHeader}>
        <Button mode="contained" style={styles.addButton} onPress={() => setIsModalVisible(true)}>
          Add New Employee
        </Button>
        <TextInput placeholder="Search Employee" style={styles.searchInput} />
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
              <Button mode="contained" onPress={handleAddEmployee} style={styles.modalButton}>
                Add
              </Button>
              <Button mode="text" onPress={() => setIsModalVisible(false)} style={styles.modalCancelButton}>
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
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  searchInput: {
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
  },
  datePicker: { marginBottom: 16 },
  dateItem: {
    padding: 8,
    marginHorizontal: 4,
    backgroundColor: "#ddd",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activeDate: { backgroundColor: "#606676" },
  dateText: { color: "#fff", fontWeight: "bold" },
  filters: { flexDirection: "row", justifyContent: "space-around", marginBottom: 16 },
  chip: { backgroundColor: "#606676", color: "#FFFFFF" },
  listHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  addButton: { backgroundColor: "#606676", borderRadius: 25 },
  card: { marginBottom: 8, padding: 16, backgroundColor: "#FFFFFF", borderRadius: 8 },
  employeeName: { fontWeight: "bold", fontSize: 16, marginBottom: 8 },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: { backgroundColor: "#fff", padding: 20, borderRadius: 8, width: "80%" },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16, textAlign: "center" },
  input: { backgroundColor: "#f0f0f0", padding: 10, borderRadius: 8, marginBottom: 16 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalButton: { backgroundColor: "#606676", borderRadius: 8, flex: 1, marginRight: 8 },
  modalCancelButton: { borderRadius: 8, flex: 1 },
});

export default OwnDash;
