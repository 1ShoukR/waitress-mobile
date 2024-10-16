import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { Canvas, useThree, useFrame, ThreeEvent } from "@react-three/fiber/native";
import { OrthographicCamera } from "@react-three/drei/native";
import { OrthographicCamera as ThreeOrthographicCamera, Vector3, Raycaster, Vector2, Mesh } from "three";
import { COLORS } from "../../../../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import Svg, { Circle, Rect } from 'react-native-svg';
import { Table } from "types/types";
import { useLocalSearchParams } from "expo-router";
import client from "api/client";
import { useAppDispatch, useAppSelector } from "redux/hooks";

function CircleSvgComponent(props: any) {
  return (
    <Svg height="60" width="60" viewBox="0 0 100 100" {...props}>
      <Circle cx="50" cy="50" r="45" stroke="black" strokeWidth="2.5" fill="white" />
    </Svg>
  );
}

function RectSvgComponent(props: any) {
  return (
    <Svg height="60" width="60" viewBox="0 0 100 100" {...props}>
      <Rect x="15" y="15" width="70" height="70" stroke="red" strokeWidth="2" fill="white" />
    </Svg>
  );
}

const TableModal = ({ visible, onClose, onSave, onDelete, table }: { 
  visible: boolean, 
  onClose: () => void, 
  onSave: (tableId: number | undefined, min: number, max: number, locationDescription: string) => void, 
  onDelete: () => void, 
  table: Table | null 
}) => {
  const [localMin, setLocalMin] = useState("");
  const [localMax, setLocalMax] = useState("");
  const [localDescription, setLocalDescription] = useState("");

  useEffect(() => {
    if (table) {
      setLocalMin(table.min.toString());
      setLocalMax(table.max.toString());
      setLocalDescription(table.locationDescription || "");
    }
  }, [table]);

  const handleSave = () => {
    if (table) {
      onSave(table.tableId, parseInt(localMin), parseInt(localMax), localDescription);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Table Details</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Minimum Capacity"
            placeholderTextColor={COLORS.gray}
            value={localMin}
            onChangeText={setLocalMin}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Maximum Capacity"
            placeholderTextColor={COLORS.gray}
            value={localMax}
            onChangeText={setLocalMax}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Location Description"
            placeholderTextColor={COLORS.gray}
            value={localDescription}
            onChangeText={setLocalDescription}
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={onDelete}>
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const Grid = ({ size, divisions }: { size: number; divisions: number }) => {
  const stretchedSize = size * 1.45;
  return (
    <gridHelper
      args={[stretchedSize, divisions, COLORS.black, COLORS.gray]}
      rotation={[Math.PI / 2.5, 0, 0]}
      position={[0, -stretchedSize / 7.3, -0.1]}
    />
  );
};

const InteractiveShape = ({ table, onPress }: {table: Table, onPress: (table: Table) => void}) => {
  const { raycaster, camera, size } = useThree();
  const mesh = useRef<Mesh>(null);

  const handlePress = useCallback((event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    const x = (event.clientX / size.width) * 2 - 1;
    const y = -(event.clientY / size.height) * 2 + 1;
    const pointer = new Vector2(x, y);
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(mesh?.current!);
    if (intersects.length > 0) {
      onPress(table);
    }
  }, [table, onPress, raycaster, camera, size]);

  if (table.shape === 'circle') {
    return (
      <mesh ref={mesh} position={[table.x, table.y, 0]} onPointerDown={handlePress}>
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial color="grey" />
      </mesh>
    );
  } else if (table.shape === 'rectangle') {
    return (
      <mesh ref={mesh} position={[table.x, table.y, 0]} onPointerDown={handlePress}>
        <boxGeometry args={[1.8, 1.8, 0.1]} />
        <meshBasicMaterial color="grey" />
      </mesh>
    );
  }
  return null;
};

const Scene = ({ tables, onTablePress }: {tables: Table[], onTablePress: (table: Table) => void}) => {
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
      {tables.map((table) => (
        <InteractiveShape key={table.tableId} table={table} onPress={onTablePress} />
      ))}
    </>
  );
};

const NewFloorplanScreen = () => {
  const [floorPlanName, setFloorPlanName] = useState<string>("");
  const [showToolbar, setShowToolbar] = useState<boolean>(false);
  const [tables, setTables] = useState<Table[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const token = useAppSelector((state) => state.auth.apiToken)
  const { restaurantId } = useLocalSearchParams()

  const handleSave = async () => {
    if (!floorPlanName || floorPlanName.trim() === '') {
      alert('Please provide a label for the floorplan.');
      return;
    }

    if (tables.length === 0) {
      alert('Please add at least one table to the floorplan.');
      return;
    }

    const data = {
      name: floorPlanName,
      tables: tables,
      restaurantId: restaurantId
    }

    try {
      const response = await client.post(`/api/restaurant/${restaurantId}/floorplan/new`, JSON.stringify(data), token);
      console.log('Response:', response);
      // Handle successful save (e.g., show a success message, navigate to a different screen)
    } catch (error) {
      console.error('Error saving floorplan:', error);
      alert('Failed to save floorplan. Please try again.');
    }
  };

  const addTable = (shape: string) => {
    const newTable: Table = {
      min: 2,
      max: 4,
      shape: shape,
      x: Math.random() * 10 - 5, 
      y: Math.random() * 10 - 5,
      locationDescription: "",
      floorplanId: undefined,
      restaurantId: Number(restaurantId),
      isReserved: false,
      tableId: Date.now() // Use a temporary unique identifier
    };
    setTables([...tables, newTable]);
  };

  const handleTablePress = (table: Table) => {
    setSelectedTable(table);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTable(null);
  };

  const handleSaveTable = (tableId: number | undefined, min: number, max: number, locationDescription: string) => {
    const updatedTables = tables.map(table => 
      table.tableId === tableId ? { ...table, min, max, locationDescription } : table
    );
    setTables(updatedTables);
    handleCloseModal();
  };

  const handleDeleteTable = () => {
    if (selectedTable) {
      const updatedTables = tables.filter(table => table.tableId !== selectedTable.tableId);
      setTables(updatedTables);
    }
    handleCloseModal();
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
            <Text style={{color: COLORS.white, fontWeight: 'bold'}}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Canvas style={styles.canvas}>
        <Scene tables={tables} onTablePress={handleTablePress} />
      </Canvas>
      <View style={styles.toolbarContainer}>
        {!showToolbar ? (
          <TouchableOpacity
            style={[styles.floatingButton, {bottom: 10, right: 5}]}
            onPress={() => setShowToolbar(true)}
          >
            <FontAwesomeIcon icon={faPlus} color="#fff" size={20} />
          </TouchableOpacity>
        ) : (
          <View style={styles.toolbarContent}>
            <TouchableOpacity style={styles.svgButton} onPress={() => addTable('circle')}>
              <CircleSvgComponent />
            </TouchableOpacity>
            <TouchableOpacity style={styles.svgButton} onPress={() => addTable('rectangle')}>
              <RectSvgComponent />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.floatingButton, { backgroundColor: COLORS.danger }]}
              onPress={() => setShowToolbar(false)}
            >
              <FontAwesomeIcon icon={faX} color="#fff" size={20} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TableModal
        visible={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveTable}
        onDelete={handleDeleteTable}
        table={selectedTable}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  toolbarContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  toolbarContent: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    padding: 5,
  },
  svgButton: {
    marginRight: 5,
  },
  floatingButton: {
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
  checkButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  canvas: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  closeButtonText: {
    textAlign: 'center',
  },
});

export default NewFloorplanScreen;