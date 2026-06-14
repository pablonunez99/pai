import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface VoiceButtonProps {
  onStart: () => void;
  onStop: () => void;
  isListening: boolean;
}

export const VoiceButton = ({ onStart, onStop, isListening }: VoiceButtonProps) => {
  const [scale] = useState(new Animated.Value(1));

  React.useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scale, { toValue: 1.1, duration: 500, useNativeDriver: true }),
          Animated.timing(scale, { toValue: 1, duration: 500, useNativeDriver: true })
        ])
      ).start();
    } else {
      scale.stopAnimation();
      scale.setValue(1);
    }
  }, [isListening, scale]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        onPressIn={onStart}
        onPressOut={onStop}
        activeOpacity={0.9}
        style={styles.touchable}
      >
        <LinearGradient
          colors={isListening ? ['#FF416C', '#FF4B2B'] : ['#4776E6', '#8E54E9']}
          style={styles.circle}
        >
          <Text style={styles.icon}>🎤</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  icon: {
    fontSize: 40,
  },
});
