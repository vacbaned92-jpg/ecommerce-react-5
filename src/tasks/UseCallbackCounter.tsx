import { useState, useCallback } from 'react';
import ButtonWithLog from './ButtonWithLog';

function UseCallbackCounter() {
  const [count, setCount] = useState(0);
  const [randomValue, setRandomValue] = useState(Math.random());
  const [useOptimization, setUseOptimization] = useState(true);
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  const incrementUnoptimized = () => setCount(c => c + 1);

  const randomize = () => setRandomValue(Math.random());

  console.log('UseCallbackCounter render');

  return (
    <div style={{ border: '1px solid blue', padding: '20px', margin: '10px', borderRadius: '8px' }}>
      <h2>1.2 useCallback — Оптимизация обработчиков</h2>
      <p>Счётчик: {count}</p>
      <p>Случайное число: {randomValue.toFixed(4)}</p>

      <ButtonWithLog
        onClick={useOptimization ? increment : incrementUnoptimized}
        label="Увеличить счётчик"
      />

      <button onClick={randomize} style={{ marginLeft: '10px' }}>
        Обновить случайное число
      </button>

      <div style={{ marginTop: '10px' }}>
        <label>
          <input
            type="checkbox"
            checked={useOptimization}
            onChange={() => setUseOptimization(prev => !prev)}
          />
          Использовать useCallback
        </label>
      </div>

      <p style={{ fontSize: '0.9em' }}>
        Если оптимизация включена, при нажатии на «Обновить случайное число» 
        в консоли <strong>нет</strong> логов "ButtonWithLog render" (ре-рендера дочерней кнопки).
        Если оптимизация выключена - при каждом обновлении числа появляется лишний лог
      </p>
    </div>
  );
}
export default UseCallbackCounter;