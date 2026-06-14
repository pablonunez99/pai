import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface StatsContextType {
  hunger: number;
  happiness: number;
  dirtiness: number;
  feed: (amount: number) => void;
  play: (amount: number) => void;
  clean: (amount: number) => void;
}

export const StatsContext = createContext<StatsContextType>({
  hunger: 50,
  happiness: 100,
  dirtiness: 0,
  feed: () => {},
  play: () => {},
  clean: () => {},
});

export const StatsProvider = ({ children }: { children: ReactNode }) => {
  const [hunger, setHunger] = useState(50);
  const [happiness, setHappiness] = useState(100);
  const [dirtiness, setDirtiness] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHunger(h => Math.min(100, h + 0.5));
      setHappiness(h => Math.max(0, h - 0.2));
      setDirtiness(d => Math.min(100, d + 0.1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const feed = (amount: number) => {
    setHunger(h => Math.max(0, h - amount));
    setHappiness(h => Math.min(100, h + 10));
    setDirtiness(d => Math.min(100, d + 5));
  };

  const play = (amount: number) => {
    setHappiness(h => Math.min(100, h + amount));
    setHunger(h => Math.min(100, h + 10));
    setDirtiness(d => Math.min(100, d + 10));
  };

  const clean = (amount: number) => {
    setDirtiness(d => Math.max(0, d - amount));
    setHappiness(h => Math.min(100, h + 5));
  };

  return (
    <StatsContext.Provider value={{ hunger, happiness, dirtiness, feed, play, clean }}>
      {children}
    </StatsContext.Provider>
  );
};
