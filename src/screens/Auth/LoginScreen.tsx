import React, { Component } from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, Text } from 'react-native';
import { ROUTES } from '../../routes';
import { NavigationScreenProp } from 'react-navigation';
import { Button, Input } from 'react-native-elements';
import { styles, theme } from '../../theme/index';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { formatPhoneNumber } from '../../validators/format';
import { faMobile, faKey } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/logo-white-shadow.png';
import { Auth } from 'aws-amplify';
import AnimatedLoader from 'react-native-animated-loader';
import Snackbar from 'react-native-snackbar-component';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {}

const PASSAWORD = 'password';
const PHONE_NUMBER = 'phone_number';

class LoginScreen extends Component<IProps, IState> {
  state = {
    password: null,
    phone_number: null,
    loading: false,
    snackIsVisible: false,
    errorMessage: '',
    isDisable: true
  };

  updateText(key, value) {
    if (key === PHONE_NUMBER) {
      value = formatPhoneNumber(value);
    }

    if (this.state.password && this.state.phone_number) {
      this.setState({
        isDisable: false
      });
    }

    this.setState({
      [key]: value
    });
  }

  signIn() {
    this.setState({
      loading: true
    });
    const { password, phone_number } = this.state;
    let phoneNumber = `+${phone_number.replace(/[^0-9.]+/g, '')}`;
    Auth.signIn(phoneNumber, password)
      .then(() => {
        this.setState({ loading: false });
        this.props.navigation.navigate(ROUTES.Dashboard);
      })
      .catch(err => {
        console.log('error sign!:', err);
        this.setState({
          loading: false,
          errorMessage: err.message,
          snackIsVisible: true
        });
      });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={pageStyles.container}>
        <AnimatedLoader
          visible={this.state.loading}
          overlayColor="rgba(255,255,255,0.75)"
          animationStyle={styles.lottie}
          speed={1}
        />
        <Snackbar
          visible={this.state.snackIsVisible}
          textMessage={this.state.errorMessage}
          onPressed={() => this.setState({ snackIsVisible: false })}
        />
        <Image source={logo} style={pageStyles.logo} />
        <Input
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
          leftIcon={
            <FontAwesomeIcon
              icon={faMobile}
              size={20}
              color={theme.colors.primary}
            />
          }
          leftIconContainerStyle={{
            position: 'absolute',
            top: 12,
            left: 0,
            zIndex: 2
          }}
          inputStyle={styles.input}
          value={this.state.phone_number}
          placeholder="Ingresa tu celular"
          inputContainerStyle={{ borderBottomWidth: 0 }}
          onChangeText={value => this.updateText(PHONE_NUMBER, value)}
        />
        <Input
          keyboardType="default"
          textContentType="password"
          secureTextEntry={true}
          leftIcon={
            <FontAwesomeIcon
              icon={faKey}
              size={20}
              color={theme.colors.primary}
            />
          }
          leftIconContainerStyle={{
            position: 'absolute',
            top: 12,
            left: 0,
            zIndex: 2
          }}
          inputStyle={styles.input}
          placeholder="Ingresa tu clave"
          inputContainerStyle={{ borderBottomWidth: 0 }}
          onChangeText={value => this.updateText(PASSAWORD, value)}
        />
        <Button
          buttonStyle={styles.greenButton}
          title="INGRESAR"
          titleStyle={{ color: '#fff', fontWeight: 'bold' }}
          onPress={this.signIn.bind(this)}
          disabled={this.state.isDisable}
        />
        <Text
          onPress={() => {
            this.props.navigation.navigate(ROUTES.HomeScreen);
          }}
        >
          Volver
        </Text>
      </KeyboardAvoidingView>
    );
  }
}

const pageStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.whiteBackground,
    padding: 20
  },
  logo: {
    width: 104,
    height: 112,
    marginBottom: '10%'
  }
});

export default LoginScreen;
