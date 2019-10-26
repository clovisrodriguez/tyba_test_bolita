import React, { Component } from 'react';
import { Linking } from 'react-native';
import { ROUTES } from '../routes/index';
import { NavigationScreenProp } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { theme } from '../theme/index';
import { getUser } from '../client/index';
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
    const { navigation } = this.props;

    return (
      <View style={navigationStyles.container}>
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
