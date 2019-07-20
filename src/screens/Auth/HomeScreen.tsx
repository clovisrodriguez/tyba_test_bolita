import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  ImageBackground
} from 'react-native';
import { Button, Image } from 'react-native-elements';
import { ROUTES } from '../../routes';
import { NavigationScreenProp } from 'react-navigation';
import { styles, theme } from '../../theme/index';
import background from '../../../assets/background.jpg';
import logo from '../../../assets/logo-blanco.png';
import { Auth } from 'aws-amplify';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export interface IProps {
  navigation: NavigationScreenProp<any, any>;
  buttonStyle?: StyleProp<ViewStyle>;
}

class HomeScreen extends Component<IProps, object> {
  constructor(props) {
    super(props);
    this._authUser();
  }

  _authUser = async () => {
    await Auth.currentSession().then(() =>
      this.props.navigation.navigate(ROUTES.Dashboard)
    );
  };

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
            title='INGRESAR'
            titleStyle={{ color: theme.colors.secondary }}
            onPress={() => {
              this.props.navigation.navigate(ROUTES.LoginScreen);
            }}
          />
          <Button
            title='REGISTRARSE'
            buttonStyle={styles.greenButtonOutline}
            type='outline'
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
    padding: 20
  },
  logo: {
    width: 180,
    height: 193,
    marginBottom: hp('20%')
  },
  background: {
    height: '100%',
    width: '100%'
  }
});

export default HomeScreen;
