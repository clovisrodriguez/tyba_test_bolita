import React, { Component } from 'react';
import { ROUTES } from '../routes/index';
import { NavigationScreenProp } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { theme } from '../theme/index';
import { getUser, onUpdateTransactionSubscription } from '../client/index';
import { faPlayCircle, faQrcode } from '@fortawesome/free-solid-svg-icons';
import updateUser from '../store/actions/storeUser';
import { connect } from 'react-redux';
import { UpdateUserInput } from '../API';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

interface IProps {
  navigation: NavigationScreenProp<any, any>;
  user: UpdateUserInput;
}

class NavigationComponent extends Component<IProps, any> {
  render() {
    const { user } = this.props;
    onUpdateTransactionSubscription.subscribe({
      next: transaction => {
        const userId = transaction.value.data.onUpdateTransactions.to.id;
        if (Object.keys(user).length > 0) {
          userId === user.id &&
            getUser(user.id).then((userTable: any) => {
              updateUser(userTable.data.getUser);
            });
        }
      }
    });
    return (
      <View style={navigationStyles.container}>
        <Button
          style={{
            width: wp('18%'),
            height: hp('8%'),
            margin: 0
          }}
          onPress={() => this.props.navigation.navigate(ROUTES.QRScreen)}
          icon={
            <FontAwesomeIcon
              icon={faQrcode}
              size={hp('5%')}
              color={theme.colors.secondary}
            />
          }
        />
        <Button
          style={{
            width: wp('20%'),
            height: hp('8%'),
            margin: 0
          }}
          onPress={() => this.props.navigation.navigate(ROUTES.Dashboard)}
          icon={
            <FontAwesomeIcon
              icon={faPlayCircle}
              size={hp('5%')}
              color={theme.colors.secondary}
            />
          }
        />
      </View>
    );
  }
}

const navigationStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 0
  }
});

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(NavigationComponent);
