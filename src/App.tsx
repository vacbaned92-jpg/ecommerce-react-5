import UseContextTheme from './tasks/UseContextTheme';
import UseCallbackCounter from './tasks/UseCallbackCounter';
import UseMemoSum from './tasks/UseMemoSum';
import UseRefFocus from './tasks/UseRefFocus';
import UseReducerTodo from './tasks/UseReducerTodo';
import ReactMemoDemo from './tasks/ReactMemoDemo';

function App() {
  return (
    <div>
      <UseContextTheme />
      <UseCallbackCounter />
      <UseMemoSum />
      <UseRefFocus />
      <UseReducerTodo />
      <ReactMemoDemo />
    </div>
  );
}

export default App;