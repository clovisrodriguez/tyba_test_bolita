import React from 'react';
import AppContainer from './routes';
import { ThemeProvider } from 'react-native-elements';
import { theme } from './theme/index';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer />
    </ThemeProvider>
  );
};

export default App;
