import React, { useState, useEffect } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker"; // Import expo-image-picker
import * as FileSystem from "expo-file-system"; // For saving QR code locally
import QRCode from "qrcode"; // For generating QR code as base64
import supabase from "../../config/supabaseClients"; // Supabase client configuration

export default function EmployeeInitialProfile() {
  const route = useRoute();
  const navigation = useNavigation();
  const { userId } = route.params || {}; // Extract userId from route params

  const [name, setName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [qrCode, setQrCode] = useState(""); // Store the generated QR code
  const [profilePicture, setProfilePicture] = useState(null); // Image state
  const [error, setError] = useState("");
  const [uploadStatus, setUploadStatus] = useState(""); // Track upload status
  const [isLoading, setIsLoading] = useState(false); // Track whether the process is ongoing

  // Request media library permissions for image selection
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "We need camera roll permissions to upload your profile picture.");
    } else {
      console.log("Media library permissions granted.");
    }
  };

  // Call the requestPermissions function when the component is mounted
  useEffect(() => {
    requestPermissions();
  }, []);

  // Handle image picker to allow the user to select a profile picture
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri); // Set the selected image URI
    }
  };

  // Generate a unique QR code for the employee and display it
  const generateQrCode = async () => {
    try {
      const qrCodeData = `https://your-app-url.com/attendance/${userId}`;
      const qrCodeBase64 = await QRCode.toDataURL(qrCodeData); // Generate QR code as base64

      setQrCode(qrCodeBase64); // Display the QR code in the app
      console.log("QR code generated:", qrCodeBase64);
    } catch (error) {
      console.error("Error generating QR code:", error.message);
      throw new Error("QR code generation failed.");
    }
  };

  // Handle the save operation (inserting data into Employees table and uploading the profile picture)
  const handleSave = async () => {
    if (!name || !idNumber) {
      setError("Name and ID Number are required.");
      return;
    }

    setIsLoading(true); // Set loading to true while uploading

    try {
      let uploadedProfilePicture = null;
      let uploadedQrCodePath = null;

      // If a profile picture is selected, upload it to Supabase Storage
      if (profilePicture) {
        const response = await fetch(profilePicture); // Fetch the image file
        const blob = await response.blob(); // Convert to blob

        const { data, error: uploadError } = await supabase.storage
          .from("profile-pictures") // Ensure this matches your Supabase bucket name
          .upload(`employees/${userId}.jpg`, blob);

        if (uploadError) {
          console.error("Upload Error:", uploadError.message); // Log the error message
          setError("Failed to upload profile picture.");
          return;
        }

        uploadedProfilePicture = data.path; // Get the file path
        setUploadStatus("Profile picture uploaded successfully!");
      }

      // Upload the generated QR code
      const qrCodeBlob = await (await fetch(qrCode)).blob(); // Convert QR code file to blob

      const { data: qrCodeUploadData, error: qrUploadError } = await supabase.storage
        .from("profile-pictures")
        .upload(`employees/${userId}_qrcode.png`, qrCodeBlob);

      if (qrUploadError) {
        console.error("Error uploading QR code:", qrUploadError.message);
        setError("Failed to upload QR code.");
        return;
      }

      uploadedQrCodePath = qrCodeUploadData.path; // Get the file path of the uploaded QR code

      console.log("User ID being inserted:", userId); // Log the userId for debugging

      // Insert employee data into the Employees table and retrieve the inserted row
      const { data: employeeData, error: insertError } = await supabase
        .from("employees")
        .insert([{
          user_id: userId,
          name,
          id_number: idNumber,
          qr_code: uploadedQrCodePath, // Save the QR code file path in the database
          profile_picture: uploadedProfilePicture,
        }])
        .select(); // Request the inserted data to be returned

      if (insertError) {
        console.error("Error inserting into Employees table:", insertError); // Log the error message
        setError("Error saving profile: " + insertError.message);
        setIsLoading(false);
        return;
      }

      console.log("Employee profile saved successfully:", employeeData);
      setIsLoading(false);
      Alert.alert("Success", "Profile saved successfully!");
      navigation.navigate("EmpDash"); // Navigate to Employee Dashboard screen
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  // Generate QR code when the component loads
  useEffect(() => {
    if (userId) {
      generateQrCode(); // Generate QR code based on employee ID
    }
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="ID Number"
          value={idNumber}
          onChangeText={setIdNumber}
        />

        {/* Display the generated QR code if available */}
        {qrCode ? (
          <Image source={{ uri: qrCode }} style={styles.imagePreview} />
        ) : (
          <Text>No QR Code generated yet</Text>
        )}

        {/* Display Profile Picture */}
        {profilePicture && <Image source={{ uri: profilePicture }} style={styles.imagePreview} />}

        {/* Button to allow users to pick an image */}
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Upload Profile Picture</Text>
        </TouchableOpacity>

        {/* Display error message if any */}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Display upload status message */}
        {uploadStatus && <Text style={styles.uploadStatus}>{uploadStatus}</Text>}

        {/* Save button to insert data and upload profile picture */}
        <TouchableOpacity style={styles.button} onPress={handleSave} disabled={isLoading}>
          <Text style={styles.buttonText}>{isLoading ? "Saving..." : "Save"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f5", // Subtle background color
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#606676", // Title color
  },
  card: {
    width: "90%",
    padding: 25,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    width: "80%",
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: "#606676",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 10,
  },
  uploadStatus: {
    color: "#4caf50", // Success message color
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
});

