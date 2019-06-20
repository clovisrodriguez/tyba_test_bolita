import React from 'react';
import AppContainer from './routes';
import { ThemeProvider } from 'react-native-elements';
import { theme } from './theme/index';
import { Provider } from 'react-redux';
import store from './store/index';

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
