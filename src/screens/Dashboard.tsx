import React, { Component } from 'react';
import { StyleSheet, StyleProp, ViewStyle, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styles, theme } from '../theme/index';
import { getUser } from '../client/index';
import { Auth } from 'aws-amplify';
import { Button } from 'react-native-elements';
import { ROUTES } from '../routes/index';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { CreateUserInput } from '../API';
import updateUser from '../store/actions/storeUser';
import AnimatedLoader from 'react-native-animated-loader';
import { BlurView } from 'expo-blur';
import * as WebBrowser from 'expo-web-browser';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  buttonStyle?: StyleProp<ViewStyle>;
  user: CreateUserInput;
}

interface IState {}

const Rectangle = props => {
  const { w, h, t } = props;
  return (
    <LinearGradient
      colors={['rgba(164,220,34,1)', 'rgba(164,220,34,0)']}
      style={{
        position: 'absolute',
        width: w,
        height: h * 1.5,
        zIndex: 0,
        top: t,
        right: 0,
        borderRadius: 20,
        transform: [{ rotate: '-45deg' }]
      }}
    />
  );
};

class Dashboard extends Component<IProps, IState> {
  state = {};

  render() {
    const { user } = this.props;
    const validUser = Object.keys(user).length > 0;
    let loading = false;

    if (!validUser) {
      loading = true;
      let userName;
      Auth.currentAuthenticatedUser().then(authUser => {
        userName = authUser.signInUserSession.accessToken.payload.username;
        getUser(userName).then((userTable: any) => {
          updateUser(userTable.data.getUser);
          loading = false;
        });
      });
    }

    return (
      <LinearGradient
        colors={theme.colors.darkBackground}
        style={styles.background}
      >
        <AnimatedLoader
          visible={loading}
          overlayColor="rgba(164,220,34,0.75)"
          animationStyle={styles.lottie}
          speed={1}
        />
        <View style={styles.innerPage}>
          <BlurView style={pageStyles.balance} tint="default" intesity={40}>
            <Text style={pageStyles.cmu_number}>{user.cmus}!</Text>
            <Text
              style={{
                color: theme.colors.white,
                textAlign: 'center'
              }}
            >
              ¡Hola {user.nickname}! Este es tu saldo disponible
            </Text>
          </BlurView>
          <Button
            title="COMPRAR CMUS"
            buttonStyle={styles.greenButtonOutline}
            type="outline"
            onPress={() => WebBrowser.openBrowserAsync('http://cmu.payment.checkout.s3-website.us-east-2.amazonaws.com')}
          />
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
        <Rectangle w={150} h={160} t={220} />
        <Rectangle w={130} h={150} t={60} />
        <Rectangle w={120} h={130} t={160} />
      </LinearGradient>
    );
  }
}

const pageStyles = StyleSheet.create({
  balance: {
    width: 230,
    height: 230,
    padding: 30,
    marginBottom: '45%',
    marginRight: '30%',
    borderRadius: 230 / 2,
    backgroundColor: theme.colors.secondary
  },
  cmu_number: {
    color: theme.colors.white,
    fontSize: 50,
    fontWeight: '600',
    textAlign: 'center',
    height: 80
  }
});

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(Dashboard);
