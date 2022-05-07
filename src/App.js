import { Provider } from 'react-redux';
import store from './store';

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className='App'>Hello</div>
    </Provider>
  );
};

export default App;
