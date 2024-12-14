import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Card, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const OwnMenu = () => {
  const [searchText, setSearchText] = useState("");
  const [employees, setEmployees] = useState([
    { id: "1", name: "Ledy Joy Bandiola", timeIn: "10:30 AM", timeOut: "05:00 PM", breakTime: "01:00 hr" },
    { id: "2", name: "Nathalie Jugapao", timeIn: "10:38 AM", timeOut: "05:05 PM", breakTime: "01:05 hr" },
    { id: "3", name: "Afiah Gino", timeIn: "09:40 AM", timeOut: "04:44 PM", breakTime: "01:00 hr" },
    { id: "4", name: "Rex Arnado", timeIn: "09:00 AM", timeOut: "05:00 PM", breakTime: "01:00 hr" },
    { id: "5", name: "Marben Cañizares", timeIn: "08:40 AM", timeOut: "04:40 PM", breakTime: "01:00 hr" },
    { id: "6", name: "Mikhaela Dag-um", timeIn: "08:00 AM", timeOut: "04:30 PM", breakTime: "01:00 hr" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    fullname: "",
    position: "",
    email: "",
    idNumber: "",
    country: "",
    gender: "",
    address: "",
  });

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddEmployee = () => {
    if (newEmployee.fullname.trim()) {
      const newEmployeeData = {
        id: (employees.length + 1).toString(),
        name: newEmployee.fullname,
        timeIn: "--:--",
        timeOut: "--:--",
        breakTime: "--:--",
      };
      setEmployees([...employees, newEmployeeData]);
      setModalVisible(false);
      setNewEmployee({
        fullname: "",
        position: "",
        email: "",
        idNumber: "",
        country: "",
        gender: "",
        address: "",
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="menu" size={24} color="#000" />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <Icon name="notifications" size={24} color="#000" />
      </View>

      {/* Title */}
      <Text style={styles.title}>Employees</Text>

      {/* Add Employee and Search Section */}
      <View style={styles.searchSection}>
        <Button mode="contained" style={styles.addButton} onPress={() => setModalVisible(true)}>
          Add New Employee
        </Button>
        <View style={styles.inlineSearch}>
          <Icon name="search" size={24} color="#000" style={styles.searchIcon} />
          <TextInput
            placeholder="Search Employee"
            style={styles.searchBar}
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>
      </View>

      {/* Employee List */}
      <FlatList
        data={filteredEmployees}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Text style={styles.iconText}>{item.name.split(" ").map((n) => n[0]).join("")}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.employeeName}>{item.name}</Text>
                <Text style={styles.details}>Time In: {item.timeIn}</Text>
                <Text style={styles.details}>Time Out: {item.timeOut}</Text>
                <Text style={styles.details}>Break Time: {item.breakTime}</Text>
              </View>
            </View>
          </Card>
        )}
      />

      {/* Footer */}
      <TouchableOpacity style={styles.footerButton} onPress={() => {}}>
        <Icon name="close" size={24} color="#000" />
      </TouchableOpacity>

      {/* Add Employee Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Employee</Text>

            <TextInput
              placeholder="Fullname"
              style={styles.input}
              value={newEmployee.fullname}
              onChangeText={(text) => setNewEmployee({ ...newEmployee, fullname: text })}
            />
            <TextInput
              placeholder="Position"
              style={styles.input}
              value={newEmployee.position}
              onChangeText={(text) => setNewEmployee({ ...newEmployee, position: text })}
            />
            <TextInput
              placeholder="Email"
              style={styles.input}
              value={newEmployee.email}
              onChangeText={(text) => setNewEmployee({ ...newEmployee, email: text })}
            />
            <TextInput
              placeholder="ID Number"
              style={styles.input}
              value={newEmployee.idNumber}
              onChangeText={(text) => setNewEmployee({ ...newEmployee, idNumber: text })}
            />
            <TextInput
              placeholder="Country"
              style={styles.input}
              value={newEmployee.country}
              onChangeText={(text) => setNewEmployee({ ...newEmployee, country: text })}
            />
            <TextInput
              placeholder="Gender"
              style={styles.input}
              value={newEmployee.gender}
              onChangeText={(text) => setNewEmployee({ ...newEmployee, gender: text })}
            />
            <TextInput
              placeholder="Address"
              style={styles.input}
              value={newEmployee.address}
              onChangeText={(text) => setNewEmployee({ ...newEmployee, address: text })}
            />

            <Button mode="contained" onPress={handleAddEmployee} style={styles.addEmployeeButton}>
              Add Employee
            </Button>

            <Button mode="outlined" onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              Cancel
            </Button>
          </ScrollView>
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
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#000", marginBottom: 16 },
  searchSection: { marginBottom: 16 },
  addButton: {
    backgroundColor: "white",
    borderRadius: 25,
    marginBottom: 8,
  },
  inlineSearch: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  searchIcon: { marginRight: 8 },
  searchBar: { flex: 1, height: 40 },
  card: { marginBottom: 8, borderRadius: 8 },
  cardContent: { flexDirection: "row", alignItems: "center", padding: 16 },
  iconContainer: {
    backgroundColor: "#606676",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  iconText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 18 },
  detailsContainer: { flex: 1 },
  employeeName: { color: "white", fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  details: { fontSize: 14, color: "white" },
  footerButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    
  
  },
});

export default OwnMenu;
