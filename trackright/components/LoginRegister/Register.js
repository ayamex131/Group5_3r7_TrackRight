import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';

const Register = ({ route }) => {
  const navigation = useNavigation();
  const { userType } = route.params || {};

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      setError("Field must not be empty");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password does not match");
      return;
    }

    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("password", password);

    navigation.navigate("Login", { userType });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Image source={require("../../assets/TrackRight.png")} style={styles.logo} />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>
          {userType === "owner" ? "Business Owner / Manager Register" : "Employee Register"}
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
            secureTextEntry={securePassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecurePassword(!securePassword)} style={styles.eyeIcon}>
            <Icon name={securePassword ? 'eye-slash' : 'eye'} size={20} color="#606676" />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Confirm Password"
            secureTextEntry={secureConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setSecureConfirmPassword(!secureConfirmPassword)} style={styles.eyeIcon}>
            <Icon name={secureConfirmPassword ? 'eye-slash' : 'eye'} size={20} color="#606676" />
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login", { userType })}>
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
  passwordContainer: { position: 'relative' },
  passwordInput: { paddingRight: 30 },
  eyeIcon: { position: 'absolute', right: 10, top: 10 },
  button: { padding: 15, marginBottom: 10, borderRadius: 5, backgroundColor: "#606676" },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 16 },
  forgotText: { color: "#606676", textAlign: "center", marginTop: 10 },
  errorText: { color: "red", fontSize: 12, textAlign: "center", marginBottom: 10 },
});

export default Register;
