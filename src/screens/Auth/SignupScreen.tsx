import React, { Component } from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, View } from 'react-native';
import { ROUTES } from '../../routes';
import { NavigationScreenProp } from 'react-navigation';
import { Button, Input, Text, colors } from 'react-native-elements';
import { styles, theme } from '../../theme/index';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  enableSubmit,
  validateEmail,
  validatePassword,
  validateRepeatPassword
} from '../../validators/auth';
import { formatPhoneNumber } from '../../validators/format';
import {
  faEnvelope,
  faKey
} from '@fortawesome/free-solid-svg-icons';
import AnimatedLoader from 'react-native-animated-loader';
import Snackbar from 'react-native-snackbar-component';
import updateUser from '../../store/actions/storeUser';
import { CreateUserInput } from '../../API';
import { Auth } from 'aws-amplify';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { createUser } from '../../client';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {
  email: string;
  password: string;
  repeat_password: string;
  valid_email: boolean;
  valid_password: boolean;
  valid_match_passwords: boolean;
  loading: boolean;
  snackIsVisible: boolean;
  errorMessage: string;
  [key: string]: any;
}

const EMAIL = 'email';
const PASSAWORD = 'password';
const REPEAT_PASSWORD = 'repeat_password';
const PHONE_NUMBER = 'phone_number';

class LoginScreen extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.state = {
      email: null,
      password: null,
      repeat_password: null,
      valid_email: true,
      valid_password: true,
      valid_match_passwords: true,
      loading: false,
      snackIsVisible: false,
      errorMessage: ''
    };
  }

  updateText(key, value) {
    this.validators(key, value);

    this.setState({
      [key]: value
    });
  }

  validators(key, value) {
    switch (key) {
      case EMAIL:
        this.setState({
          valid_email: validateEmail(value)
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
    const { email, password } = this.state;
    let mail = email.replace(/^\s+|\s+$|\s+(?=\s)/g, '');
    Auth.signUp({
      username: mail,
      password: password,
    })
      .then(() => {
        const user: CreateUserInput = {
          id: email,
          location: null
        };
        updateUser(user);
        this.setState({ loading: false });
        Auth.signIn(user.id, password) 
          .then(() => { 
            console.log('sign succesfully'); 
            createUser(user) 
              .then(res => { 
                this.setState({ loading: false }); 
                console.log('User succesfully created:', res); 
                this.props.navigation.navigate(ROUTES.Dashboard); 
              }) 
              .catch(err => { 
                console.log('Something went wrong creating user :', err); 
                this.setState({ loading: false }); 
              }); 
          }) 
          .catch(err => { 
            this.setState({ loading: false }); 
            console.log('error sign!:', err); 
          });
        this.props.navigation.navigate(ROUTES.Dashboard, {
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
