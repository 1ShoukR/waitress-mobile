import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Canvas, useThree, useFrame, ThreeEvent } from "@react-three/fiber/native";
import { OrthographicCamera } from "@react-three/drei/native";
import { OrthographicCamera as ThreeOrthographicCamera, Vector3, Raycaster } from "three";
import { COLORS } from "../../../../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import Svg, { Circle, Rect } from 'react-native-svg';
import { Table } from "types/types";

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

const InteractiveShape = ({ table, onPress }: {table: Table, onPress: (table: Table) => void}) => {
  const { raycaster, camera, size } = useThree();
  const mesh = useRef();

  const handlePress = useCallback((event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    const x = (event.clientX / size.width) * 2 - 1;
    const y = -(event.clientY / size.height) * 2 + 1;
    raycaster.setFromCamera({ x, y }, camera);
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
        <InteractiveShape key={table.id} table={table} onPress={onTablePress} />
      ))}
    </>
  );
};

const NewFloorplanScreen = () => {
  const [floorPlanName, setFloorPlanName] = useState<string>("");
  const [showToolbar, setShowToolbar] = useState<boolean>(false);
  const [tables, setTables] = useState<Table[]>([]);

  const handleSave = () => {
    console.log(`Saved: ${floorPlanName}`);
    // Implement your save logic here
  };

  const addTable = (shape: string) => {
    const newTable: Table = {
      id: Date.now(), 
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
    // Implement your table press logic here
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
});

export default NewFloorplanScreen;