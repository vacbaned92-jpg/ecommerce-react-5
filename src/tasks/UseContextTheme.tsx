import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function UseContextTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      style={{
        backgroundColor: theme === 'light' ? '#ffffff' : 'black',
        color: theme === 'light' ? 'black' : '#ffffff',
        padding: '20px',
        border: '1px solid gray',
        margin: '10px',
        borderRadius: '8px',
      }}
    >
      <h2>1.1 useContext — Тёмная/светлая тема</h2>
      <button onClick={toggleTheme}>
        Переключить тему (сейчас: {theme})
      </button>
      <p style={{ marginTop: '10px' }}>
        Текущая тема: <strong>{theme}</strong>
      </p>
    </div>
  );
}
export default UseContextTheme;