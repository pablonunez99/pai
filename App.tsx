import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSpeechRecognitionEvent } from 'expo-speech-recognition';
import * as SpeechRecognition from 'expo-speech-recognition';

// Contexts
import { StatsProvider, StatsContext } from './src/context/StatsContext';
import { LlamaProvider, LlamaContext } from './src/context/LlamaContext';

// Components
import { TopBar } from './src/components/TopBar';
import { RoomSelector, Room } from './src/components/RoomSelector';
import { ActionButton } from './src/components/ActionButton';
import { VoiceButton } from './src/components/VoiceButton';
import { SpeechBubble } from './src/components/SpeechBubble';

const MainScreen = () => {
  const [currentRoom, setCurrentRoom] = useState<Room>('Sala');
  const { play, feed, clean } = useContext(StatsContext);
  const { response, isThinking, sendPrompt, speakText } = useContext(LlamaContext);

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  // Speech Recognition Setup
  useSpeechRecognitionEvent('start', () => setIsListening(true));
  useSpeechRecognitionEvent('end', () => setIsListening(false));
  useSpeechRecognitionEvent('result', (event) => {
    setTranscript(event.results[0]?.transcript || '');
  });

  const handleStartListening = async () => {
    const result = await SpeechRecognition.requestPermissionsAsync();
    if (!result.granted) return;
    SpeechRecognition.start({ language: 'es-ES' });
  };

  const handleStopListening = () => {
    SpeechRecognition.stop();
    if (transcript) {
      sendPrompt(transcript);
      setTranscript('');
    }
  };

  const getActionConfig = () => {
    switch (currentRoom) {
      case 'Sala': return { title: 'Jugar', icon: '⚽', colors: ['#ff9966', '#ff5e62'], onPress: () => { play(20); speakText("¡Yupi!"); } };
      case 'Comedor': return { title: 'Comer', icon: '🍎', colors: ['#56ab2f', '#a8e063'], onPress: () => { feed(30); speakText("¡Ñam ñam!"); } };
      case 'Bano': return { title: 'Lavar', icon: '🛁', colors: ['#2193b0', '#6dd5ed'], onPress: () => { clean(40); speakText("¡Agüita!"); } };
      default: return { title: 'Jugar', icon: '⚽', colors: ['#ff9966', '#ff5e62'], onPress: () => {} };
    }
  };

  const actionConfig = getActionConfig() as any;

  return (
    <LinearGradient colors={['#1a2a6c', '#112240', '#1a2a6c']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TopBar />
      
      <View style={styles.content}>
        {/* PAI SPRITE PLACEHOLDER */}
        <View style={styles.spriteContainer}>
          <Text style={styles.paiEmoji}>👾</Text>
        </View>

        <SpeechBubble text={isThinking ? '...' : response} isVisible={isThinking || response !== ''} />
      </View>

      <View style={styles.controls}>
        <ActionButton 
          title={actionConfig.title} 
          icon={actionConfig.icon} 
          colors={actionConfig.colors} 
          onPress={actionConfig.onPress} 
        />
        
        <View style={styles.voiceContainer}>
          <VoiceButton 
            isListening={isListening} 
            onStart={handleStartListening} 
            onStop={handleStopListening} 
          />
          <Text style={styles.voiceText}>
            {isListening ? "Escuchando..." : "Manten presionado para hablar"}
          </Text>
        </View>
      </View>

      <RoomSelector currentRoom={currentRoom} onSelect={setCurrentRoom} />
    </LinearGradient>
  );
};

export default function App() {
  return (
    <StatsProvider>
      <LlamaProvider>
        <SafeAreaView style={styles.safeArea}>
          <MainScreen />
        </SafeAreaView>
      </LlamaProvider>
    </StatsProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  spriteContainer: {
    width: 200,
    height: 200,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  paiEmoji: {
    fontSize: 100,
  },
  controls: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  voiceContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  voiceText: {
    color: '#aaa',
    marginTop: 10,
    fontSize: 14,
  },
});
