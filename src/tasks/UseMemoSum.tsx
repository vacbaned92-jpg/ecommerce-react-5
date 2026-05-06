import { useState, useMemo } from 'react';

function generateRandomArray(length: number): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * 100));
}

function UseMemoSum() {
  const [arrayLength, setArrayLength] = useState(5);
  const [trigger, setTrigger] = useState(0);
  const [unrelatedState, setUnrelatedState] = useState(false);
  const numbers = useMemo(() => {
    console.log('Генерация нового массива...');
    return generateRandomArray(arrayLength);
  }, [arrayLength, trigger]);
  const sum = useMemo(() => {
    console.log('Вычисление суммы...');
    return numbers.reduce((acc, num) => acc + num, 0);
  }, [numbers]);
  return (
    <div style={{ border: '1px solid green', padding: '20px', margin: '10px', borderRadius: '8px' }}>
      <h2>1.3 useMemo — Оптимизация вычислений</h2>

      <p>Длина массива: {arrayLength}</p>
      <p>Массив: [{numbers.join(', ')}]</p>
      <p>Сумма: {sum}</p>

      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        <button onClick={() => setTrigger(t => t + 1)}>
          Сгенерировать новый массив
        </button>
        <button onClick={() => setUnrelatedState(s => !s)}>
          Обновить несвязанное состояние (сейчас: {String(unrelatedState)})
        </button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>
          Длина массива:{' '}
          <input
            type="number"
            value={arrayLength}
            onChange={(e) => setArrayLength(Number(e.target.value) || 1)}
            min="1"
            max="20"
            style={{ width: '60px' }}
          />
        </label>
      </div>
      <p style={{ fontSize: '0.9em' }}>
        При нажатии «Обновить несвязанное состояние» нет новых логов генерации или вычисления суммы - useMemo предотвращает лишнюю работу.
        При изменении длины массива или нажатии «Сгенерировать новый массив» логи появятся
      </p>
    </div>
  );
}
export default UseMemoSum;