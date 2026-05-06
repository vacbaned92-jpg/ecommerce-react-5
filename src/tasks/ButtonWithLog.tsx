import React from 'react';

interface ButtonWithLogProps {
  onClick: () => void;
  label: string;
}
const ButtonWithLog: React.FC<ButtonWithLogProps> = React.memo(({ onClick, label }) => {
  console.log('ButtonWithLog render');
  return <button onClick={onClick}>{label}</button>;
});
export default ButtonWithLog;