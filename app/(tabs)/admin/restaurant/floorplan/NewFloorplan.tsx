import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { COLORS } from '../../../../../constants'; // Adjust the import path as needed

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GridBackground = ({ gridSize = 20 }) => {
  const horizontalLines = [];
  const verticalLines = [];

  for (let i = 0; i <= windowHeight; i += gridSize) {
    horizontalLines.push(
      <Line key={`h${i}`} x1="0" y1={i} x2={windowWidth} y2={i} stroke="#E0E0E0" strokeWidth="0.5" />
    );
  }

  for (let i = 0; i <= windowWidth; i += gridSize) {
    verticalLines.push(
      <Line key={`v${i}`} x1={i} y1="0" x2={i} y2={windowHeight} stroke="#E0E0E0" strokeWidth="0.5" />
    );
  }

  return (
    <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
      {horizontalLines}
      {verticalLines}
    </Svg>
  );
};

const Table = ({ id, onSelect }) => {
  return (
    <TouchableOpacity style={styles.table} onPress={() => onSelect(id)}>
      <Text>{id}</Text>
    </TouchableOpacity>
  );
};

const NewFloorplanScreen = () => {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [sidebarWidth] = useState(new Animated.Value(0));

  const addTable = () => {
    const newTable = { id: Date.now(), type: 'Dining Room', min: 1, max: 2, shape: 'square' };
    setTables([...tables, newTable]);
  };

  const selectTable = (id) => {
    const table = tables.find(t => t.id === id);
    setSelectedTable(table);
    Animated.timing(sidebarWidth, {
      toValue: 200,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeSidebar = () => {
    setSelectedTable(null);
    Animated.timing(sidebarWidth, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Edit Floor Plan</Text>
        <TouchableOpacity style={styles.addButton} onPress={addTable}>
          <Text style={styles.buttonText}>Add Table</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.floorplanArea}>
          <GridBackground />
          {tables.map(table => (
            <Table key={table.id} id={table.id} onSelect={selectTable} />
          ))}
        </View>
        
        <Animated.View style={[styles.sidebar, { width: sidebarWidth }]}>
          {selectedTable && (
            <View>
              <TouchableOpacity onPress={closeSidebar} style={styles.closeButton}>
                <Text>Close</Text>
              </TouchableOpacity>
              <Text style={styles.sidebarTitle}>Edit table</Text>
              <Text>Table ID: {selectedTable.id}</Text>
              <Text>Type: {selectedTable.type}</Text>
              <Text>Min: {selectedTable.min} Max: {selectedTable.max}</Text>
            </View>
          )}
        </Animated.View>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: COLORS.white,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  floorplanArea: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#F8F8F8', // Light background color for the grid area
  },
  sidebar: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  table: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerButton: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 5,
    marginLeft: 8,
  },
});

export default NewFloorplanScreen;