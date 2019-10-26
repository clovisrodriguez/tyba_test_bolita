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
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
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
const EMAIL = 'email';

const SingInMode = ({ navigation, isDisable, signIn, updateText }) => {
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

class LoginScreen extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.setRecoveryMode = this.setRecoveryMode.bind(this);
    this.signIn = this.signIn.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  state = {
    errorMessage: '',
    isDisable: true,
    loading: false,
    password: null,
    email: null,
    recovery_mode: false,
    snackIsVisible: false,
    valid_email: true
  };

  updateText(key, value) {
    const { state } = this;
    const { email, password } = state;

    if (email && password) {
      this.setState({ isDisable: false });
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
    const { password, email } = this.state;
    let mail = email.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    Auth.signIn(mail, password)
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
    const { props, signIn, state, updateText } = this;
    const { errorMessage, isDisable, loading, snackIsVisible } = state;
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
        <View style={pageStyles.upperContainer}>
          <Image
            source={require('../../../assets/logo_transparent.png')}
            style={pageStyles.logo}
          />
        </View>
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
        <SingInMode {...{ navigation, isDisable, signIn, updateText }} />
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
    width: 150,
    height: 150,
  },
  upperContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    height: hp('20%'),
    width: hp('20%'),
    borderRadius: hp('50%'),
    marginBottom: hp('10%')
  }
});

export default LoginScreen;
