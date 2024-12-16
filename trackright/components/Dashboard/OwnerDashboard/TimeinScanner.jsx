import React, { useState } from 'react';
import { Camera } from 'expo-camera'; // Import Camera from expo-camera (or another source)
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const TimeinScanner = () => {
  const [scanned, setScanned] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);

  const handleQRCodeScan = ({ data }) => {
    // Handle the QR code scan here
    console.log(data);
    setScanned(true); // Set scanned to true after QR code is scanned
  };

  return (
    <Camera
      style={StyleSheet.absoluteFillObject}
      ref={(ref) => setCameraRef(ref)}
      onBarCodeScanned={scanned ? undefined : handleQRCodeScan}
    >
      {scanned && (
        <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
          <Text style={styles.buttonText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}
    </Camera>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    transform: [{ translateX: -75 }],
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TimeinScanner;
