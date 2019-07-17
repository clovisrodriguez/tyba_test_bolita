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
        transform: [{ rotate: '270deg' }]
      }}
    />
  );
};

class ConfirmationTransactionScreen extends Component<IProps, IState> {
  state = {
    phone_number: null,
    transactionUser: JSON.parse(
      this.props.navigation.getParam('transactionUser', null)
    ),
    loading: false
  };

  render() {
    const { transactionUser, phone_number, loading } = this.state;
    const { user } = this.props;

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
            <Text style={styles.label}>Datos de la transacción</Text>
            <Text style={styles.label}>Nombre parchado</Text>
            <Text style={styles.answer}>{transactionUser.nickname}</Text>
            <Text style={styles.label}>Número del cashie</Text>
            <Text style={styles.answer}>
              {formatPhoneNumber(transactionUser.phone_number)}
            </Text>
            <Button
              buttonStyle={styles.greenButton}
              title='VOLVER AL INICIO'
              titleStyle={{ color: theme.colors.secondary }}
              onPress={() => console.log('click')}
            />
          </View>
        </View>
        <Rectangle w={120} h={115} t={70} />
        <Rectangle w={90} h={70} t={0} />
        <Rectangle w={120} h={130} t={120} />
      </LinearGradient>
    );
  }
}

const pageStyles = StyleSheet.create({
  title: {
    width: '100%',
    height: 120,
    padding: 20,
    backgroundColor: theme.colors.secondary
  },
  cmu_number: {
    color: theme.colors.white,
    fontSize: 42,
    fontWeight: '600',
    textAlign: 'left'
  }
});

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(ConfirmationTransactionScreen);
