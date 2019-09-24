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
import { Rectangle } from '../../components/Rectangle';
import {
  getUser,
  createTransaction,
  updateTransaction,
  updateUserDB
} from '../../client/index';
import {
  CreateTransactionInput,
  Transaction_status,
  Transaction_type
} from '../../API';
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
    this.setState({ loading: true });
    const { phone_number } = this.state;
    const phoneNumber = `+${phone_number.replace(/[^0-9.]+/g, '')}`;
    this.props.user.id !== phoneNumber
      ? getUser(phoneNumber).then((userTable: any) => {
          const transactionUser = userTable.data.getUser;
          this.setState({ transactionUser, loading: false });
          !transactionUser &&
            this.setState({
              loading: false,
              errorMessage: 'El número que estas buscando no esta :(',
              snackIsVisible: true
            });
        })
      : this.setState({
          loading: false,
          phone_number: null,
          snackIsVisible: true,
          errorMessage: 'no puedes enviarte CMUs a tí mismo... ¡Qué loco!'
        });
  }

  sendMoney() {
    Keyboard.dismiss();
    const { user, navigation } = this.props;
    const { transactionUser, cmus } = this.state;

    this.setState({ loading: true });

    if (user.cmus >= cmus) {
      const transaction: CreateTransactionInput = {
        createdAt: new Date().toISOString(),
        cmus: cmus.toFixed(1),
        status: Transaction_status.PENDING,
        fromId: user.id,
        fromNickName: user.nickname,
        toId: transactionUser.id,
        toNickname: transactionUser.nickname,
        type: Transaction_type.USER_TRANSACTION
      };
      getUser(user.id).then((newUserData: any) => {
        const lastestUser = newUserData.data.getUser;
        getUser(transactionUser.id).then((newTransactionalUserData: any) => {
          const latestTransactionalUser = newTransactionalUserData.data.getUser;
          createTransaction(transaction)
            .then((transactionResponse: any) => {
              const transactionId =
                transactionResponse.data.createTransaction.id;
              updateTransaction({
                id: transactionId,
                status: Transaction_status.SUCCESFUL
              })
                .then(() => {
                  const userCMUS = Number((lastestUser.cmus - cmus).toFixed(1));
                  const userTransactionCMUS = Number(
                    (latestTransactionalUser.cmus + cmus).toFixed(1)
                  );
                  updateUserDB({
                    id: lastestUser.id,
                    cmus: userCMUS,
                    transactions: [...lastestUser.transactions, transactionId]
                  })
                    .catch(res => console.log(res))
                    .then((data: any) => {
                      console.log(data, latestTransactionalUser);
                      updateUserDB({
                        id: latestTransactionalUser.id,
                        cmus: Number(userTransactionCMUS),
                        transactions: [
                          ...latestTransactionalUser.transactions,
                          transactionId
                        ]
                      })
                        .catch(res => console.log(res))
                        .then(() => {
                          console.log('im running');
                          updateUser(data.data.updateUser);
                          navigation.navigate(
                            ROUTES.ConfirmationTransactionScreen,
                            {
                              transactionUser: JSON.stringify(transactionUser),
                              transaction: JSON.stringify(transaction)
                            }
                          );
                          this.setState({ loading: false });
                          console.log('SUCCESFUL');
                        });
                    });
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        });
      });
    } else {
      this.setState({
        snackIsVisible: true,
        loading: false,
        errorMessage: 'No tienes suficientes CMUs :('
      });
    }
  }

  render() {
    const { transactionUser, phone_number, loading, cmus } = this.state;
    const { user } = this.props;

    let content;

    if (transactionUser) {
      content = (
        <View
          style={{
            flex: 1,
            padding: hp('3%'),
            width: '100%',
            alignItems: 'center'
          }}>
          <Text style={styles.label}>Nombre parchado</Text>
          <Text style={styles.answer}>{transactionUser.nickname}</Text>
          <Text style={styles.label}>Número del cashie</Text>
          <Text style={styles.answer}>
            {formatPhoneNumber(transactionUser.id)}
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
            disabledStyle={{ backgroundColor: theme.colors.disabled }}
            disabledTitleStyle={{
              color: theme.colors.secondary
            }}
            title='ENVIAR'
            titleStyle={{ color: theme.colors.secondary }}
            onPress={this.sendMoney.bind(this)}
            disabled={!cmus}
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
            width: '100%',
            alignItems: 'center',
            padding: hp('3%')
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
            disabledStyle={{ backgroundColor: theme.colors.disabled }}
            disabledTitleStyle={{ color: theme.colors.secondary }}
            title='BUSCAR'
            titleStyle={{ color: theme.colors.secondary }}
            onPress={this.searchUserByNumber.bind(this)}
            disabled={!phone_number}
          />
        </View>
      );
    }

    return (
      <LinearGradient colors={theme.colors.darkBackground} style={{ flex: 1 }}>
        <AnimatedLoader
          visible={loading}
          overlayColor={theme.colors.softLight}
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
            { zIndex: 1, elevation: 1, paddingTop: hp('5%') }
          ]}>
          <BlurView style={pageStyles.title} tint='default' intesity={40}>
            <Text style={pageStyles.cmu_number}>Datos del pago</Text>
            <Text style={[styles.answer, { textAlign: 'left' }]}>
              Este es tu saldo: {user.cmus}
            </Text>
          </BlurView>
          {content}
        </View>
        <Rectangle w={wp('28%')} h={hp('34%')} t={0} />
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

export default connect(mapStateToProps)(TransactionsScreen);
