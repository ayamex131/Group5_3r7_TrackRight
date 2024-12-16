import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import supabase from "../../config/supabaseClients";

export default function OwnerInitialProfile() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId, email } = route.params || {}; // Extract email from route params

  const [companyName, setCompanyName] = useState("");
  const [profileDetails, setProfileDetails] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!companyName || !profileDetails || !qrCode) {
      setError("All fields are required.");
      return;
    }

    try {
      // Insert into the Owners table
      const { data, error } = await supabase
        .from("owners")
        .insert([
          {
            user_id: userId,
            email: email, // Include email in the insert query
            company_name: companyName,
            profile_details: profileDetails,
            qr_code: qrCode,
          },
        ]);

      if (error) {
        console.error("Error saving owner profile:", error);
        setError(`Error saving owner profile: ${error.message}`);
        return;
      }

      console.log("Owner profile saved successfully:", data);

      // Navigate to dashboard
      navigation.navigate("OwnDash"); // Replace with your actual dashboard screen
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Owner Profile</Text>

      <TextInput
        style={styles.input}
        placeholder="Company Name"
        value={companyName}
        onChangeText={setCompanyName}
      />
      <TextInput
        style={styles.input}
        placeholder="Profile Details"
        value={profileDetails}
        onChangeText={setProfileDetails}
      />
      <TextInput
        style={styles.input}
        placeholder="QR Code"
        value={qrCode}
        onChangeText={setQrCode}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f4f4f4" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  input: { width: "100%", height: 40, borderColor: "#ccc", borderWidth: 1, borderRadius: 5, marginBottom: 10, paddingLeft: 10 },
  button: { padding: 15, borderRadius: 5, backgroundColor: "#606676" },
  buttonText: { color: "#fff", textAlign: "center", fontSize: 16 },
  errorText: { color: "red", textAlign: "center", marginBottom: 10 },
});
