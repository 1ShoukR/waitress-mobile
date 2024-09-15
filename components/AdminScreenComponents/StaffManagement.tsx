import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Restaurant, Staff } from 'types/types';
import { COLORS } from '../../constants';

// Mock staff data

const mockStaff: Staff[] = [
  { id: '1', name: 'John Doe', role: 'Chef', status: 'On Duty', totalTips: 150.50 },
  { id: '2', name: 'Jane Smith', role: 'Waiter', status: 'On Break', totalTips: 220.75 },
  { id: '3', name: 'Mike Johnson', role: 'Bartender', status: 'On Duty', totalTips: 180.25 },
  { id: '4', name: 'Sarah Williams', role: 'Host', status: 'Off Duty', totalTips: 90.00 },
  { id: '5', name: 'Chris Brown', role: 'Kitchen Staff', status: 'On Duty', totalTips: 110.50 },
];

export const StaffManagement = ({ restaurant }: { restaurant: Restaurant }) => {
  // In a real scenario, you'd use restaurant.Staff instead of mockStaff
  const staffData = mockStaff;

  const handleStaffPress = (staff: Staff) => {
    console.log('Staff member pressed:', staff);
    // Here you can add navigation to individual staff profile in the future
  };

  const renderStaffMember = ({ item }: {item: Staff}) => (
    <TouchableOpacity 
      style={styles.staffMember} 
      onPress={() => handleStaffPress(item)}
    >
      <Text style={styles.staffName}>{item.name}</Text>
      <Text style={styles.staffRole}>{item.role}</Text>
      <Text style={[
        styles.staffStatus, 
        { color: item.status === 'On Duty' ? COLORS.success : item.status === 'On Break' ? COLORS.warning : COLORS.danger }
      ]}>
        {item.status}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Staff Management</Text>
      <Text style={styles.subtitle}>Total Staff: {staffData.length}</Text>
      <FlatList
        data={staffData}
        renderItem={renderStaffMember}
        keyExtractor={item => item.id}
        style={styles.staffList}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => console.log('Add new staff member')}>
        <Text style={styles.addButtonText}>Add New Staff Member</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: 15,
  },
  staffList: {
    maxHeight: 200, // Limit the height of the list
  },
  staffMember: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  staffName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 2,
  },
  staffRole: {
    fontSize: 14,
    color: COLORS.gray800,
    flex: 1,
  },
  staffStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});