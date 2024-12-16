import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome for eye icon
import supabase from "../../config/supabaseClients"; // Ensure your Supabase client is properly configured

const Login = ({ route }) => {
  const navigation = useNavigation();
  const { userType } = route.params || {}; // Get userType ("owner" or "employee")

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Fields must not be empty.");
      return;
    }

    try {
      // Fetch user from the Users table
      const { data: user, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("password", password) // Directly matching password (not recommended for production; hash passwords instead)
        .single();

      if (fetchError || !user) {
        setError("Invalid email or password.");
        console.error("Fetch error:", fetchError);
        return;
      }

      const userId = user.user_id; // Use `user_id` from the fetched user

      // Navigate to the correct dashboard based on role
      if (user.role === "Owner") {
        navigation.navigate("OwnDash", { userId });
      } else if (user.role === "Employee") {
        navigation.navigate("EmployeeProfile", { userId });
      } else {
        setError("Invalid user role.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("RoleSelection")}>
        <Image source={require("../../assets/TrackRight.png")} style={styles.logo} />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>
          {userType === "owner" ? "Business Owner / Manager Login" : "Employee Login"}
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.eyeIcon}>
            <Icon name={secureText ? "eye-slash" : "eye"} size={20} color="#606676" />
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Recover")}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate(userType === "owner" ? "Register" : "EmployeeRegister", { userType })
          }
        >
          <Text style={styles.forgotText}>Don't have an account? Register</Text>
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
  passwordContainer: { position: "relative" },
  passwordInput: { paddingRight: 30 },
  eyeIcon: { position: "absolute", right: 10, top: 10 },
  button: { padding: 15, marginBottom: 10, borderRadius: 5, backgroundColor: "#606676" },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 16 },
  forgotText: { color: "#606676", textAlign: "center", marginTop: 10 },
  errorText: { color: "red", textAlign: "center", marginBottom: 10 },
});

export default Login;
