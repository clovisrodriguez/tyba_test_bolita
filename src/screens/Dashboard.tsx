import React, { Component } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, Text } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

export interface IProps {
  navigation: NavigationScreenProp<any, any>;
  buttonStyle?: StyleProp<ViewStyle>;
}

class Dashboard extends Component<IProps, object> {
  static navigationOptions = {
    title: 'This is home'
  };

  render() {
    return (
      <View style={pageStyles.container}>
        <Text>This is Dashboard, You are logged in!</Text>
      </View>
    );
  }
}

const pageStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: '100%'
  },
  logo: {
    width: 180,
    height: 193,
    marginBottom: '20%'
  },
  background: {
    width: '100%',
    height: '100%'
  }
});

export default Dashboard;
