import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const Intro = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/TrackRight.png")} style={styles.logo} />
      </View>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("RoleSelection")}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={styles.buttonText}
      >
        Get Started
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9AA6B2",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 90,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 241,
    height: 236,
    borderRadius: 50,
  },
  button: {
    backgroundColor: "#606676",
    borderRadius: 25,
  },
  buttonContent: {
    paddingVertical: 8,
    paddingHorizontal: 40,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default Intro;
