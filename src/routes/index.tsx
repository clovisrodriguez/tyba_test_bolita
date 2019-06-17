import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

export enum ROUTES {
  HomeScreen = 'HomeScreen',
  LoginScreen = 'LoginScreen',
  SignupScreen = 'SignupScreen'
}

const ScreenStack = createStackNavigator({
  [ROUTES.HomeScreen]: {
    screen: HomeScreen,
    navigationOptions: {
      title: [ROUTES.HomeScreen],
      header: null
    }
  },
  [ROUTES.LoginScreen]: {
    screen: LoginScreen,
    navigationOptions: {
      title: [ROUTES.LoginScreen],
      header: null
    }
  },
  [ROUTES.SignupScreen]: {
    screen: SignupScreen,
    navigationOptions: {
      title: [ROUTES.SignupScreen],
      header: null
    }
  }
});

const AppContainer = createAppContainer(ScreenStack);

export default AppContainer;
