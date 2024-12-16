import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const OwnProfile = () => {
  // Sample user data
  const user = {
    name: "Juana C. Dela Cruz",
    role: "Manager",
    profileImage: "https://via.placeholder.com/150", // Replace with actual image URL
  };

  return (
    <View style={styles.container}>
      {/* Profile Card */}
      <View style={styles.profileCard}>
        {/* Profile Image */}
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: user.profileImage }}
            style={styles.profileImage}
          />
        </View>
        {/* Name and Role */}
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.role}>{user.role}</Text>

        {/* Scan Button */}
        <TouchableOpacity style={styles.scanButton}>
          <Text style={styles.scanButtonText}>Scan</Text>
        </TouchableOpacity>
      </View>

      {/* Close Icon */}
      <TouchableOpacity style={styles.closeButton}>
        <Icon name="close" size={24} color="#606676" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9AA6B2", // Background color matching the design
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  profileCard: {
    backgroundColor: "#E6E6FA", // Light purple background for the card
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    width: "90%",
  },
  profileImageContainer: {
    backgroundColor: "#C4C4C4",
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 16,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: "#606676",
    marginBottom: 24,
  },
  scanButton: {
    backgroundColor: "#606676",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 20,
  },
  scanButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  closeButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
});

export default OwnProfile;
