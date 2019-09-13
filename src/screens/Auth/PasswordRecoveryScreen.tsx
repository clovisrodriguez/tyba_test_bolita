import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Text,
  Keyboard
} from 'react-native';
import { ROUTES } from '../../routes';
import { NavigationScreenProp } from 'react-navigation';
import { Button, Input } from 'react-native-elements';
import { styles, theme } from '../../theme/index';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { validateCode, validatePassword } from '../../validators/auth';
import { faKey, faBug } from '@fortawesome/free-solid-svg-icons';
import AnimatedLoader from 'react-native-animated-loader';
import Snackbar from 'react-native-snackbar-component';
import { Auth } from 'aws-amplify';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {}

const CODE = 'code';
const PASSAWORD = 'password';

class PasswordRecoveryScreen extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.submitRecoveryPassword = this.submitRecoveryPassword.bind(this);
    this.updateText = this.updateText.bind(this);
    this.updateDisableState = this.updateDisableState.bind(this);
  }

  state = {
    code: null,
    isDisabled: true,
    errorMessage: '',
    loading: false,
    password: null,
    phone_number: null,
    snackIsVisible: false,
    valid_code: true,
    valid_password: true
  };

  submitRecoveryPassword() {
    const { code, password, phone_number } = this.state;
    Keyboard.dismiss();
    this.setState({
      loading: true
    });
    Auth.forgotPasswordSubmit(phone_number, code, password)
      .then(() => {
        this.setState({
          loading: false,
          snackIsVisible: true,
          errorMessage: 'Tu clave fue actualizada exitosamente'
        });
        setTimeout(() => {
          this.props.navigation.navigate(ROUTES.HomeScreen);
        }, 2000);
      })
      .catch(err => {
        const codeMessage =
          err.code === 'CodeMismatchException'
            ? 'El código de confirmación no coincide'
            : 'algo salio mal intenta nuevamente :(';
        this.setState({
          loading: false,
          snackIsVisible: true,
          errorMessage: codeMessage
        });
      });
  }

  updateText(key, value) {
    switch (key) {
      case CODE:
        this.setState({
          valid_code: validateCode(value),
          [key]: value
        });
        break;
      case PASSAWORD:
        this.setState({
          valid_password: validatePassword(value),
          [key]: value
        });
        break;
    }
    setTimeout(() => {
      this.updateDisableState();
    }, 50);
  }

  updateDisableState() {
    const { code, password, valid_code, valid_password } = this.state;

    if (code && password && valid_code && valid_password) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ phone_number: navigation.getParam('phoneNumber') });
  }

  render() {
    const { props, state, submitRecoveryPassword, updateText } = this;
    const { navigation } = props;
    const { errorMessage, isDisabled, loading, snackIsVisible } = state;

    return (
      <KeyboardAvoidingView behavior='padding' style={pageStyles.container}>
        <AnimatedLoader
          visible={loading}
          overlayColor='rgba(255,255,255,0.75)'
          animationStyle={styles.lottie}
          speed={1}
        />
        <Snackbar
          visible={snackIsVisible}
          textMessage={errorMessage}
          onPressed={() => this.setState({ snackIsVisible: false })}
        />
        <Image source={require('../../../assets/logo-white-shadow.png')} style={pageStyles.logo} />
        <Text>
          Ingresa tu el código de verificación seguido de tu nueva contraseña
        </Text>
        <Input
          keyboardType='numeric'
          leftIcon={
            <FontAwesomeIcon
              icon={faBug}
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
          placeholder='Ingresa el codigo enviado a tu celular'
          inputContainerStyle={{ borderBottomWidth: 0 }}
          onChangeText={value => updateText(CODE, value)}
          errorMessage={
            this.state.valid_code
              ? ''
              : 'El codigo que recibiste es debe ser de 6 digitos'
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
          onChangeText={value => updateText(PASSAWORD, value)}
          errorMessage={
            this.state.valid_password
              ? ''
              : 'Tu clave debe contener 8 carácteres, una Mayúscula y un Número'
          }
        />
        <Button
          buttonStyle={styles.greenButton}
          title='CAMBIAR CLAVE'
          titleStyle={styles.whiteTitleButton}
          onPress={submitRecoveryPassword}
          disabled={isDisabled}
          disabledStyle={{ backgroundColor: theme.colors.disabledGrey }}
          disabledTitleStyle={{ color: theme.colors.grey }}
        />
        <Button
          title='Volver'
          titleStyle={{ color: theme.colors.darkLabel }}
          buttonStyle={styles.simpleButtonWhite}
          onPress={() => {
            navigation.navigate(ROUTES.LoginScreen);
          }}
        />
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
    width: 104,
    height: 112,
    marginBottom: hp('10%')
  }
});

export default PasswordRecoveryScreen;
