import React, { Component } from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, Text } from 'react-native';
import { ROUTES } from '../routes';
import { NavigationScreenProp } from 'react-navigation';
import { Button, Input } from 'react-native-elements';
import { styles, theme } from '../theme/index';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import logo from '../../assets/logo-white-shadow.png';
import value from '*.json';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

interface IState {}

class LoginScreen extends Component<IProps, IState> {
  state = {
    name: '',
    email: '',
    password: '',
    repeat_password: '',
    phone_number: ''
  };

  updateText(key, value) {
    this.setState({
      [key]: value
    });
  }

  render() {
    console.log(this.state);
    return (
      <KeyboardAvoidingView behavior="padding" style={pageStyles.container}>
        <Image source={logo} style={pageStyles.logo} />
        <Input
          leftIcon={
            <FontAwesome5
              name="poo"
              size={20}
              color={theme.colors.primary}
              solid
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
          onChangeText={value => this.updateText('name', value)}
        />
        <Input
          leftIcon={
            <FontAwesome5
              name="envelope"
              size={20}
              color={theme.colors.primary}
              solid
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
          onChangeText={value => this.updateText('email', value)}
        />
        <Input
          leftIcon={
            <FontAwesome5
              name="mobile"
              size={20}
              color={theme.colors.primary}
              solid
            />
          }
          leftIconContainerStyle={{
            position: 'absolute',
            top: 12,
            left: 0,
            zIndex: 2
          }}
          inputStyle={styles.input}
          placeholder="Ingresa tu celular"
          inputContainerStyle={{ borderBottomWidth: 0 }}
          onChangeText={value => this.updateText('phone_number', value)}
        />
        <Input
          leftIcon={
            <FontAwesome5
              name="key"
              size={20}
              color={theme.colors.primary}
              solid
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
          onChangeText={value => this.updateText('password', value)}
        />
        <Input
          leftIcon={
            <FontAwesome5
              name="key"
              size={20}
              color={theme.colors.primary}
              solid
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
          onChangeText={value => this.updateText('repeat_password', value)}
        />
        <Button
          buttonStyle={styles.greenButton}
          title="UNIRTE"
          titleStyle={{ color: '#fff', fontWeight: 'bold' }}
          onPress={() => {
            this.props.navigation.navigate(ROUTES.HomeScreen);
          }}
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
