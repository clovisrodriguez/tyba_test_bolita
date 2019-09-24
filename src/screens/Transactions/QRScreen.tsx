import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import AnimatedLoader from 'react-native-animated-loader';
import { styles, theme } from '../../theme/index';
import { CreateUserInput } from '../../API';
import QRCode from 'react-native-qrcode-svg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ROUTES } from '../../routes';
import base64 from 'react-native-base64';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from 'react-native-responsive-screen';

interface QRComponent {
  translateY: Animated.Value;
  onGestureEvent: any;
}

interface IProps {
  user: CreateUserInput;
  navigation?: NavigationScreenProp<any, any>;
}

interface IState {
  displayArrow?: boolean;
  hasCameraPermission?: any;
  scanned?: any;
  loading?: boolean;
}

class QRComponent extends Component<IProps, IState> {
  screenHeight = Dimensions.get('window').height * 0.7;
  translateY = new Animated.Value(this.screenHeight);
  _panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: Animated.event([null, { dy: this.translateY }]),
    onPanResponderRelease: (e, { dy }) => {
      if (dy < 0) {
        Animated.spring(this.translateY, {
          toValue: 0,
          bounciness: 20
        }).start();
      } else if (dy > 0) {
        Animated.spring(this.translateY, {
          toValue: this.screenHeight,
          bounciness: 20
        }).start();
      }
    }
  });

  render() {
    const { user } = this.props;
    const QRdata = base64.encode(JSON.stringify(user));

    return (
      <View style={{ width: '100%' }}>
        <Animated.View
          style={[
            pageStyles.toggler,
            {
              transform: [{ translateY: this.translateY }]
            }
          ]}
          {...this._panResponder.panHandlers}>
          <FontAwesomeIcon
            icon={faGripLines}
            size={24}
            color={theme.colors.grey}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: hp('2%'),
              color: theme.colors.grey,
              height: hp('4%')
            }}>
            QR de {user.nickname}
          </Text>
        </Animated.View>
        <Animated.View
          style={[
            pageStyles.box,
            {
              transform: [{ translateY: this.translateY }]
            }
          ]}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: hp('2%'),
              marginBottom: hp('4%')
            }}>
            ¡Utiliza tu QR para que te pasen más Cashies!
          </Text>
          <QRCode value={QRdata} size={wp('80%')} />
          <Text
            style={{
              textAlign: 'center',
              fontSize: hp('2%'),
              marginTop: hp('4%')
            }}
            onPress={() =>
              this.props.navigation.navigate(ROUTES.TransactionsScreen)
            }>
            Si deseas enviar Cashies al número celular de amigo presiona aquí >>
          </Text>
        </Animated.View>
      </View>
    );
  }
}

class QRScreen extends Component<IProps, IState> {
  state = {
    hasCameraPermission: null,
    scanned: false,
    loading: false
  };

  async componentDidMount() {
    this.setState({ loading: true });
    this.getPermissionsAsync().then(() => this.setState({ loading: false }));
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    const decodeData = base64.decode(data);
    this.props.navigation.navigate(ROUTES.TransactionsScreen, {
      type,
      decodeData
    });
  };

  render() {
    const { user } = this.props;
    const { hasCameraPermission, scanned, loading } = this.state;

    if (hasCameraPermission === null) {
      return (
        <AnimatedLoader
          visible={loading}
          overlayColor={theme.colors.softLight}
          animationStyle={styles.lottie}
          speed={1}
        />
      );
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View
        style={{
          height: '100%',
          backgroundColor: theme.colors.secondary,
          width: '100%'
        }}>
        <AnimatedLoader
          visible={loading}
          overlayColor={theme.colors.softLight}
          animationStyle={styles.lottie}
          speed={1}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <QRComponent user={user} navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const pageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  box: {
    height: hp('70%'),
    width: '100%',
    backgroundColor: theme.colors.white,
    padding: hp('4%'),
    alignItems: 'center',
    justifyContent: 'center'
  },
  toggler: {
    marginTop: '20%',
    height: hp('10%'),
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.grey,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingTop: 10
  }
});

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(QRScreen);
