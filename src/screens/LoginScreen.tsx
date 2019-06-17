import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ROUTES } from '../routes';
import { NavigationScreenProp } from 'react-navigation';
import { Button } from 'react-native-elements';
import { styles, theme } from '../theme/index';

export interface IProps {
  navigation: NavigationScreenProp<any, any>;
}

class LoginScreen extends Component<IProps> {
  render() {
    return (
      <View style={pageStyles.container}>
        <Text>Pantalla de ingreso</Text>
        <Button
          buttonStyle={styles.greenButton}
          title="INGRESAR"
          titleStyle={{ color: theme.colors.secondary }}
          onPress={() => {
            this.props.navigation.navigate(ROUTES.HomeScreen);
          }}
        />
      </View>
    );
  }
}

const pageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#112131'
  }
});

export default LoginScreen;
