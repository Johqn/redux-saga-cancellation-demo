import { Provider } from 'react-redux';
import CounterTester from './components/CounterTester';
import store from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <CounterTester />
    </Provider>
  );
};

export default App;
