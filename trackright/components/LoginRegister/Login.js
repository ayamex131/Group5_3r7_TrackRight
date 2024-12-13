import React, { useState, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome for eye icon

const Login = ({ route }) => {
  const navigation = useNavigation();
  const { userType } = route.params || {};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [secureText, setSecureText] = useState(true);

  useEffect(() => {
    const checkCredentials = async () => {
      const storedEmail = await AsyncStorage.getItem("email");
      const storedPassword = await AsyncStorage.getItem("password");
      if (storedEmail && storedPassword) {
        setEmail(storedEmail);
        setPassword(storedPassword);
      }
    };
    checkCredentials();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Field must not be empty");
      return;
    }

    const storedEmail = await AsyncStorage.getItem("email");
    const storedPassword = await AsyncStorage.getItem("password");

    if (email === storedEmail && password === storedPassword) {
      if (userType === "owner") {
        navigation.navigate("OwnDash");
      } else if (userType === "employee") {
        navigation.navigate("EmpDash");
      }
    } else {
      setError("Incorrect credentials");
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
            <Icon name={secureText ? 'eye-slash' : 'eye'} size={20} color="#606676" />
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Recover")}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register", { userType })}>
          <Text style={styles.forgotText}>Doesn't have an account? Register</Text>
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
  passwordContainer: { position: 'relative' },
  passwordInput: { paddingRight: 30 },
  eyeIcon: { position: 'absolute', right: 10, top: 10 },
  button: { padding: 15, marginBottom: 10, borderRadius: 5, backgroundColor: "#606676" },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 16 },
  forgotText: { color: "#606676", textAlign: "center", marginTop: 10 },
  errorText: { color: "red", fontSize: 12, textAlign: "center", marginBottom: 10 },
});

export default Login;
