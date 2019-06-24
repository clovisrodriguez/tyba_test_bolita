import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/Auth/HomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import ConfirmationScreen from '../screens/Auth/ConfirmationScreen';
import Dashboard from '../screens/Dashboard';

export enum ROUTES {
  HomeScreen = 'HomeScreen',
  LoginScreen = 'LoginScreen',
  SignupScreen = 'SignupScreen',
  ConfirmationScreen = 'ConfirmationScreen',
  Dashboard = 'Dashboard'
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
  },
  [ROUTES.ConfirmationScreen]: {
    screen: ConfirmationScreen,
    navigationOptions: {
      title: [ROUTES.ConfirmationScreen],
      header: null
    }
  },
  [ROUTES.Dashboard]: {
    screen: Dashboard,
    navigationOptions: {
      title: [ROUTES.Dashboard],
      header: null
    }
  }
});

const AppContainer = createAppContainer(ScreenStack);

export default AppContainer;
