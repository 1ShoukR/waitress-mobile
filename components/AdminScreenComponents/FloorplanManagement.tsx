import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Restaurant } from 'types/types';

type Floorplan = {
  id: string;
  name: string;
  tableCount: number;
};

export const FloorplanManagement = ({ restaurant }: { restaurant: Restaurant }) => {
  const router = useRouter();
  const [floorplans, setFloorplans] = useState<Floorplan[]>([
    { id: '1', name: 'Main Dining', tableCount: 10 },
    { id: '2', name: 'Outdoor Patio', tableCount: 5 },
  ]);

  const renderFloorplanItem = ({ item }: { item: Floorplan }) => (
    <Link href={`/admin/restaurant/floorplan/${item.id}`} asChild>
      <TouchableOpacity style={styles.floorplanItem}>
        <Text style={styles.floorplanName}>{item.name}</Text>
        <Text style={styles.floorplanTableCount}>{item.tableCount} tables</Text>
      </TouchableOpacity>
    </Link>
  );

  const goToFloorplan = () => {
    router.push({pathname:'/admin/restaurant/floorplan/ManageFloorplan', params: {restaurantId: restaurant.RestaurantId}}, );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Floorplan Management</Text>
      <FlatList
        data={floorplans}
        renderItem={renderFloorplanItem}
        keyExtractor={(item) => item.id}
        style={styles.floorplanList}
      />
      <TouchableOpacity style={styles.addButton} onPress={goToFloorplan}>
        <Text style={styles.addButtonText}>Manage Floorplans</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  floorplanList: {
    flex: 1,
  },
  floorplanItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  floorplanName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  floorplanTableCount: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FloorplanManagement;