import React, { Component } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { ROUTES } from '../../routes';
import { NavigationScreenProp } from 'react-navigation';
import { styles, theme } from '../../theme/index';
import logo from '../../../assets/logo-white-shadow.png';
import Amplify, { Auth } from 'aws-amplify';
import AWSconfig from '../../aws-exports';
import CodeInput from 'react-native-confirmation-code-field';
import { connect } from 'react-redux';
import AnimatedLoader from 'react-native-animated-loader';
import Snackbar from 'react-native-snackbar-component';

Amplify.configure(AWSconfig);

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  user: any;
}

interface IState {}

class ConfirmationScreen extends Component<IProps, IState> {
  state = {
    confirmation_number: '',
    loading: false,
    snackIsVisible: false,
    errorMessage: ''
  };

  handlerOnFulfill(code) {
    this.setState({ loading: true });
    Auth.confirmSignUp(this.props.user.username, code)
      .then(() => {
        this.setState({ loading: false });
        this.props.navigation.navigate(ROUTES.Dashboard);
      })
      .catch(err => {
        this.setState({ loading: false, errorMessage: err.message });
      });
  }

  render() {
    return (
      <View style={pageStyles.container}>
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
        <Text style={{ marginBottom: '10%', fontStyle: 'italic' }}>
          Ingresa el código de confirmación, enviado a tu correo
        </Text>
        <CodeInput
          onFulfill={this.handlerOnFulfill.bind(this)}
          autoFocus={true}
          codeLength={6}
          activeColor={theme.colors.primary}
          space={16}
          variant="border-circle"
        />
        <Text
          onPress={() => {
            this.props.navigation.navigate(ROUTES.HomeScreen);
          }}
        >
          Volver
        </Text>
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
    padding: 20
  },
  logo: {
    width: 104,
    height: 112,
    marginTop: '10%',
    marginBottom: '10%'
  }
});

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(ConfirmationScreen);
