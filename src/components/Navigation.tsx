import React, { Component } from 'react';
import { ROUTES } from '../routes/index';
import { NavigationScreenProp } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { theme } from '../theme/index';
import { faQrcode, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

export default class NavigationComponent extends Component<IProps, any> {
  render() {
    return (
      <View style={navigationStyles.container}>
        <FontAwesomeIcon
          icon={faQrcode}
          size={34}
          color={theme.colors.secondary}
          onPress={() => this.props.navigation.navigate(ROUTES.QRScreen)}
          style={navigationStyles.icon}
        />
        <FontAwesomeIcon
          icon={faPlayCircle}
          size={34}
          color={theme.colors.secondary}
          onPress={() => this.props.navigation.navigate(ROUTES.Dashboard)}
          style={navigationStyles.icon}
        />
      </View>
    );
  }
}

const navigationStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  icon: {
    marginLeft: 18,
    marginRight: 18
  }
});
