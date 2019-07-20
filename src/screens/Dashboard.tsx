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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

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
        height: h,
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
        style={styles.background}>
        <AnimatedLoader
          visible={loading}
          overlayColor='rgba(164,220,34,0.75)'
          animationStyle={styles.lottie}
          speed={1}
        />
        <View style={styles.innerPage}>
          <BlurView style={pageStyles.balance} tint='default' intesity={40}>
            <Text style={pageStyles.cmu_number}>{user.cmus}</Text>
            <Text
              style={{
                color: theme.colors.white,
                textAlign: 'center',
                fontSize: wp('3%'),
                paddingTop: wp('1%')
              }}>
              ¡Hola {user.nickname}! Este es tu saldo disponible
            </Text>
          </BlurView>
          <Button
            title='COMPRAR CMUS'
            buttonStyle={styles.greenButtonOutline}
            type='outline'
            onPress={() =>
              WebBrowser.openBrowserAsync(
                'http://cmu.payment.checkout.s3-website.us-east-2.amazonaws.com'
              )
            }
          />
          <Button
            buttonStyle={styles.greenButton}
            title='SALIR'
            titleStyle={{ color: theme.colors.secondary }}
            onPress={() =>
              Auth.signOut({ global: true })
                .then(() => {
                  updateUser({});
                  this.props.navigation.navigate(ROUTES.HomeScreen);
                })
                .catch(err => console.log(err))
            }
          />
        </View>
        <Rectangle w={wp('29%')} h={hp('32%')} t={hp('26%')} />
        <Rectangle w={wp('32%')} h={hp('34%')} t={hp('6%')} />
        <Rectangle w={wp('26%')} h={hp('26%')} t={hp('19%')} />
      </LinearGradient>
    );
  }
}

const pageStyles = StyleSheet.create({
  balance: {
    width: hp('25%'),
    height: hp('25%'),
    padding: hp('3%'),
    marginBottom: hp('35%'),
    marginRight: hp('25%'),
    borderRadius: hp('25%') / 2,
    backgroundColor: theme.colors.secondary
  },
  cmu_number: {
    color: theme.colors.white,
    fontSize: hp('6%'),
    fontWeight: '600',
    textAlign: 'center'
  }
});

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(Dashboard);
