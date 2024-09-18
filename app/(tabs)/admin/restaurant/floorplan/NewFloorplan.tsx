import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Animated, PanResponder, Dimensions } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { COLORS } from '../../../../../constants'; 
import { Table, TableProps } from 'types/types';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FLOOR_PLAN_SIZE = 2000; 

type GridBackgroundProps = {
  gridSize?: number;
  size?: number;
};

const GridBackground = ({ gridSize = 20, size = FLOOR_PLAN_SIZE }: GridBackgroundProps) => {
  const horizontalLines = [];
  const verticalLines = [];

  for (let i = 0; i <= size; i += gridSize) {
    horizontalLines.push(
      <Line key={`h${i}`} x1="0" y1={i} x2={size} y2={i} stroke="#E0E0E0" strokeWidth="0.5" />
    );
    verticalLines.push(
      <Line key={`v${i}`} x1={i} y1="0" x2={i} y2={size} stroke="#E0E0E0" strokeWidth="0.5" />
    );
  }

  return (
    <Svg height={size} width={size}>
      {horizontalLines}
      {verticalLines}
    </Svg>
  );
};

const TableImage = ({ id, onSelect, x, y }: TableProps) => {
  return (
    <TouchableOpacity style={[styles.table, { left: x, top: y }]} onPress={() => onSelect(id)}>
      <Text>{id}</Text>
    </TouchableOpacity>
  );
};

type DraggableFloorPlanProps = {
  children: React.ReactNode;
  onAddTable: (x: number, y: number) => void;
};

const DraggableFloorPlan = ({ children, onAddTable }: DraggableFloorPlanProps) => {
  const pan = useRef<any>(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: pan.x, dy: pan.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      pan.flattenOffset();
    },
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value
      });
    },
  });

  return (
    <View style={styles.floorPlanContainer}>
      <Animated.View
        style={[
          styles.draggableFloorPlan,
          { transform: [{ translateX: pan.x }, { translateY: pan.y }] }
        ]}
        {...panResponder.panHandlers}
      >
        <GridBackground size={FLOOR_PLAN_SIZE} />
        {children}
      </Animated.View>
      <TouchableOpacity
        style={styles.addTableButton}
        onPress={() => {
            console.log('pan', pan.x._value, pan.y);
          const x = -pan.x._value + windowWidth / 2;
          const y = -pan.y._value + windowHeight / 2;
          onAddTable(x, y);
        }}
      >
        <Text style={styles.addTableButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};


const NewFloorplanScreen = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [sidebarWidth] = useState(new Animated.Value(0));

  const addTable = (x: number, y: number) => {
    const newTable: Table = { 
      id: Date.now(), 
      type: 'Dining Room', 
      min: 1, 
      max: 2, 
      shape: 'square', 
      x: x - 25, // Adjust for table width/2
      y: y - 25  // Adjust for table height/2
    };
    setTables(prevTables => [...prevTables, newTable]);
  };

  const selectTable = (id: number) => {
    const table = tables.find(t => t.id === id);
    if (table) {
      setSelectedTable(table);
      Animated.timing(sidebarWidth, {
        toValue: 200,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
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
      </View>
      
      <View style={styles.content}>
        <DraggableFloorPlan onAddTable={addTable}>
          {tables.map(table => (
            <TableImage key={table.id} id={table.id} onSelect={selectTable} x={table.x} y={table.y} />
          ))}
        </DraggableFloorPlan>
        
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
        <TouchableOpacity style={[styles.footerButton, {backgroundColor: COLORS.danger,} ]}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.footerButton, {backgroundColor: COLORS.success,} ]}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    zIndex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    overflow: 'hidden',
  },
  floorPlanContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  draggableFloorPlan: {
    width: FLOOR_PLAN_SIZE,
    height: FLOOR_PLAN_SIZE,
  },
  sidebar: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.black,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
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
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  footerButton: {
    padding: 8,
    borderRadius: 5,
    marginLeft: 8,
  },
  buttonText: {
    color: COLORS.white,
  },
  addTableButton: {
    position: 'absolute',
    right: 50,
    bottom: 60,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  addTableButtonText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default NewFloorplanScreen;