import { useState, useRef, useEffect } from 'react';

function UseRefFocus() {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const prevValueRef = useRef<string>('');

  useEffect(() => {
    prevValueRef.current = value;
  }, [value]);

  const handleFocus = () => {
    inputRef.current?.focus();
  };
  return (
    <div style={{ border: '1px solid purple', padding: '20px', margin: '10px', borderRadius: '8px' }}>
      <h2>1.4 useRef — Фокус и предыдущее значение</h2>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Введите текст"
          style={{ padding: '5px' }}
        />
        <button onClick={handleFocus}>Фокус на поле</button>
      </div>
      <p>Текущее значение: "{value}"</p>
      <p>Предыдущее значение: "{prevValueRef.current}"</p>
    </div>
  );
}
export default UseRefFocus;