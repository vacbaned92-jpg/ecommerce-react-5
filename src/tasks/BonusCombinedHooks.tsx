import { useReducer, useState, useMemo, useCallback, useContext, useRef } from 'react';
import { ThemeContext } from '../context/ThemeContext';

interface Item {
  id: number;
  text: string;
  status: 'active' | 'completed';
}

type Action =
  | { type: 'ADD_ITEM'; payload: string }
  | { type: 'TOGGLE_STATUS'; payload: number }
  | { type: 'DELETE_ITEM'; payload: number };

function itemReducer(state: Item[], action: Action): Item[] {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, { id: Date.now(), text: action.payload, status: 'active' }];
    case 'TOGGLE_STATUS':
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, status: item.status === 'active' ? 'completed' : 'active' }
          : item
      );
    case 'DELETE_ITEM':
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}

function BonusCombinedHooks() {
  const [items, dispatch] = useReducer(itemReducer, []);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { theme, toggleTheme } = useContext(ThemeContext);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const handleAdd = useCallback(() => {
    if (input.trim()) {
      dispatch({ type: 'ADD_ITEM', payload: input.trim() });
      setInput('');
    }
  }, [input]);
  const handleToggle = useCallback((id: number) => {
    dispatch({ type: 'TOGGLE_STATUS', payload: id });
  }, []);
  const handleDelete = useCallback((id: number) => {
    dispatch({ type: 'DELETE_ITEM', payload: id });
  }, []);
  const handleFocusSearch = useCallback(() => {
    searchInputRef.current?.focus();
  }, []);

  const filteredItems = useMemo(() => {
    let result = items;
    if (search.trim()) {
      result = result.filter((item) =>
        item.text.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filterStatus !== 'all') {
      result = result.filter((item) => item.status === filterStatus);
    }
    return result;
  }, [items, search, filterStatus]);
  const containerStyle = {
    border: '1px solid teal',
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    backgroundColor: theme === 'light' ? '#ffffff' : 'black',
    color: theme === 'light' ? 'black' : '#ffffff',
  };
  return (
    <div style={containerStyle}>
      <h2>1.7 Бонус — Комбинирование хуков</h2>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <button onClick={toggleTheme}>
          Переключить тему (сейчас: {theme})
        </button>
        <button onClick={handleFocusSearch}>Фокус на поиск</button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Новая запись"
          style={{ flex: 1, padding: '5px' }}
        />
        <button onClick={handleAdd}>Добавить</button>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <input
          ref={searchInputRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск..."
          style={{ width: '100%', padding: '5px' }}
        />
      </div>

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px' }}
      >
        <option value="all">Все</option>
        <option value="active">Активные</option>
        <option value="completed">Завершённые</option>
      </select>

      <p style={{ fontSize: '0.9em', fontStyle: 'italic' }}>
        (Кликни по тексту записи чтобы переключить статус)
      </p>

      {filteredItems.length === 0 ? (
        <p>Нет записей</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredItems.map((item) => (
            <li
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '5px',
                textDecoration: item.status === 'completed' ? 'line-through' : 'none',
              }}
            >
              <span
                onClick={() => handleToggle(item.id)}
                style={{
                  cursor: 'pointer',
                  fontWeight: item.status === 'active' ? 'bold' : 'normal',
                }}
                title="Кликните для смены статуса"
              >
                {item.text}
              </span>
              <span style={{ fontSize: '0.8em', color: '#888' }}>
                [{item.status === 'active' ? 'активная' : 'завершённая'}]
              </span>
              <button
                onClick={() => handleDelete(item.id)}
                style={{ color: 'red', marginLeft: 'auto' }}
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
      <p style={{ fontSize: '0.85em', marginTop: '10px' }}>
        Используются: <code>useReducer</code> (состояние списка),{' '}
        <code>useMemo</code> (фильтрация), <code>useCallback</code> (колбэки),{' '}
        <code>useContext</code> (тема), <code>useRef</code> (фокус на поиске).
      </p>
    </div>
  );
}
export default BonusCombinedHooks;