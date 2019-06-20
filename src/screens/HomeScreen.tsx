import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  ImageBackground
} from 'react-native';
import { Button, Image } from 'react-native-elements';
import { ROUTES } from '../routes';
import { NavigationScreenProp } from 'react-navigation';
import { styles, theme } from '../theme/index';
import background from '../../assets/background.jpg';
import logo from '../../assets/logo-blanco.png';

export interface IProps {
  navigation: NavigationScreenProp<any, any>;
  buttonStyle?: StyleProp<ViewStyle>;
}

class HomeScreen extends Component<IProps, object> {
  static navigationOptions = {
    title: 'This is home'
  };

  render() {
    return (
      <ImageBackground source={background} style={pageStyles.background}>
        <View style={pageStyles.container}>
          <Image source={logo} style={pageStyles.logo} />
          <Button
            buttonStyle={styles.greenButton}
            title="INGRESAR"
            titleStyle={{ color: theme.colors.secondary }}
            onPress={() => {
              this.props.navigation.navigate(ROUTES.LoginScreen);
            }}
          />
          <Button
            title="REGISTRARSE"
            buttonStyle={styles.greenButtonOutline}
            type="outline"
            onPress={() => {
              this.props.navigation.navigate(ROUTES.SignupScreen);
            }}
          />
        </View>
      </ImageBackground>
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

export default HomeScreen;
