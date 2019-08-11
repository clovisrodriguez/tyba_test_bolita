import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Text,
  Keyboard,
  View
} from 'react-native';
import { ROUTES } from '../../routes';
import { NavigationScreenProp } from 'react-navigation';
import { Button, Input } from 'react-native-elements';
import { styles, theme } from '../../theme/index';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { formatPhoneNumber } from '../../validators/format';
import { validatePhoneNumber } from '../../validators/auth';
import { faMobile, faKey } from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/logo-white-shadow.png';
import { Auth } from 'aws-amplify';
import AnimatedLoader from 'react-native-animated-loader';
import Snackbar from 'react-native-snackbar-component';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {}

const PASSAWORD = 'password';
const PHONE_NUMBER = 'phone_number';

const SingInMode = ({
  navigation,
  isDisable,
  setRecoveryMode,
  signIn,
  updateText
}) => {
  return (
    <View style={styles.innerContainer}>
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
        placeholder='Ingresa tu clave'
        inputContainerStyle={{ borderBottomWidth: 0 }}
        onChangeText={value => updateText(PASSAWORD, value)}
      />

      <Button
        buttonStyle={styles.greenButton}
        title='INGRESAR'
        titleStyle={styles.whiteTitleButton}
        onPress={signIn}
        disabled={isDisable}
        disabledStyle={{ backgroundColor: theme.colors.disabledGrey }}
        disabledTitleStyle={{ color: theme.colors.grey }}
      />
      <Button
        title='¿Olvidaste tu clave?'
        titleStyle={{ color: theme.colors.darkLabel }}
        buttonStyle={styles.simpleButtonWhite}
        onPress={setRecoveryMode}
      />
      <Button
        title='Volver'
        titleStyle={{ color: theme.colors.darkLabel }}
        buttonStyle={styles.simpleButtonWhite}
        onPress={() => {
          navigation.navigate(ROUTES.HomeScreen);
        }}
      />
    </View>
  );
};

const RecoveryMode = ({
  isDisableRecovery,
  recoverPassword,
  setRecoveryMode
}) => {
  return (
    <View style={styles.innerContainer}>
      <Button
        buttonStyle={styles.greenButton}
        title='ENVIAR'
        titleStyle={styles.whiteTitleButton}
        onPress={recoverPassword}
        disabled={isDisableRecovery}
        disabledStyle={{ backgroundColor: theme.colors.disabledGrey }}
        disabledTitleStyle={{ color: theme.colors.grey }}
      />
      <Button
        title='Volver'
        titleStyle={{ color: theme.colors.darkLabel }}
        buttonStyle={styles.simpleButtonWhite}
        onPress={setRecoveryMode}
      />
    </View>
  );
};

class LoginScreen extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.recoverPassword = this.recoverPassword.bind(this);
    this.setRecoveryMode = this.setRecoveryMode.bind(this);
    this.signIn = this.signIn.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  state = {
    errorMessage: '',
    isDisable: true,
    isDisableRecovery: true,
    loading: false,
    password: null,
    phone_number: null,
    recovery_mode: false,
    snackIsVisible: false
  };

  updateText(key, value) {
    const { state } = this;
    const { phone_number } = state;

    if (key === PHONE_NUMBER) {
      value = formatPhoneNumber(value);
    }

    if (validatePhoneNumber(value) || validatePhoneNumber(phone_number)) {
      this.setState({ isDisableRecovery: false });
      if (value && key === PASSAWORD) {
        this.setState({
          isDisable: false
        });
      } else {
        this.setState({
          isDisable: true
        });
      }
    } else {
      this.setState({ isDisableRecovery: true });
    }

    this.setState({
      [key]: value
    });
  }

  setRecoveryMode() {
    const newState = this.state.recovery_mode ? false : true;
    this.setState({ recovery_mode: newState });
  }

  signIn() {
    Keyboard.dismiss();
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

  recoverPassword() {
    const { props, state } = this;
    const { navigation } = props;
    const { phone_number } = state;
    let phoneNumber = `+${phone_number.replace(/[^0-9.]+/g, '')}`;

    Keyboard.dismiss();
    this.setState({
      loading: true
    });

    Auth.forgotPassword(phoneNumber)
      .then(res => {
        console.log(res);
        this.setState({
          loading: false
        });
        navigation.navigate(ROUTES.PasswordRecoveryScreen, { phoneNumber });
      })
      .catch(err => {
        console.log(err);
        const codeError = err.code === 'UserNotFoundException';
        this.setState({
          loading: false,
          errorMessage: codeError
            ? 'no encontramos ninguna cuenta con ese número'
            : 'algo salió mal vuelve a intentar',
          snackIsVisible: true
        });
      });
  }

  render() {
    const {
      props,
      recoverPassword,
      setRecoveryMode,
      signIn,
      state,
      updateText
    } = this;
    const {
      errorMessage,
      isDisable,
      isDisableRecovery,
      loading,
      phone_number,
      recovery_mode,
      snackIsVisible
    } = state;
    const { navigation } = props;

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
        <Image source={logo} style={pageStyles.logo} />
        {recovery_mode && (
          <Text>Ingresa el número que esta asociado con tu cuenta</Text>
        )}
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
          value={phone_number}
          placeholder='Ingresa tu celular'
          inputContainerStyle={{ borderBottomWidth: 0 }}
          onChangeText={value => this.updateText(PHONE_NUMBER, value)}
        />
        {!recovery_mode ? (
          <SingInMode
            {...{ navigation, isDisable, setRecoveryMode, signIn, updateText }}
          />
        ) : (
          <RecoveryMode
            {...{ isDisableRecovery, recoverPassword, setRecoveryMode }}
          />
        )}
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
    padding: wp('%5')
  },
  logo: {
    width: 104,
    height: 112,
    marginBottom: hp('10%')
  }
});

export default LoginScreen;
