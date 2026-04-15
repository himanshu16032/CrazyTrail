import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'crazytrail-form-data';

export function useLocalStorage(initialValue = {}) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedValue));
    } catch { /* quota exceeded or private browsing */ }
  }, [storedValue]);

  const clearStorage = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setStoredValue(initialValue);
  }, [initialValue]);

  return [storedValue, setStoredValue, clearStorage];
}
