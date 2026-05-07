import { useRef, type BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, type FormData } from './schema';

function GoodForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });

  const renderCount = useRef(0);
  renderCount.current += 1;

  const onSubmit = async (data: FormData) => {
    if (data.email === 'taken@example.com') {
      setError('email', { message: 'Этот email уже занят' });
      return;
    }
    alert('Форма успешно отправлена (хорошая реализация)');
    reset();
  };

  const onFormSubmit = (e: BaseSyntheticEvent) => {
    handleSubmit(onSubmit)(e);
  };

  return (
    <div
      style={{
        border: '2px solid green',
        padding: '20px',
        margin: '20px auto',
        borderRadius: '8px',
        maxWidth: '600px',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>
        2.2 «Хорошая» форма (React Hook Form + Zod)
      </h2>
      <p style={{ textAlign: 'center' }}>
        Счётчик ре-рендеров: <strong>{renderCount.current}</strong> (почти не растёт при вводе!)
      </p>

      <form
        onSubmit={onFormSubmit}
        noValidate
        style={{ maxWidth: '450px', margin: '0 auto' }}
      >
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="firstName" style={{ display: 'block', marginBottom: '4px' }}>
            Имя
          </label>
          <input
            id="firstName"
            type="text"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            {...register('firstName')}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.firstName && (
            <span id="firstName-error" role="alert" style={{ color: 'red', fontSize: '0.9em' }}>
              {errors.firstName.message}
            </span>
          )}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="lastName" style={{ display: 'block', marginBottom: '4px' }}>
            Фамилия
          </label>
          <input
            id="lastName"
            type="text"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
            {...register('lastName')}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.lastName && (
            <span id="lastName-error" role="alert" style={{ color: 'red', fontSize: '0.9em' }}>
              {errors.lastName.message}
            </span>
          )}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '4px' }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.email && (
            <span id="email-error" role="alert" style={{ color: 'red', fontSize: '0.9em' }}>
              {errors.email.message}
            </span>
          )}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '4px' }}>
            Пароль
          </label>
          <input
            id="password"
            type="password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            {...register('password')}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.password && (
            <span id="password-error" role="alert" style={{ color: 'red', fontSize: '0.9em' }}>
              {errors.password.message}
            </span>
          )}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '4px' }}>
            Подтверждение пароля
          </label>
          <input
            id="confirmPassword"
            type="password"
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
            {...register('confirmPassword')}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
          {errors.confirmPassword && (
            <span id="confirmPassword-error" role="alert" style={{ color: 'red', fontSize: '0.9em' }}>
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="role" style={{ display: 'block', marginBottom: '4px' }}>
            Роль
          </label>
          <select
            id="role"
            aria-invalid={!!errors.role}
            aria-describedby={errors.role ? 'role-error' : undefined}
            {...register('role')}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          >
            <option value="">Выберите...</option>
            <option value="student">Студент</option>
            <option value="teacher">Преподаватель</option>
          </select>
          {errors.role && (
            <span id="role-error" role="alert" style={{ color: 'red', fontSize: '0.9em' }}>
              {errors.role.message}
            </span>
          )}
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              aria-invalid={!!errors.agree}
              aria-describedby={errors.agree ? 'agree-error' : undefined}
              {...register('agree')}
            />
            Принимаю условия
          </label>
          {errors.agree && (
            <span id="agree-error" role="alert" style={{ color: 'red', fontSize: '0.9em', display: 'block' }}>
              {errors.agree.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#1e293b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1em',
            cursor: 'pointer',
            opacity: isSubmitting ? 0.7 : 1,
          }}
        >
          {isSubmitting ? 'Отправляем...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  );
}

export default GoodForm;