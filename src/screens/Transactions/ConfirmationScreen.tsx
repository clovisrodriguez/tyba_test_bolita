import React, { Component } from 'react';
import { StyleSheet, ViewStyle, StyleProp, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styles, theme } from '../../theme/index';
import { ROUTES } from '../../routes/index';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { CreateUserInput } from '../../API';
import AnimatedLoader from 'react-native-animated-loader';
import { BlurView } from 'expo-blur';
import { Button } from 'react-native-elements';
import { formatPhoneNumber } from '../../validators/format';
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
        height: h * 1.5,
        zIndex: 0,
        top: t,
        right: 0,
        borderRadius: 20,
        transform: [{ rotate: '120deg' }]
      }}
    />
  );
};

class ConfirmationTransactionScreen extends Component<IProps, IState> {
  state = {
    transactionUser: JSON.parse(
      this.props.navigation.getParam('transactionUser', null)
    ),
    transaction: JSON.parse(
      this.props.navigation.getParam('transaction', null)
    ),
    loading: false
  };

  render() {
    const { transactionUser, transaction, loading } = this.state;
    const { user, navigation } = this.props;

    return (
      <LinearGradient colors={theme.colors.darkBackground} style={{ flex: 1 }}>
        <AnimatedLoader
          visible={loading}
          overlayColor='rgba(164,220,34,0.75)'
          animationStyle={styles.lottie}
          speed={1}
        />
        <View
          style={[
            styles.innerPage,
            { zIndex: 1, elevation: 1, paddingTop: 40 }
          ]}>
          <BlurView style={pageStyles.title} tint='default' intesity={40}>
            <Text style={pageStyles.cmu_number}>Confirmación</Text>
            <Text style={[styles.answer, { textAlign: 'left' }]}>
              Este es tu nuevo saldo: {user.cmus}
            </Text>
          </BlurView>
          <View
            style={{
              flex: 1,
              width: '100%',
              padding: 20,
              alignItems: 'center'
            }}>
            <Text style={styles.label}>Nombre parchado</Text>
            <Text style={styles.answer}>{transactionUser.nickname}</Text>
            <Text style={styles.label}>Número del cashie</Text>
            <Text style={styles.answer}>
              {formatPhoneNumber(transactionUser.id)}
            </Text>
            <Text style={styles.label}>CMUS</Text>
            <Text style={styles.answer}>{transaction.cmus}</Text>
            <Button
              style={{ marginTop: hp('20%') }}
              buttonStyle={styles.greenButton}
              title='VOLVER AL INICIO'
              titleStyle={{ color: theme.colors.secondary }}
              onPress={() => navigation.navigate(ROUTES.Dashboard)}
            />
          </View>
        </View>
        <Rectangle w={wp('28%')} h={hp('34%')} t={hp('70%')} />
        <Rectangle w={wp('15%')} h={hp('25%')} t={hp('80%')} />
      </LinearGradient>
    );
  }
}

const pageStyles = StyleSheet.create({
  title: {
    width: '100%',
    height: hp('16%'),
    padding: hp('2%'),
    backgroundColor: theme.colors.secondary
  },
  cmu_number: {
    color: theme.colors.white,
    fontSize: hp('6%'),
    fontWeight: '600',
    textAlign: 'left'
  }
});

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(ConfirmationTransactionScreen);
