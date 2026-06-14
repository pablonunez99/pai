import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatsContext } from '../context/StatsContext';

export const TopBar = () => {
  const { hunger, happiness, dirtiness } = useContext(StatsContext);

  const StatPill = ({ emoji, value, color }: { emoji: string; value: number; color: string }) => (
    <View style={[styles.pill, { borderColor: color }]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <View style={styles.barContainer}>
        <View style={[styles.barFill, { width: `${Math.max(0, Math.min(100, value))}%`, backgroundColor: color }]} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatPill emoji="🍖" value={100 - hunger} color="#FF6B6B" />
      <StatPill emoji="😃" value={happiness} color="#4ECDC4" />
      <StatPill emoji="💩" value={100 - dirtiness} color="#845EC2" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 20,
    backgroundColor: '#1A1A2E',
    borderBottomWidth: 1,
    borderBottomColor: '#16213E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F3460',
    padding: 8,
    borderRadius: 20,
    borderWidth: 1,
    width: '30%',
  },
  emoji: {
    fontSize: 16,
    marginRight: 8,
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#1A1A2E',
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
});
