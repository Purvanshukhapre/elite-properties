import React, { createContext, useContext, useState, useRef } from 'react';

const AppContext = createContext();

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export { useApp };

export const AppProvider = ({ children }) => {
  // Global application state
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState('light');
  const idCounter = useRef(0);

  // Notification management
  const addNotification = (notification) => {
    // Use ref-based counter to generate unique IDs without impure functions
    const id = `notif_${++idCounter.current}`;
    
    setNotifications(prev => [...prev, { ...notification, id }]);
    
    // Auto remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Theme management
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const value = {
    // State
    notifications,
    loading,
    theme,
    
    // Methods
    addNotification,
    removeNotification,
    setLoading,
    toggleTheme
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};