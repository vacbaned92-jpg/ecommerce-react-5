import { useState, useCallback } from 'react';
import MemoChild from './MemoChild';

function ReactMemoDemo() {
  const [count, setCount] = useState(0);
  const [unrelatedValue, setUnrelatedValue] = useState(0);
  const [useOptimization, setUseOptimization] = useState(true);
  const incrementOptimized = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  const incrementUnoptimized = () => setCount(c => c + 1);
  const incrementUnrelated = () => setUnrelatedValue(v => v + 1);
  return (
    <div style={{ border: '1px solid crimson', padding: '20px', margin: '10px', borderRadius: '8px' }}>
      <h2>1.6 React.memo — Оптимизация рендеринга</h2>
      <p>Счётчик: {count}</p>
      <p>Несвязанное значение: {unrelatedValue}</p>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <MemoChild
          onClick={useOptimization ? incrementOptimized : incrementUnoptimized}
          label="Увеличить счётчик"
        />
        <button onClick={incrementUnrelated}>
          Увеличить несвязанное значение
        </button>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          <input
            type="checkbox"
            checked={useOptimization}
            onChange={() => setUseOptimization(prev => !prev)}
          />
          Использовать useCallback для колбэка
        </label>
      </div>
      <div>
        <p><strong>Что происходит:</strong></p>
        <p style={{ fontSize: '0.9em' }}>
        Кнопка "Увеличить счётчик" обёрнута в React.memo. 
        Когда мы используем useCallback, при нажатии "Увеличить несвязанное значение" в консоли не появляются логи "MemoChild render" - дочерний компонент не перерисовывается, т.к его пропсы не изменились
        Когда мы не используем useCallback, при нажатии "Увеличить несвязанное значение" в консоли появляется лог "MemoChild render" - хотя само значение счётчика не меняется, но из-за пересоздания колбэка пропс onClick меняется и React.memo думает, что пропсы изменились
        </p>
      </div>
    </div>
  );
}
export default ReactMemoDemo;