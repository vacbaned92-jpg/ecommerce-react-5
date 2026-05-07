import { useState, useRef, type FormEvent } from 'react';

function BadForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const renderCount = useRef(0);
  renderCount.current += 1;
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!email.includes('@')) {
      newErrors.email = 'Email должен содержать @';
    }
    if (password.length < 8) {
      newErrors.password = 'Минимум 8 символов';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    if (!firstName.trim()) {
      newErrors.firstName = 'Имя обязательно';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Фамилия обязательна';
    }
    if (!role) {
      newErrors.role = 'Выберите роль';
    }
    if (!agree) {
      newErrors.agree = 'Необходимо принять условия';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (email === 'taken@example.com') {
      alert('Этот email уже занят');
      return;
    }
    alert('Форма отправлена (плохая реализация)');
  };

  return (
    <div style={{ border: '2px solid red', padding: '20px', margin: '10px', borderRadius: '8px' }}>
      <h2>2.1 «Плохая» форма (useState на каждое поле + alert)</h2>
      <p>Счётчик ре-рендеров: <strong>{renderCount.current}</strong> (обновляется при каждом вводе символа)</p>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: '8px' }}>
          <label htmlFor="firstName">Имя</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label htmlFor="lastName">Фамилия</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label htmlFor="confirmPassword">Подтверждение пароля</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
        </div>
        <div style={{ marginBottom: '8px' }}>
          <label htmlFor="role">Роль</label>
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Выберите...</option>
            <option value="student">Студент</option>
            <option value="teacher">Преподаватель</option>
          </select>
          {errors.role && <span style={{ color: 'red' }}>{errors.role}</span>}
        </div>

        <div style={{ marginBottom: '8px' }}>
          <label>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            Принимаю условия
          </label>
          {errors.agree && <span style={{ color: 'red' }}>{errors.agree}</span>}
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>

      <div style={{ marginTop: '15px', fontSize: '0.85em' }}>
        <p><strong>Почему этот код плохой:</strong></p>
        <p>Отдельный useState на каждое поле - лишние ре-рендеры,
            ручная валидация и примитивные проверки,
            ошибки в alert - крайне неинформативно и не интегрировано в форму,
            нет aria-атрибутов,
            кнопка не блокируется при отправке, возможны двойные запросы.
        </p>
      </div>
    </div>
  );
}

export default BadForm;