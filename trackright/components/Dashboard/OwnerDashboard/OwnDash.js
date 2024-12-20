import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OwnDash = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Business Owner Dashboard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default OwnDash;
