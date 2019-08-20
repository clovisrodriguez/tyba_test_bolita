import React, { Component } from 'react';
import {
  StyleSheet,
  ViewStyle,
  StyleProp,
  Text,
  View,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styles, theme } from '../../theme/index';
import { ROUTES } from '../../routes/index';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import {
  CreateUserInput,
  UpdateTransactionInput,
} from '../../API';
import AnimatedLoader from 'react-native-animated-loader';
import { BlurView } from 'expo-blur';
import { Button } from 'react-native-elements';
import _ from 'lodash';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import updateUser from '../../store/actions/storeUser';
import { Auth } from 'aws-amplify';

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
        transform: [{ rotate: '180deg' }]
      }}
    />
  );
};

class ProfileScreen extends Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  state = {
    loading: false
  };

  render() {
    const { loading } = this.state;
    const { navigation, user } = this.props;

    return (
      <LinearGradient
        colors={theme.colors.darkBackground}
        style={{ flex: 1 }}>
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
            <Text style={pageStyles.cmu_number}>Perfil</Text>
            <Text style={[styles.answer, { textAlign: 'left' }]} />
          </BlurView>
          <View
            style={{
              flex: 1,
              width: '100%',
              padding: 20,
              alignItems: 'center'
            }}>
            <Text style={styles.label}>Nombre parchado</Text>
            <Text style={styles.answer}>{user.nickname}</Text>
            <Text style={styles.label}>Número celular</Text>
            <Text style={styles.answer}>{user.id}</Text>
            <Text style={styles.label}>Correo</Text>
            <Text style={styles.answer}>{user.email}</Text>
            <Button
              style={{ marginTop: hp('20%') }}
              buttonStyle={styles.greenButton}
              title='VER HISTORIAL'
              titleStyle={{ color: theme.colors.secondary }}
              onPress={() => navigation.navigate(ROUTES.TransactionsRecordScreen)}
            />
            <Button
              buttonStyle={styles.greenButtonOutline}
              type='outline'
              title='CERRAR SESIÓN'
              titleStyle={{ color: theme.colors.primary }}
              onPress={() =>
                Auth.signOut({ global: true })
                  .then(() => {
                    navigation.navigate(ROUTES.HomeScreen);
                    updateUser({});
                  })
                  .catch(err => {
                    console.log(err);
                  })
              }
            />
          </View>
        </View>
        <Rectangle w={wp('28%')} h={hp('25%')} t={hp('0%')} />
        <Rectangle w={wp('15%')} h={hp('25%')} t={hp('12%')} />
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

export default connect(mapStateToProps)(ProfileScreen);
