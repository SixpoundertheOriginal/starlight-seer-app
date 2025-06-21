
import { useState, useEffect, useCallback } from 'react';
import localforage from 'localforage';
import { TarotReading } from '@/types/tarot';

const STORAGE_KEY = 'tarot_reading_history';

export const useReadingHistory = () => {
  const [readings, setReadings] = useState<TarotReading[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load readings from storage on mount
  useEffect(() => {
    const loadReadings = async () => {
      try {
        const storedReadings = await localforage.getItem<TarotReading[]>(STORAGE_KEY);
        if (storedReadings) {
          // Parse timestamp strings back to Date objects
          const parsedReadings = storedReadings.map(reading => ({
            ...reading,
            timestamp: new Date(reading.timestamp)
          }));
          setReadings(parsedReadings.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
        }
      } catch (error) {
        console.error('Failed to load reading history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReadings();
  }, []);

  const saveReading = useCallback(async (reading: TarotReading) => {
    try {
      const updatedReadings = [reading, ...readings].slice(0, 50); // Keep last 50 readings
      setReadings(updatedReadings);
      await localforage.setItem(STORAGE_KEY, updatedReadings);
    } catch (error) {
      console.error('Failed to save reading:', error);
    }
  }, [readings]);

  const deleteReading = useCallback(async (readingId: string) => {
    try {
      const updatedReadings = readings.filter(r => r.id !== readingId);
      setReadings(updatedReadings);
      await localforage.setItem(STORAGE_KEY, updatedReadings);
    } catch (error) {
      console.error('Failed to delete reading:', error);
    }
  }, [readings]);

  const clearHistory = useCallback(async () => {
    try {
      setReadings([]);
      await localforage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  }, []);

  return {
    readings,
    isLoading,
    saveReading,
    deleteReading,
    clearHistory
  };
};
