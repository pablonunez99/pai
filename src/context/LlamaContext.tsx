import React, { createContext, useState, ReactNode } from 'react';
import * as Speech from 'expo-speech';

interface LlamaContextType {
  response: string;
  isThinking: boolean;
  sendPrompt: (text: string) => Promise<void>;
  speakText: (text: string) => void;
}

export const LlamaContext = createContext<LlamaContextType>({
  response: '',
  isThinking: false,
  sendPrompt: async () => {},
  speakText: () => {},
});

export const LlamaProvider = ({ children }: { children: ReactNode }) => {
  const [response, setResponse] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // MOCK function until llama.rn is fully loaded with a real GGUF file in mobile
  const sendPrompt = async (text: string) => {
    setIsThinking(true);
    setResponse('...');
    
    // Simulate LLM delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const fakeResponse = `¡He escuchado que dijiste: ${text}! Soy Pai.`;
    setResponse(fakeResponse);
    setIsThinking(false);
    speakText(fakeResponse);
  };

  const speakText = (text: string) => {
    Speech.speak(text, {
      language: 'es-ES',
      pitch: 1.2,
      rate: 1.0,
    });
  };

  return (
    <LlamaContext.Provider value={{ response, isThinking, sendPrompt, speakText }}>
      {children}
    </LlamaContext.Provider>
  );
};
