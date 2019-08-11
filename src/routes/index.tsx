import React from 'react';
import NavigationComponent from '../components/Navigation';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import HomeScreen from '../screens/Auth/HomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import ConfirmationScreen from '../screens/Auth/ConfirmationScreen';
import Dashboard from '../screens/Dashboard';
import QRScreen from '../screens/Transactions/QRScreen';
import TransactionsScreen from '../screens/Transactions/TransactionsScreen';
import ConfirmationTransactionScreen from '../screens/Transactions/ConfirmationScreen';
import PasswordRecoveryScreen from '../screens/Auth/PasswordRecoveryScreen';

export enum ROUTES {
  ConfirmationScreen = 'ConfirmationScreen',
  ConfirmationTransactionScreen = 'ConfirmationTransactionScreen',
  Dashboard = 'Dashboard',
  HomeScreen = 'HomeScreen',
  LoginScreen = 'LoginScreen',
  QRScreen = 'QRScreen',
  SignupScreen = 'SignupScreen',
  PasswordRecoveryScreen = 'PasswordRecoveryScreen',
  TransactionsScreen = 'TransactionsScreen'
}

const AuthStack = createStackNavigator({
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
  [ROUTES.PasswordRecoveryScreen]: {
    screen: PasswordRecoveryScreen,
    navigationOptions: {
      title: [ROUTES.PasswordRecoveryScreen],
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
  }
});

const AppStack = createBottomTabNavigator({
  [ROUTES.Dashboard]: {
    screen: Dashboard,
    navigationOptions: {
      title: [ROUTES.Dashboard],
      header: null,
      tabBarComponent: ({ navigation }) => (
        <NavigationComponent navigation={navigation} />
      )
    }
  }
});

const TransactionsStack = createBottomTabNavigator({
  [ROUTES.QRScreen]: {
    screen: QRScreen,
    navigationOptions: {
      title: [ROUTES.QRScreen],
      header: null,
      tabBarComponent: ({ navigation }) => (
        <NavigationComponent navigation={navigation} />
      )
    }
  },
  [ROUTES.TransactionsScreen]: {
    screen: TransactionsScreen,
    navigationOptions: {
      title: [ROUTES.TransactionsScreen],
      header: null,
      tabBarComponent: ({ navigation }) => (
        <NavigationComponent navigation={navigation} />
      )
    }
  },
  [ROUTES.ConfirmationTransactionScreen]: {
    screen: ConfirmationTransactionScreen,
    navigationOptions: {
      title: [ROUTES.ConfirmationTransactionScreen],
      header: null,
      tabBarComponent: ({ navigation }) => (
        <NavigationComponent navigation={navigation} />
      )
    }
  }
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: AppStack,
      Transactions: TransactionsStack
    },
    {
      initialRouteName: 'Auth'
    }
  )
);

export default AppContainer;
