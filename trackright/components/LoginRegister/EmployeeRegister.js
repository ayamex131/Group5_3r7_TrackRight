import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import supabase from "../../config/supabaseClients";

const EmployeeRegister = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Insert into Users table
      const { data, error } = await supabase
        .from("users")
        .insert([{ username, email, password, role: "Employee", status: "Active" }])
        .select("user_id")
        .single();

      if (error) {
        console.error("Error registering employee:", error);
        setError("Error: " + error.message);
        return;
      }

      const userId = data.user_id;
      console.log("User registered, userId:", userId); // Log userId for debugging

      // Redirect to EmployeeInitialProfile
      navigation.navigate("EmployeeInitialProfile", { userId });
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/TrackRight.png")} style={styles.logo} />

      <View style={styles.card}>
        <Text style={styles.title}>Employee Register</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.forgotText}>Already have an account? Login</Text>
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
  errorText: { color: "red", textAlign: "center", marginBottom: 10 },
});

export default EmployeeRegister;
