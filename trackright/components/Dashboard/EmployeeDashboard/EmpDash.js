import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const EmpDash = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  const openModal = (text) => {
    setModalText(text);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // Dummy data for log reports
  const logReports = [
    { date: "2024-12-01", timeIn: "10:30 AM", timeOut: "05:00 PM", breakTime: "01:00 hr", activeTime: "06:30:00 hr" },
    { date: "2024-12-02", timeIn: "10:30 AM", timeOut: "05:00 PM", breakTime: "01:00 hr", activeTime: "06:30:00 hr" },
    { date: "2024-12-03", timeIn: "10:30 AM", timeOut: "05:00 PM", breakTime: "01:00 hr", activeTime: "06:30:00 hr" },
    { date: "--", timeIn: "--", timeOut: "--", breakTime: "00:00 hr", activeTime: "00:00:00 hr" },
    { date: "--", timeIn: "--", timeOut: "--", breakTime: "00:00 hr", activeTime: "00:00:00 hr" },
    { date: "--", timeIn: "--", timeOut: "--", breakTime: "00:00 hr", activeTime: "00:00:00 hr" },
    { date: "--", timeIn: "--", timeOut: "--", breakTime: "00:00 hr", activeTime: "00:00:00 hr" },
    { date: "--", timeIn: "--", timeOut: "--", breakTime: "00:00 hr", activeTime: "00:00:00 hr" },
    { date: "--", timeIn: "--", timeOut: "--", breakTime: "00:00 hr", activeTime: "00:00:00 hr" },
    { date: "--", timeIn: "--", timeOut: "--", breakTime: "00:00 hr", activeTime: "00:00:00 hr" },
    { date: "--", timeIn: "--", timeOut: "--", breakTime: "00:00 hr", activeTime: "00:00:00 hr" },
    { date: "--", timeIn: "--", timeOut: "--", breakTime: "00:00 hr", activeTime: "00:00:00 hr" },
    { date: "--", timeIn: "--", timeOut: "--", breakTime: "00:00 hr", activeTime: "00:00:00 hr" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="menu" size={24} color="black" />
        </TouchableOpacity>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#555"
        />
        <TouchableOpacity>
          <Icon name="notifications" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Centered Floating Card */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          {/* Sticky Title/Header */}
          <View style={styles.stickyHeader}>
            <Text style={styles.cardTitle}>My Log Reports</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Date</Text>
              <Text style={styles.tableHeaderText}>Time In</Text>
              <Text style={styles.tableHeaderText}>Time Out</Text>
              <Text style={styles.tableHeaderText}>Break Time</Text>
              <Text style={styles.tableHeaderText}>Active Time</Text>
            </View>
          </View>

          {/* Scrollable Table Rows */}
          <ScrollView style={styles.scrollContainer}>
            {logReports.map((log, index) => (
              <View
                key={index}
                style={[
                  styles.tableRow,
                  index % 2 === 0 && styles.evenRow,
                ]}
              >
                <Text style={styles.tableCell}>{log.date}</Text>
                <Text style={styles.tableCell}>{log.timeIn}</Text>
                <Text style={styles.tableCell}>{log.timeOut}</Text>
                <Text style={styles.tableCell}>{log.breakTime}</Text>
                <Text style={styles.tableCell}>{log.activeTime}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => openModal("Show QR Code for Time In")}
        >
          <Text style={styles.buttonText}>TIME IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => openModal("Show QR Code for Time Out")}
        >
          <Text style={styles.buttonText}>TIME OUT</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Time In/Time Out */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <Pressable style={styles.modalOverlay} onPress={closeModal}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalText}</Text>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#9AA6B2" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#9AA6B2",
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: "#e0e0e0", // Light gray for search bar
    borderRadius: 8,
    paddingHorizontal: 12,
    color: "black",
    height: 40,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    height: "70%",
    width: "90%",
  },
  stickyHeader: {
    backgroundColor: "#fff",
    paddingBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
  },
  tableHeaderText: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  scrollContainer: {
    flex: 1,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  evenRow: { backgroundColor: "#f9f9f9" },
  tableCell: { flex: 1, textAlign: "center", fontSize: 12 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#9AA6B2",
  },
  button: {
    backgroundColor: "#606676",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "40%",
    alignItems: "center",
    marginBottom: 80,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    height: "60%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default EmpDash;
