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
import { Auth } from 'aws-amplify';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppLoading } from 'expo';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  buttonStyle?: StyleProp<ViewStyle>;
}

interface IState {
  isReady: Boolean;
}

class HomeScreen extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this._userIsAuth = this._userIsAuth.bind(this);
    this.state = {
      isReady: false
    };
  }

  _userIsAuth = async () => {
    try {
      await Auth.currentSession();
      this.setState({ isReady: true });
      this.props.navigation.navigate(ROUTES.Dashboard);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      this.setState({ isReady: true });
    }
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._userIsAuth}
          onFinish={() => this.setState({ isReady: true })}
          onError={error => console.log(error)}
        />
      );
    }
    return (
      <View style={pageStyles.container}>
        <Image
          source={require('../../../assets/logo_transparent.png')}
          style={pageStyles.logo}
        />
        <View style={pageStyles.whiteContainer}>
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
      </View>
    );
  }
}

const pageStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    padding: hp('4%'),
    paddingBottom: 0
  },
  logo: {
    width: 180,
    height: 215,
    marginBottom: hp('20%')
  },
  whiteContainer: {
    backgroundColor: theme.colors.whiteBackground,
    borderRadius: hp('2%'),
    height: hp('50%'),
    padding: hp('2%')
  },
  background: {
    height: '100%',
    width: '100%'
  }
});

export default HomeScreen;
