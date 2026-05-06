import { useTheme } from '../context/ThemeContext';

function ThemeDisplay() {
  const { theme } = useTheme();
  return (
    <p style={{ marginTop: '10px' }}>
      Текущая тема: <strong>{theme}</strong>
    </p>
  );
}
export default ThemeDisplay;