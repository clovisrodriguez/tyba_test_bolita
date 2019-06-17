import React from 'react';

import amplify from './src/aws-exports';

import Amplify from 'aws-amplify';
import AppNavigator from './src/Main';

Amplify.configure(amplify);

export default function App() {
  return <AppNavigator />;
}
