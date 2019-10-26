import React from 'react';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import Dashboard from '../screens/Dashboard';
import LoginScreen from '../screens/Auth/LoginScreen';
import HomeScreen from '../screens/Auth/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import SignupScreen from '../screens/Auth/SignupScreen';

import NavigationComponent from '../components/Navigation';

export enum ROUTES {
  Dashboard = 'Dashboard',
  HomeScreen = 'HomeScreen',
  LoginScreen = 'LoginScreen',
  PasswordRecoveryScreen = 'PasswordRecoveryScreen',
  ProfileScreen = 'ProfileScreen',
  SignupScreen = 'SignupScreen',
  TransactionsRecordScreen = 'TransactionsRecordScreen'
}

const AuthStack = createStackNavigator({
  [ROUTES.HomeScreen]: {
    screen: HomeScreen,
    navigationOptions: {
      title: [ROUTES.HomeScreen],
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
  [ROUTES.LoginScreen]: {
    screen: LoginScreen,
    navigationOptions: {
      title: [ROUTES.LoginScreen],
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

const ProfileStack = createBottomTabNavigator({
  [ROUTES.ProfileScreen]: {
    screen: ProfileScreen,
    navigationOptions: {
      title: [ROUTES.ProfileScreen],
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
      Profile: ProfileStack
    },
    {
      initialRouteName: 'Auth'
    }
  )
);

export default AppContainer;
