import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Animated, PanResponder, Dimensions, Modal, TextInput } from 'react-native';
import Svg, { Line, Rect, Circle } from 'react-native-svg';
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

const TableImage = ({ id, onSelect, x, y, shape }: TableProps & { shape: string }) => {
  return (
    <TouchableOpacity style={[styles.table, { left: x, top: y }]} onPress={() => onSelect(id)}>
      {shape === 'square' && <View style={styles.squareTable} />}
      {shape === 'round' && <View style={styles.roundTable} />}
      <Text style={styles.tableText}>{id}</Text>
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
  const [modalVisible, setModalVisible] = useState(false);

  const addTable = (x: number, y: number) => {
    const newTable: Table = { 
      id: tables.length + 1, 
      type: 'Dining Room', 
      min: 1, 
      max: 2, 
      shape: 'square', 
      x: x - 25, 
      y: y - 25 
    };
    setTables(prevTables => [...prevTables, newTable]);
  };

  const selectTable = (id: number) => {
    const table = tables.find(t => t.id === id);
    if (table) {
      setSelectedTable(table);
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setSelectedTable(null);
    setModalVisible(false);
  };

  const updateTable = (field: keyof Table, value: any) => {
    if (selectedTable) {
      const updatedTable = { ...selectedTable, [field]: value };
      setSelectedTable(updatedTable);
      setTables(prevTables => prevTables.map(t => t.id === updatedTable.id ? updatedTable : t));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Edit Floor Plan</Text>
      </View>
      
      <View style={styles.content}>
        <DraggableFloorPlan onAddTable={addTable}>
          {tables.map(table => (
            <TableImage key={table.id} id={table.id} onSelect={selectTable} x={table.x} y={table.y} shape={table.shape} />
          ))}
        </DraggableFloorPlan>
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Edit table</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Table ID</Text>
                <TextInput
                  style={styles.input}
                  value={selectedTable ? selectedTable.id.toString() : ''}
                  editable={false}
                />
                <Text style={styles.maxCount}>{selectedTable ? `${selectedTable.id}/40` : ''}</Text>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Table Type</Text>
                <TextInput
                  style={styles.input}
                  value={selectedTable ? selectedTable.type : ''}
                  onChangeText={(text) => updateTable('type', text)}
                />
              </View>
              <View style={styles.rowContainer}>
                <View style={styles.halfInputContainer}>
                  <Text style={styles.label}>Min</Text>
                  <View style={styles.numberInput}>
                    <TouchableOpacity onPress={() => updateTable('min', Math.max(1, (selectedTable?.min || 1) - 1))}>
                      <Text style={styles.numberControlText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.numberText}>{selectedTable?.min}</Text>
                    <TouchableOpacity onPress={() => updateTable('min', (selectedTable?.min || 1) + 1)}>
                      <Text style={styles.numberControlText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.halfInputContainer}>
                  <Text style={styles.label}>Max</Text>
                  <View style={styles.numberInput}>
                    <TouchableOpacity onPress={() => updateTable('max', Math.max(1, (selectedTable?.max || 2) - 1))}>
                      <Text style={styles.numberControlText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.numberText}>{selectedTable?.max}</Text>
                    <TouchableOpacity onPress={() => updateTable('max', (selectedTable?.max || 2) + 1)}>
                      <Text style={styles.numberControlText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Shape</Text>
                <View style={styles.shapeContainer}>
                  <TouchableOpacity
                    style={[styles.shapeButton, selectedTable?.shape === 'square' && styles.selectedShape]}
                    onPress={() => updateTable('shape', 'square')}
                  >
                    <View style={styles.squareShape} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.shapeButton, selectedTable?.shape === 'round' && styles.selectedShape]}
                    onPress={() => updateTable('shape', 'round')}
                  >
                    <View style={styles.roundShape} />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  maxCount: {
    position: 'absolute',
    right: 10,
    top: 35,
    color: '#999',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInputContainer: {
    width: '48%',
  },
  numberInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 5,
  },
  numberControlText: {
    fontSize: 24,
    paddingHorizontal: 10,
    color: COLORS.primary,
  },
  numberText: {
    fontSize: 18,
  },
  shapeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  shapeButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  selectedShape: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  squareShape: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.primary,
  },
  roundShape: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  table: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  squareTable: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  roundTable: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 20,
  },
  tableText: {
    position: 'absolute',
    fontSize: 12,
  },
});

export default NewFloorplanScreen;