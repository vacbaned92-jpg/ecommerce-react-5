import { ThemeProvider } from './context/ThemeProvider';
import UseContextTheme from './tasks/UseContextTheme';
import UseCallbackCounter from './tasks/UseCallbackCounter';
import UseMemoSum from './tasks/UseMemoSum';
import UseRefFocus from './tasks/UseRefFocus';
import UseReducerTodo from './tasks/UseReducerTodo';
import ReactMemoDemo from './tasks/ReactMemoDemo';
import BonusCombinedHooks from './tasks/BonusCombinedHooks';
import BadForm from './tasks/BadForm';

function App() {
  return (
    <ThemeProvider>
      <div>
        <UseContextTheme />
        <UseCallbackCounter />
        <UseMemoSum />
        <UseRefFocus />
        <UseReducerTodo />
        <ReactMemoDemo />
        <BonusCombinedHooks />
        <BadForm />
      </div>
    </ThemeProvider>
  );
}
export default App;