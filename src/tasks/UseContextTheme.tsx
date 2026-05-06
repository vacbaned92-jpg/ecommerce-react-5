import { useState, useEffect, useCallback } from 'react';
import { ThemeContext, type Theme } from '../context/ThemeContext';
import ThemeDisplay from './ThemeDisplay';

function UseContextTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        style={{
          backgroundColor: theme === 'light' ? '#ffffffff' : 'black',
          color: theme === 'light' ? 'black' : '#ffffffff',
          padding: '20px',
          border: '1px solid gray',
          margin: '10px',
          borderRadius: '8px',
        }}
      >
        <h2>1.1 useContext — Тёмная/светлая тема</h2>
        <button onClick={toggleTheme}>
          Переключить тему
        </button>
        <ThemeDisplay />
      </div>
    </ThemeContext.Provider>
  );
}
export default UseContextTheme;