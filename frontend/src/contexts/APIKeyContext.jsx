import React, { createContext, useContext, useState, useEffect } from 'react';

const APIKeyContext = createContext();

export const useAPIKey = () => {
  const context = useContext(APIKeyContext);
  if (!context) {
    throw new Error('useAPIKey must be used within APIKeyProvider');
  }
  return context;
};

export const APIKeyProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState('');

  // Load API key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('a4f_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  const saveAPIKey = (key) => {
    setApiKey(key);
    localStorage.setItem('a4f_api_key', key);
  };

  const clearAPIKey = () => {
    setApiKey('');
    localStorage.removeItem('a4f_api_key');
  };

  const hasAPIKey = () => {
    return apiKey && apiKey.trim().length > 0;
  };

  return (
    <APIKeyContext.Provider value={{ apiKey, saveAPIKey, clearAPIKey, hasAPIKey }}>
      {children}
    </APIKeyContext.Provider>
  );
};