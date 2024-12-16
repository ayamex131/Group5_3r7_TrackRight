import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';  // Correct import of Camera from expo-camera

const TimeinScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants?.Type?.back || 0);  // Add fallback to 0 (back camera)
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();  // Requesting camera permission
      setHasPermission(status === 'granted');  // Update state based on permission granted
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Camera
      style={styles.camera}
      type={cameraType}  // Setting cameraType to back/front based on user preference
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}  // Disable scanning if already scanned
    >
      <View style={styles.overlay} />
      {/* You can add buttons or other UI elements to toggle the camera type here */}
    </Camera>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,  // Ensuring the camera takes up the entire screen
  },
  overlay: {
    position: 'absolute',  // Positioning the overlay on top of the camera view
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent overlay
  },
});

export default TimeinScanner;
