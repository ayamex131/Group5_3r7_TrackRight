import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const RoleSelection = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/TrackRight.png")}
          style={styles.logo}
          onTouchEnd={() => navigation.navigate("Intro")} // Navigate to Intro screen
        />
      </View>
      <Button
        mode="contained"
        style={[styles.button, styles.topButton]}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonText}
        onPress={() => navigation.navigate("Login", { userType: "owner" })} // Navigate to Login for Owner
      >
        Business Owner / Manager
      </Button>
      <Button
        mode="contained"
        style={[styles.button, styles.bottomButton]}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonText}
        onPress={() => navigation.navigate("Login", { userType: "employee" })} // Navigate to Login for Employee
      >
        Employee
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9AA6B2",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 261,
    height: 251,
    borderRadius: 50,
  },
  button: {
    backgroundColor: "#606676",
    borderRadius: 25,
    width: "80%",
    marginVertical: 10,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default RoleSelection;
