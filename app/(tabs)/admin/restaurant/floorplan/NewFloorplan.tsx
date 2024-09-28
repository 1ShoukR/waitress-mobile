import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Canvas } from "@react-three/fiber/native";
import { OrthographicCamera } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber/native";
import { OrthographicCamera as ThreeOrthographicCamera, Vector3 } from "three";
import { COLORS } from "../../../../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faPlus, faX } from "@fortawesome/free-solid-svg-icons";

const Grid = ({ size, divisions }: { size: number; divisions: number }) => {
  const stretchedSize = size * 1.3;
  return (
    <gridHelper
      args={[stretchedSize, divisions, COLORS.black, COLORS.gray]}
      rotation={[Math.PI / 2.5, 0, 0]}
      position={[0, -stretchedSize / 7.3, -0.1]}
    />
  );
};

const Scene = () => {
  const cameraRef = useRef<ThreeOrthographicCamera>(null);

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.updateProjectionMatrix();
    }
  });

  return (
    <>
      <OrthographicCamera
        ref={cameraRef}
        makeDefault
        zoom={20.6}
        position={new Vector3(0, -7, 10)}
      />
      <ambientLight intensity={0.5} />
      <Grid size={20} divisions={26} />
      {/* Add your floor plan objects here */}
    </>
  );
};

const NewFloorplanScreen = () => {
  const [floorPlanName, setFloorPlanName] = useState<string>("");
  const [showToolbar, setShowToolbar] = useState<boolean>(false);

  const handleSave = () => {
    console.log(`Saved: ${floorPlanName}`);
    // Implement your save logic here
  };

  const handleToolbarPress = () => {
    console.log("Toolbar pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>New Floorplan</Text>

        <TextInput
          style={styles.input}
          value={floorPlanName}
          onChangeText={setFloorPlanName}
          placeholder="Floor Plan Name"
        />
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.checkButton} onPress={handleSave}>
            <FontAwesomeIcon icon={faCheck} color="#fff" size={15} />
          </TouchableOpacity>
        </View>
      </View>

      <Canvas style={styles.canvas}>
        <Scene />
      </Canvas>
      {!showToolbar ? (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setShowToolbar(true)}
        >
          <FontAwesomeIcon icon={faPlus} color="#fff" size={20} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.floatingButton, { backgroundColor: COLORS.danger }]}
          onPress={() => setShowToolbar(false)}
        >
          <FontAwesomeIcon icon={faX} color="#fff" size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.success,
    padding: 16,
    borderRadius: 50,
  },
  header: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    gap: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: "#FFFFFF",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  checkButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  canvas: {
    flex: 1,
  },
});

export default NewFloorplanScreen;
