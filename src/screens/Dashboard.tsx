import React, { Component } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, Text } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styles, theme } from '../theme/index';
import { getAllUser } from '../client/index';
import { Auth } from 'aws-amplify';
import { Button } from 'react-native-elements';
import { ROUTES } from '../routes/index';

export interface IProps {
  navigation: NavigationScreenProp<any, any>;
  buttonStyle?: StyleProp<ViewStyle>;
}

class Dashboard extends Component<IProps, object> {
  componentDidMount() {
    getAllUser()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={pageStyles.container}>
        <Text>This is Dashboard, You are logged in! clovis</Text>
        <Button
          buttonStyle={styles.greenButton}
          title="SALIR"
          titleStyle={{ color: theme.colors.secondary }}
          onPress={() =>
            Auth.signOut({ global: true })
              .then(() => this.props.navigation.navigate(ROUTES.HomeScreen))
              .catch(err => console.log(err))
          }
        />
      </View>
    );
  }
}

const pageStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: '100%',
    backgroundColor: theme.colors.secondary
  },
  logo: {
    width: 180,
    height: 193,
    marginBottom: '20%'
  }
});

export default Dashboard;
