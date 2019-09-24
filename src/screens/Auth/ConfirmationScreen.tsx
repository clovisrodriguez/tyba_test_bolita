import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, Keyboard, Linking } from 'react-native';
import { ROUTES } from '../../routes';
import { NavigationScreenProp } from 'react-navigation';
import { styles, theme } from '../../theme/index';
import { Auth } from 'aws-amplify';
import CodeInput from 'react-native-confirmation-code-field';
import { connect } from 'react-redux';
import AnimatedLoader from 'react-native-animated-loader';
import Snackbar from 'react-native-snackbar-component';
import { Button } from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { createUser } from '../../client';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  user: any;
  password: String;
}

interface IState {
  confirmation_number: string;
  disableConfirmation: boolean;
  loading: boolean;
  snackIsVisible: boolean;
  errorMessage: string;
}

const RESEND_CONFIRMATION_TIME = 30;

class ConfirmationScreen extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.resendConfirmationCode = this.resendConfirmationCode.bind(this);
    this.handlerOnFulfill = this.handlerOnFulfill.bind(this);

    this.state = {
      confirmation_number: '',
      disableConfirmation: false,
      loading: false,
      snackIsVisible: false,
      errorMessage: '',
    };
  }

  resendConfirmationCode() {
    Auth.resendSignUp(this.props.user.id)
    this.setState({disableConfirmation: true});
    setTimeout(() => this.setState({disableConfirmation: false}), RESEND_CONFIRMATION_TIME);
  }

  handlerOnFulfill(code) { 
    Keyboard.dismiss(); 
    this.setState({ loading: true }); 
 
    let { user, navigation } = this.props; 
    const password = navigation.getParam('password', 'no-password'); 
 
    Auth.confirmSignUp(user.id, code) 
      .then(res => { 
        console.log(res); 
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
      }) 
      .catch(err => { 
        console.log(err); 
        this.setState({ loading: false, errorMessage: err.message }); 
      }); 
  } 

  render() {
    return (
      <View style={pageStyles.container}>
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
        <Text
          style={{
            marginBottom: hp('5%'),
            fontStyle: 'italic',
            textAlign: 'center'
          }}>
          Ingresa el código de confirmación, enviado a tu celular
        </Text>
        <CodeInput
          onFulfill={this.handlerOnFulfill}
          autoFocus={true}
          codeLength={6}
          activeColor={theme.colors.primary}
          space={16}
          variant='border-circle'
        />
        <Button
          style={{ marginBottom: hp('35%') }}
          buttonStyle={styles.greenButton}
          disabled={this.state.disableConfirmation}
          title='ENVIAR NUEVAMENTE'
          titleStyle={{ color: theme.colors.secondary }}
          onPress={() => this.resendConfirmationCode}
        />
        <Button
          title='¿Necesitas ayuda para verificar tu número?'
          titleStyle={styles.link}
          buttonStyle={styles.simpleButtonWhite}
          onPress={() => {
            Linking.openURL('https://wa.me/573192955855')
          }}
        />
      </View>
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
    marginTop: hp('5%'),
    marginBottom: hp('7%')
  }
});

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(ConfirmationScreen);
