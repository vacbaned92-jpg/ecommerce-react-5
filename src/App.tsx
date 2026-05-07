import UseContextTheme from './tasks/UseContextTheme';
import UseCallbackCounter from './tasks/UseCallbackCounter';
import UseMemoSum from './tasks/UseMemoSum';
import UseRefFocus from './tasks/UseRefFocus';

function App() {
  return (
    <div>
      <UseContextTheme />
      <UseCallbackCounter />
      <UseMemoSum />
      <UseRefFocus />
    </div>
  );
}

export default App;