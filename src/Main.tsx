import React from 'react';
import AppContainer from './routes';
import { ThemeProvider } from 'react-native-elements';
import { theme } from './theme/index';
import { Provider } from 'react-redux';
import store from './store/index';
import Amplify from 'aws-amplify';
import awsmobile from '../aws-exports';

Amplify.configure(awsmobile);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
