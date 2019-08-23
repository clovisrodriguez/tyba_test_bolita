import React, { Component } from 'react';
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  Text,
  View,
  FlatList
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styles, theme } from '../../theme/index';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import {
  CreateUserInput,
  UpdateTransactionInput,
  Transaction_type
} from '../../API';
import AnimatedLoader from 'react-native-animated-loader';
import { BlurView } from 'expo-blur';
import { ListItem } from 'react-native-elements';
import _ from 'lodash';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { getTransactions, getUser } from '../../client/index';
import updateTransactions from '../../store/actions/storeTransactions';
import updateUser from '../../store/actions/storeUser';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  buttonStyle?: StyleProp<ViewStyle>;
  user: CreateUserInput;
  transactions: Array<UpdateTransactionInput>;
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

class TransactionRecordScreen extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.renderTransaction = this.renderTransaction.bind(this);
    this.getProps = this.getProps.bind(this);
  }
  state = {
    loading: true
  };

  renderTransaction = ({ item }) => {
    const { user } = this.props;
    const toUser = user.id === item.toId;
    const counterPartName = toUser
      ? `de ${item.fromNickName}`
      : `para ${item.toNickname}`;
    const color = toUser ? theme.colors.secondary : theme.colors.white;
    const date = new Date(item.createdAt);

    let typeMessage;
    switch (item.type) {
      case Transaction_type.USER_TRANSACTION:
        typeMessage = `Pago / Envio ${counterPartName}`;
        break;
      case Transaction_type.CASH_IN:
        typeMessage = `Recarga ${counterPartName}`;
        break;
      case Transaction_type.CASH_OUT:
        typeMessage = 'Retiro';
        break;
    }
    return (
      <ListItem
        containerStyle={toUser ? styles.greenCard : styles.blueCard}
        key={item}
        title={`${item.cmus.toString()} CMUs`}
        titleStyle={{ color, fontWeight: 'bold' }}
        rightSubtitle={`${date.getFullYear()}-${date.getMonth() +
          1}-${date.getDate()}`}
        rightSubtitleStyle={{ color, fontStyle: 'italic' }}
        subtitleStyle={{ color, fontStyle: 'italic' }}
        subtitle={typeMessage}
      />
    );
  };

  keyExtractor = (item, index) => index.toString();

  async getProps() {
    const { user } = this.props;
    const newUser = _.get(await getUser(user.id), 'data.getUser', {});
    const transactionListTo = _.get(
      await getTransactions({
        filter: {
          toId: {
            eq: newUser.id
          }
        }
      }),
      'data.listTransactions.items'
    );

    const transactionListFrom = _.get(
      await getTransactions({
        filter: {
          fromId: {
            eq: newUser.id
          }
        }
      }),
      'data.listTransactions.items'
    );

    const userTransactionsByDate = _.orderBy(
      [...transactionListFrom, ...transactionListTo],
      (transaction: UpdateTransactionInput) =>
        new Date(transaction.createdAt).getTime(),
      'desc'
    );

    updateUser(newUser);
    updateTransactions(userTransactionsByDate);
    this.setState({ loading: false });
  }

  componentDidMount() {
    this.getProps();
  }

  render() {
    const { loading } = this.state;
    const { transactions, user } = this.props;

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
            <Text style={pageStyles.cmu_number}>Transacciones</Text>
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
            {transactions.length ? (
              <FlatList
                keyExtractor={this.keyExtractor}
                data={transactions}
                renderItem={this.renderTransaction}
                style={{ width: '100%', height: '100%' }}
              />
            ) : (
              <Text style={{ color: theme.colors.white }}>
                Aun no tienes transacciones :(, ve a comprar ya!!
              </Text>
            )}
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
  user: state.user,
  transactions: state.transactions
});

export default connect(mapStateToProps)(TransactionRecordScreen);
