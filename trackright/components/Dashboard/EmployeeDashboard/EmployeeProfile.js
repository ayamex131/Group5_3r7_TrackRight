import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import supabase from '../../../config/supabaseClients';  // Ensure the Supabase client is set up

const EmployeeProfile = ({ route }) => {
  const { userId } = route.params; // Get the userId from navigation params
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [name, setName] = useState(null);
  const [idNumber, setIdNumber] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch employee data based on user_id
        const { data, error } = await supabase
          .from('employees')  // Fetch data from Employees table
          .select('profile_picture, qr_code, name, id_number')  // Select profile_picture, qr_code, name, id_number
          .eq('user_id', userId) // Match user_id
          .single();  // Expect only one record

        if (error) {
          console.error("Error fetching profile data:", error.message);
          setLoading(false);
          return;
        }

        // Construct the URLs for profile picture and QR code
        const profilePicUrl = `https://pzenzlujlhxvdzeznfmo.supabase.co/storage/v1/object/public/profile-pictures/${data.profile_picture}`;
        const qrCodeUrl = `https://pzenzlujlhxvdzeznfmo.supabase.co/storage/v1/object/public/profile-pictures/${data.qr_code}`;

        // Update the state with the URLs and employee details
        setProfilePicUrl(profilePicUrl);
        setQrCodeUrl(qrCodeUrl);
        setName(data.name);
        setIdNumber(data.id_number);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);  // Fetch data when userId changes

  if (loading) {
    return <Text>Loading...</Text>;  // Show loading message while fetching data
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Profile</Text>

      {/* Profile Picture */}
      {profilePicUrl ? (
        <Image source={{ uri: profilePicUrl }} style={styles.profilePic} />
      ) : (
        <Text>No Profile Picture</Text>
      )}

      {/* QR Code */}
      {qrCodeUrl ? (
        <Image source={{ uri: qrCodeUrl }} style={styles.qrCode} />
      ) : (
        <Text>No QR Code</Text>
      )}

      {/* Employee Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>Name: {name}</Text>
        <Text style={styles.detailsText}>ID Number: {idNumber}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  qrCode: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default EmployeeProfile;
