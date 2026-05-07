import React from 'react';

interface MemoChildProps {
  label: string;
  onClick: () => void;
}
const MemoChild: React.FC<MemoChildProps> = React.memo(({ label, onClick }) => {
  console.log('MemoChild render');
  return (
    <button onClick={onClick} style={{ padding: '5px 10px' }}>
      {label}
    </button>
  );
});
export default MemoChild;