import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Restaurant } from 'types/types';

type Reservation = {
  id: string;
  time: string;
  party: number;
  name: string;
};

export const ReservationManagement = ({ restaurant }: { restaurant: Restaurant }) => {
  const [reservations, setReservations] = useState<Reservation[]>([
    { id: '1', time: '18:00', party: 2, name: 'Smith' },
    { id: '2', time: '19:30', party: 4, name: 'Johnson' },
    { id: '3', time: '20:00', party: 6, name: 'Williams' },
  ]);

  const handleReservationPress = (reservation: Reservation) => {
    // Handle reservation selection, e.g., show details or edit options
    console.log('Reservation selected:', reservation);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reservation Management</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reservationContainer}>
        {reservations.map((reservation) => (
          <TouchableOpacity
            key={reservation.id}
            style={styles.reservationPill}
            onPress={() => handleReservationPress(reservation)}
          >
            <Text style={styles.reservationTime}>{reservation.time}</Text>
            <Text style={styles.reservationInfo}>{reservation.name} - Party of {reservation.party}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Reservation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  reservationContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  reservationPill: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    padding: 12,
    marginRight: 8,
    minWidth: 120,
  },
  reservationTime: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reservationInfo: {
    fontSize: 12,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});