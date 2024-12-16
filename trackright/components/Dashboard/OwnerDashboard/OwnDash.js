import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Modal } from "react-native";
import { Card, Button, Chip } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native"; // For navigation
import supabase from "../../../config/supabaseClients"; // Supabase client configuration

const OwnDash = () => {
  const navigation = useNavigation();
  const [employees, setEmployees] = useState([]); // State for employees list
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Fetch employees from the Supabase database
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data, error } = await supabase.from("employees").select("*");

        if (error) {
          console.error("Error fetching employees:", error.message);
        } else {
          console.log("Fetched Employees:", data); // Log the fetched data for debugging
          setEmployees(data);
        }
      } catch (error) {
        console.error("Unexpected error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Add new employee
  const handleAddEmployee = async () => {
    if (firstName.trim() && lastName.trim()) {
      const newEmployee = {
        name: `${firstName} ${lastName}`,
        timeIn: "N/A", // Placeholder for now
        timeOut: "N/A", // Placeholder for now
        breakTime: "N/A", // Placeholder for now
      };
      const { data, error } = await supabase.from("employees").insert([newEmployee]).single();
      if (error) {
        console.error("Error adding employee:", error.message);
        alert("Error adding employee");
      } else {
        setEmployees([...employees, data]);
        setFirstName("");
        setLastName("");
        setIsModalVisible(false);
      }
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
        <Button mode="contained" style={styles.addButton} onPress={() => navigation.navigate("EmployeeRegister")}>
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
        keyExtractor={(item) => item.employee_id ? item.employee_id.toString() : 'no-id'} // Fallback if employee_id is missing
        ListEmptyComponent={
          <Text style={styles.noDataText}>No employees found in the database.</Text>
        }
      />

      {/* Record Time-In Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TimeinScanner")}
      >
        <Text style={styles.buttonText}>Record In</Text>
      </TouchableOpacity>

      {/* Record Time-Out Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TimeOutScanner")}
      >
        <Text style={styles.buttonText}>Record Out</Text>
      </TouchableOpacity>

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
  button: {
    padding: 15,
    marginTop: 20,
    backgroundColor: "#606676",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "#ccc",
    marginTop: 20,
  },
});

export default OwnDash;
