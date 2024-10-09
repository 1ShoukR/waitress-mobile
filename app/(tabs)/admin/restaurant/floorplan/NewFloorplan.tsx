import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
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
    // TODO: Refine circle to be better looking
    <Svg height="60" width="60" viewBox="0 0 100 100" {...props}>
      <Circle cx="50" cy="50" r="45" stroke="black" strokeWidth="2.5" fill="white" />
    </Svg>
  );
}

function RectSvgComponent(props: any) {
  return (
    //  TODO: Refine square to be better looking
    <Svg height="60" width="60" viewBox="0 0 100 100" {...props}>
      <Rect x="15" y="15" width="70" height="70" stroke="red" strokeWidth="2" fill="white" />
    </Svg>
  );
}

const TableModal = ({ visible, onClose, onSave, onDelete, table }: { visible: boolean, onClose: () => void, onSave: (min: number, max: number) => void, onDelete: () => void, table: Table | null }) => {
  const [min, setMin] = useState(table?.min?.toString() || "");
  const [max, setMax] = useState(table?.max?.toString() || "");

  return (
    // TODO: make it to where individual table min and max clear when modal is closed
    // TODO: Refine the modal to be more visually appealing
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Table Details</Text>
          <TextInput
            style={styles.modalInput}
            placeholder={`Current Min: ${table?.min}`}
            placeholderTextColor={COLORS.gray}
            value={min}
            onChangeText={setMin}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.modalInput}
            placeholder={`Current Max: ${table?.max}`}
            value={max}
            placeholderTextColor={COLORS.gray}
            onChangeText={setMax}
            keyboardType="numeric"
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={() => onSave(parseInt(min), parseInt(max))}>
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
    // TODO: There is an issue where the bottom of the grid seeps through shapes. Need to fix
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
    if (mesh.current) {
      if (intersects.length > 0) {
        onPress(table);
      }
    }
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
        <InteractiveShape key={table.floorplanId} table={table} onPress={onTablePress} />
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
  console.log('Token:', token);
  const { restaurantId } = useLocalSearchParams()

  const handleSave = async () => {
    // TODO: Add validation to make sure floorplan name is not empty
    // TODO: Add validation to make sure tables are not empty
    // TODO: Make sure tables have a isReserved property
    // TODO: Create custom toast component to show success or error messages
    console.log(`Saved: ${floorPlanName} to restaurant ${restaurantId}`);
    if (!floorPlanName || floorPlanName === ' ') {
      alert('Please provde a label for the floorplan.')
    }
    const data = {
      name: floorPlanName,
      tables: tables,
      restaurantId: restaurantId
    }
    console.log('Data:', data);
    const response = await client.post(`/api/restaurant/${restaurantId}/floorplan/new`, JSON.stringify(data), token )
    console.log('Response:', response);
    console.log('Data:', data);
  };

  const addTable = (shape: string) => {
    const newTable: Table = {
      min: 2,
      max: 4,
      shape: shape,
      x: Math.random() * 10 - 5, 
      y: Math.random() * 10 - 5, 
    };
    setTables([...tables, newTable]);
  };

  const handleTablePress = (table: Table) => {
    console.log('Table pressed:', table);
    setSelectedTable(table);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTable(null);
  };

  const handleSaveTable = (min: number, max: number) => {
    if (selectedTable) {
      console.log('Table:', selectedTable);
      const updatedTables = tables.map(table => 
        table === selectedTable ? { ...table, min, max } : table
      );
      setTables(updatedTables);
    }
    handleCloseModal();
  };

  const handleDeleteTable = () => {
    if (selectedTable) {
      const updatedTables = tables.filter(table => table !== selectedTable);
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
          // TODO: Add more shapes to the toolbar, specifically windows, walls, and doorts
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