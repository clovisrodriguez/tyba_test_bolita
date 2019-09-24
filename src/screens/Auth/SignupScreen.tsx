import React, { Component } from 'react';
import { StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { ROUTES } from '../../routes';
import { NavigationScreenProp } from 'react-navigation';
import { Button, Input, Text, colors } from 'react-native-elements';
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
import AnimatedLoader from 'react-native-animated-loader';
import Snackbar from 'react-native-snackbar-component';
import updateUser from '../../store/actions/storeUser';
import { CreateUserInput, User_type, User_status } from '../../API';
import { Auth } from 'aws-amplify';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import * as WebBrowser from 'expo-web-browser';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  name: string,
  email: string,
  password: string,
  repeat_password: string,
  phone_number: string,
  valid_name: boolean,
  valid_email: boolean,
  valid_password: boolean,
  valid_match_passwords: boolean,
  valid_phone_number: boolean,
  loading: boolean,
  snackIsVisible: boolean,
  errorMessage: string,
  [key: string]: any
}

const NAME = 'name';
const EMAIL = 'email';
const PASSAWORD = 'password';
const REPEAT_PASSWORD = 'repeat_password';
const PHONE_NUMBER = 'phone_number';

class LoginScreen extends Component<IProps, IState> {

  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.state = {
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
      errorMessage: '',
    }
  }

  updateText(key, value) {
    if (key === NAME) {
      value = value.trimEnd();
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
    let mail = email.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
    let phoneNumber = `+${phone_number.replace(/[^0-9.]+/g, '')}`;
    Auth.signUp({
      username: phoneNumber,
      password: password,
      attributes: {
        name,
        email: mail
      }
    })
      .then(() => {
        const user: CreateUserInput = {
          cmus: 0,
          email: email,
          id: phoneNumber,
          nickname: name,
          transactions: [],
          type: User_type.REGULAR_USER
        };
        updateUser(user);
        this.setState({ loading: false });
        this.props.navigation.navigate(ROUTES.ConfirmationScreen, {
          password
        });
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
    const { props } = this;
    const { navigation } = props;
    return (
      <KeyboardAvoidingView behavior='padding' style={pageStyles.container}>
        <AnimatedLoader
          visible={this.state.loading}
          overlayColor='rgba(255,255,255,0.75)'
          animationStyle={styles.lottie}
          speed={1}
        />
        <Snackbar
          visible={this.state.snackIsVisible}
          textMessage={this.state.errorMessage}
          onPressed={() => this.setState({ snackIsVisible: false })}
        />
        <Image source={require('../../../assets/logo-white-shadow.png')} style={pageStyles.logo} />
        <Input
          textContentType='name'
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
          placeholder='Ingresa tu nombre'
          inputContainerStyle={{ borderBottomWidth: 0 }}
          onChangeText={value => this.updateText(NAME, value)}
          errorMessage={
            this.state.valid_name
              ? ''
              : 'Tu alias parce de 3 a 12 caracteres, una sola palabra'
          }
        />
        <Input
          keyboardType='email-address'
          textContentType='emailAddress'
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
          placeholder='Ingresa tu correo'
          inputContainerStyle={{ borderBottomWidth: 0 }}
          onChangeText={value => this.updateText(EMAIL, value)}
          errorMessage={
            this.state.valid_email ? '' : 'Ingresa un correo valido'
          }
        />
        <Input
          textContentType='telephoneNumber'
          keyboardType='phone-pad'
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
          placeholder='Ingresa tu celular'
          inputContainerStyle={{ borderBottomWidth: 0 }}
          onChangeText={value => this.updateText(PHONE_NUMBER, value)}
          errorMessage={
            this.state.valid_phone_number
              ? ''
              : 'Ingresa un numero valido, solo celulares en Colombia'
          }
        />
        <Input
          keyboardType='default'
          textContentType='password'
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
          placeholder='Elige una clave'
          inputContainerStyle={{ borderBottomWidth: 0 }}
          onChangeText={value => this.updateText(PASSAWORD, value)}
          errorMessage={
            this.state.valid_password
              ? ''
              : 'Tu clave debe contener 8 carácteres, una Mayúscula y un Número'
          }
        />
        <Input
          keyboardType='default'
          textContentType='password'
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
          placeholder='Repite tu clave'
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
          title='UNIRTE'
          titleStyle={styles.whiteTitleButton}
          onPress={this.signUp}
          disabled={enableSubmit(this.state)}
          disabledStyle={{ backgroundColor: theme.colors.disabledGrey }}
          disabledTitleStyle={{ color: theme.colors.grey }}
        />
        <Button
          title='Volver'
          titleStyle={{ color: theme.colors.darkLabel }}
          buttonStyle={styles.simpleButtonWhite}
          onPress={() => {
            navigation.navigate(ROUTES.HomeScreen);
          }}
        />
        <Text style={{ color: theme.colors.linkGrey }}>Al inscribirte aceptas nuestros</Text>
        <Button
          title='Terminos y condiciones'
          titleStyle={styles.link}
          buttonStyle={styles.simpleButtonWhite}
          onPress={() => WebBrowser.openBrowserAsync('https://www.cashmeup.co/terminos_y_condiciones')} />
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
    padding: wp('5%')
  },
  logo: {
    width: 112,
    height: 112,
    marginBottom: hp('10%')
  }
});

export default LoginScreen;
