import React, { Component } from 'react';
import { Linking } from 'react-native';
import { ROUTES } from '../routes/index';
import { NavigationScreenProp } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { theme } from '../theme/index';
import { getUser, onUpdateTransactionSubscription } from '../client/index';
import { faQrcode, faUser, faPaperPlane, faQuestion } from '@fortawesome/free-solid-svg-icons';
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
    const { user, navigation } = this.props;

    onUpdateTransactionSubscription.subscribe({
      next: transaction => {
        const userId = transaction.value.data.onUpdateTransaction.toId;
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
          buttonStyle={navigationStyles.buttonStyle}
          onPress={() => navigation.navigate(ROUTES.TransactionsScreen)}
          icon={
            <FontAwesomeIcon
              icon={faPaperPlane}
              size={hp('4%')}
              color={theme.colors.secondary}
            />
          }
        />
        <Button
          buttonStyle={navigationStyles.buttonStyle}
          onPress={() => navigation.navigate(ROUTES.Dashboard)}
          icon={
            <FontAwesomeIcon
              icon={faQrcode}
              size={hp('4%')}
              color={theme.colors.secondary}
            />
          }
        />
        <Button
          buttonStyle={navigationStyles.buttonStyle}
          onPress={() =>
            navigation.navigate(ROUTES.ProfileScreen)
          }
          icon={
            <FontAwesomeIcon
              icon={faUser}
              size={hp('4%')}
              color={theme.colors.secondary}
            />
          }
        />
        <Button
          buttonStyle={navigationStyles.buttonStyle}
          onPress={() =>
            Linking.openURL('https://wa.me/573192955855')
          }
          icon={
            <FontAwesomeIcon
              icon={faQuestion}
              size={hp('4%')}
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
  },
  buttonStyle: {
    width: wp('20%'),
    height: hp('7%'),
    margin: 0
  }
});

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(NavigationComponent);
