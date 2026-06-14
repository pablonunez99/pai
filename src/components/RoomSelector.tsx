import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export type Room = 'Sala' | 'Comedor' | 'Bano';

interface RoomSelectorProps {
  currentRoom: Room;
  onSelect: (room: Room) => void;
}

export const RoomSelector = ({ currentRoom, onSelect }: RoomSelectorProps) => {
  const rooms: { id: Room; icon: string; label: string }[] = [
    { id: 'Sala', icon: '🎮', label: 'Sala' },
    { id: 'Comedor', icon: '🍽️', label: 'Comedor' },
    { id: 'Bano', icon: '🛁', label: 'Baño' },
  ];

  return (
    <View style={styles.container}>
      {rooms.map((room) => {
        const isActive = currentRoom === room.id;
        return (
          <TouchableOpacity
            key={room.id}
            onPress={() => onSelect(room.id)}
            style={[styles.button, isActive && styles.buttonActive]}
          >
            <Text style={[styles.icon, isActive && styles.iconActive]}>{room.icon}</Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>{room.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#16213E',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    paddingBottom: 30, // for mobile bottom safe area
  },
  button: {
    alignItems: 'center',
    padding: 10,
    opacity: 0.6,
  },
  buttonActive: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
  icon: {
    fontSize: 28,
  },
  iconActive: {
    textShadowColor: 'rgba(255,255,255,0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  label: {
    color: '#888',
    marginTop: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  labelActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
