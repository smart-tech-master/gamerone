import React from 'react';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import Routes from './router';
import { store, history } from 'redux/store';

const App: React.FC = (): JSX.Element => {
  console.log('api endpoint', process.env.REACT_APP_API_ENDPOINT);

  return (
    <Provider store={store}>
      <Routes history={history} />
    </Provider>
  );
};

export default App;
