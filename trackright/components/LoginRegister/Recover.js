import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Recover = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email) {
      setError("Email cannot be empty");
      return;
    }
    // Logic to verify email and proceed with password recovery
    navigation.navigate("RecoverPassword", { email });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Image source={require("../../assets/TrackRight.png")} style={styles.logo} />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Forgot Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.forgotText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#9AA6B2" },
  logo: { width: 241, height: 236, marginBottom: 50, borderRadius: 50 },
  card: { width: "80%", padding: 20, borderRadius: 10, backgroundColor: "#f8f8f8", shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 3.5, elevation: 5 },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { height: 40, borderColor: "#ccc", borderWidth: 1, borderRadius: 5, marginBottom: 10, paddingLeft: 10 },
  button: { padding: 15, marginBottom: 10, borderRadius: 5, backgroundColor: "#606676" },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 16 },
  forgotText: { color: "#606676", textAlign: "center", marginTop: 10 },
  errorText: { color: "red", fontSize: 12, textAlign: "center", marginBottom: 10 },
});

export default Recover;