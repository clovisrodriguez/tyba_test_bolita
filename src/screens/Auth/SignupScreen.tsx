import React, { Component } from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, Text } from 'react-native';
import { ROUTES } from '../../routes';
import { NavigationScreenProp } from 'react-navigation';
import { Button, Input } from 'react-native-elements';
import { styles, theme } from '../../theme/index';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  enableSubmit,
  validateUserName,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validateRepeatPassword
} from '../../validators/auth';
import { formatPhoneNumber } from '../../validators/format';
import {
  faPoo,
  faEnvelope,
  faMobile,
  faKey
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/logo-white-shadow.png';
import { Auth } from 'aws-amplify';
import AnimatedLoader from 'react-native-animated-loader';
import Snackbar from 'react-native-snackbar-component';
import updateUser from '../../store/actions/storeUser';
import { CreateUserInput, User_type } from '../../API';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {}

const NAME = 'name';
const EMAIL = 'email';
const PASSAWORD = 'password';
const REPEAT_PASSWORD = 'repeat_password';
const PHONE_NUMBER = 'phone_number';

class LoginScreen extends Component<IProps, IState> {
  state = {
    name: null,
    email: null,
    password: null,
    repeat_password: null,
    phone_number: null,
    valid_name: true,
    valid_email: true,
    valid_password: true,
    valid_match_passwords: true,
    valid_phone_number: true,
    loading: false,
    snackIsVisible: false,
    errorMessage: ''
  };

  updateText(key, value) {
    if (key === NAME) {
      value = value.toLowerCase();
    }

    if (key === PHONE_NUMBER) {
      value = formatPhoneNumber(value);
    }

    this.validators(key, value);

    this.setState({
      [key]: value
    });
  }

  validators(key, value) {
    switch (key) {
      case NAME:
        this.setState({
          valid_name: validateUserName(value)
        });
        break;
      case EMAIL:
        this.setState({
          valid_email: validateEmail(value)
        });
        break;
      case PHONE_NUMBER:
        this.setState({
          valid_phone_number: validatePhoneNumber(value)
        });
        break;
      case PASSAWORD:
        this.setState({
          valid_password: validatePassword(value)
        });
        break;
      case REPEAT_PASSWORD:
        this.setState({
          valid_match_passwords: validateRepeatPassword(
            value,
            this.state.password
          )
        });
        break;
    }
  }

  signUp() {
    this.setState({
      loading: true
    });
    const { email, name, password, phone_number } = this.state;
    let phoneNumber = `+${phone_number.replace(/[^0-9.]+/g, '')}`;
    Auth.signUp({
      username: phoneNumber,
      password: password,
      attributes: {
        email: email,
        name: name
      }
    })
      .then(() => {
        const user: CreateUserInput = {
          type: User_type.REGULAR_USER,
          nickname: name,
          phone_number: phoneNumber,
          email: email,
          cmus: 0
        };
        updateUser(user);
        this.setState({ loading: false });
        this.props.navigation.navigate(ROUTES.ConfirmationScreen, { password });
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
          textContentType="name"
          leftIcon={
            <FontAwesomeIcon
              icon={faPoo}
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
          placeholder="Ingresa tu nombre"
          inputContainerStyle={{ borderBottomWidth: 0 }}
          onChangeText={value => this.updateText(NAME, value)}
          errorMessage={
            this.state.valid_name
              ? ''
              : 'Tu primer nombre entre 3 a 10 caracteres, una sola palabra'
          }
        />
        <Input
          keyboardType="email-address"
          textContentType="emailAddress"
          leftIcon={
            <FontAwesomeIcon
              icon={faEnvelope}
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
          placeholder="Ingresa tu correo"
          inputContainerStyle={{ borderBottomWidth: 0 }}
          onChangeText={value => this.updateText(EMAIL, value)}
          errorMessage={
            this.state.valid_email ? '' : 'Ingresa un correo valido'
          }
        />
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
          errorMessage={
            this.state.valid_phone_number
              ? ''
              : 'Ingresa un numero valido, solo celulares en Colombia'
          }
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
          placeholder="Elige una clave"
          inputContainerStyle={{ borderBottomWidth: 0 }}
          onChangeText={value => this.updateText(PASSAWORD, value)}
          errorMessage={
            this.state.valid_password
              ? ''
              : 'Tu clave debe contener 8 carácteres, una Mayúscula y un Número'
          }
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
          placeholder="Repite tu clave"
          inputContainerStyle={{ borderBottomWidth: 0 }}
          onChangeText={value => this.updateText(REPEAT_PASSWORD, value)}
          errorMessage={
            this.state.valid_match_passwords
              ? ''
              : 'Las contraseñas deben coincidir'
          }
        />
        <Button
          buttonStyle={styles.greenButton}
          title="UNIRTE"
          titleStyle={{ color: '#fff', fontWeight: 'bold' }}
          onPress={this.signUp.bind(this)}
          disabled={enableSubmit(this.state)}
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
