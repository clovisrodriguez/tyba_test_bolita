import React, { Component } from 'react';
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  Text,
  View,
  Keyboard
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styles, theme } from '../../theme/index';
import { ROUTES } from '../../routes/index';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { CreateUserInput } from '../../API';
import updateUser from '../../store/actions/storeUser';
import AnimatedLoader from 'react-native-animated-loader';
import { BlurView } from 'expo-blur';
import { Button, Input } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMobile } from '@fortawesome/free-solid-svg-icons';
import { formatPhoneNumber } from '../../validators/format';
import {
  getAllUser,
  createTransaction,
  updateTransaction,
  updateUserDB
} from '../../client/index';
import { CreateTransactionsInput, Transaction_status } from '../../API';
import _ from 'lodash';
import Snackbar from 'react-native-snackbar-component';
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
        transform: [{ rotate: '270deg' }]
      }}
    />
  );
};

const PHONE_NUMBER = 'phone_number';
const CMUS = 'cmus';

class TransactionsScreen extends Component<IProps, IState> {
  state = {
    phone_number: null,
    transactionUser: JSON.parse(
      this.props.navigation.getParam('decodeData', null)
    ),
    errorMessage: '',
    snackIsVisible: false,
    cmus: null,
    loading: false
  };

  updateText(key, value) {
    if (key === PHONE_NUMBER) {
      value = formatPhoneNumber(value);
    } else {
      value = Number(value);
    }

    this.setState({
      [key]: value
    });
  }

  searchUserByNumber() {
    Keyboard.dismiss();
    const { phone_number } = this.state;
    const phoneNumber = `+${phone_number.replace(/[^0-9.]+/g, '')}`;
    getAllUser()
      .then((allUsers: any) => {
        const match = _.find(
          allUsers.data.listUsers.items,
          user => user.phone_number === phoneNumber
        );
        match
          ? this.setState({ transactionUser: match })
          : this.setState({
              errorMessage: 'No se encontro usuario con ese número',
              snackIsVisible: true
            });
      })
      .catch(() =>
        this.setState({
          errorMessage: 'Hubo un error, intenta nuevamente',
          snackIsVisible: true
        })
      );
  }

  sendMoney() {
    Keyboard.dismiss();
    const { user, navigation } = this.props;
    const { transactionUser, cmus } = this.state;

    this.setState({ loading: true });

    if (user.cmus >= cmus) {
      const transaction: CreateTransactionsInput = {
        createAt: new Date().toISOString(),
        cmus: cmus,
        status: Transaction_status.PENDING,
        transactionsFromId: user.id,
        transactionsToId: transactionUser.id
      };
      createTransaction(transaction)
        .then((res: any) => {
          updateTransaction({
            id: res.data.createTransactions.id,
            status: Transaction_status.SUCCESFUL
          })
            .then(() => {
              const userCMUS = Number((user.cmus - cmus).toFixed(1));
              const userTransactionCMUS = Number(
                (transactionUser.cmus + cmus).toFixed(1)
              );
              console.log(user.id);
              updateUserDB({ id: user.id, cmus: userCMUS })
                .catch(res => console.log(res))
                .then((data: any) => {
                  updateUserDB({
                    id: transactionUser.id,
                    cmus: Number(userTransactionCMUS)
                  }).catch(res => console.log(res));
                  updateUser(data.data.updateUser);
                  navigation.navigate(ROUTES.ConfirmationTransactionScreen, {
                    transactionUser: JSON.stringify(transactionUser)
                  });
                });
              console.log('SUCCESFUL');
              this.setState({ loading: false });
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    } else {
      this.setState({
        snackIsVisible: true,
        loader: false,
        errorMessage: 'No tienes suficientes CMUs :('
      });
    }
  }

  render() {
    const { transactionUser, phone_number, loading } = this.state;
    const { user } = this.props;

    let content;

    if (transactionUser) {
      content = (
        <View
          style={{
            flex: 1,
            padding: hp('2%'),
            width: '100%',
            alignItems: 'center'
          }}>
          <Text style={styles.label}>Nombre parchado</Text>
          <Text style={styles.answer}>{transactionUser.nickname}</Text>
          <Text style={styles.label}>Número del cashie</Text>
          <Text style={styles.answer}>
            {formatPhoneNumber(transactionUser.phone_number)}
          </Text>
          <Input
            keyboardType='numeric'
            inputStyle={styles.input}
            value={this.state.cmus}
            placeholder='Ingresa los CMUs que vas a enviar'
            inputContainerStyle={{ borderBottomWidth: 0 }}
            onChangeText={value => this.updateText(CMUS, value)}
          />
          <Button
            buttonStyle={styles.greenButton}
            title='ENVIAR'
            titleStyle={{ color: theme.colors.secondary }}
            onPress={this.sendMoney.bind(this)}
          />
          <Text
            style={styles.answer}
            onPress={() => {
              this.setState({ transactionUser: null });
            }}>
            Buscar de nuevo
          </Text>
        </View>
      );
    } else {
      content = (
        <View
          style={{
            height: hp('30%'),
            width: '100%',
            alignItems: 'center',
            padding: hp('2%')
          }}>
          <Input
            textContentType='telephoneNumber'
            keyboardType='phone-pad'
            leftIcon={
              <FontAwesomeIcon
                icon={faMobile}
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
            value={this.state.phone_number}
            placeholder='Ingresa tu celular'
            inputContainerStyle={{ borderBottomWidth: 0 }}
            onChangeText={value => this.updateText(PHONE_NUMBER, value)}
          />
          <Button
            buttonStyle={styles.greenButton}
            title='BUSCAR'
            titleStyle={{ color: theme.colors.secondary }}
            onPress={this.searchUserByNumber.bind(this)}
            disabled={
              !phone_number ||
              phone_number === formatPhoneNumber(user.phone_number)
            }
          />
        </View>
      );
    }

    return (
      <LinearGradient colors={theme.colors.darkBackground} style={{ flex: 1 }}>
        <AnimatedLoader
          visible={loading}
          overlayColor='rgba(164,220,34,0.75)'
          animationStyle={styles.lottie}
          speed={1}
        />
        <Snackbar
          visible={this.state.snackIsVisible}
          textMessage={this.state.errorMessage}
          onPressed={() => this.setState({ snackIsVisible: false })}
        />
        <View
          style={[
            styles.innerPage,
            { zIndex: 1, elevation: 1, paddingTop: hp('8%') }
          ]}>
          <BlurView style={pageStyles.title} tint='default' intesity={40}>
            <Text style={pageStyles.cmu_number}>Datos del pago</Text>
            <Text style={[styles.answer, { textAlign: 'left' }]}>
              Este es tu saldo: {user.cmus}
            </Text>
          </BlurView>
          {content}
        </View>
        <Rectangle w={wp('29%')} h={hp('32%')} t={hp('12%')} />
        <Rectangle w={wp('37%%')} h={hp('34%')} t={0} />
        <Rectangle w={wp('26%')} h={hp('26%')} t={hp('5%')} />
      </LinearGradient>
    );
  }
}

const pageStyles = StyleSheet.create({
  title: {
    width: '100%',
    height: hp('20%'),
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

export default connect(mapStateToProps)(TransactionsScreen);
