import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Text,
  View
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { styles, theme } from '../theme/index';
import { getUser } from '../client/index';
import { Auth, Analytics } from 'aws-amplify';
import { Button } from 'react-native-elements';
import { ROUTES } from '../routes/index';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux';
import { CreateUserInput } from '../API';
import updateUser from '../store/actions/storeUser';
import AnimatedLoader from 'react-native-animated-loader';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { BlurView } from 'expo-blur';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Rectangle } from '../components/Rectangle';

import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
 
interface IProps {
  navigation: NavigationScreenProp<any, any>;
  buttonStyle?: StyleProp<ViewStyle>;
  user: CreateUserInput;
}

interface IState {
  location: any;
  errorMessage: any;
  places: Array<any>;
}

const APP_ID =
  'twRzsFITSsHgG3HRFYEg'; /* IN A REAL PROJECT I WILL NEVER LEAVE A KEY HERE */
const APP_CODE = 'D6cl63ROyVXtQDlSly0f6g';
class Dashboard extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      errorMessage: null,
      places: null
    };
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      });
    } else {
      this._getLocationAsync();
    }

  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  async componentDidUpdate() {
    const { location } = this.state;
    const { altitude, longitude, latitude } = location.coords
    if(location) {
      //  Bogotá Coordinates return an empty array I didn't count that this API doesnt have any results for the region :/
      const res = await axios.get(`https://places.cit.api.here.com/places/v1/discover/here?app_id=${APP_ID}&app_code=${APP_CODE}&at=${latitude},${longitude}&pretty`);
      this.setState({places: res.data.result.items});
    }
  }

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    return (
      <LinearGradient
        colors={theme.colors.darkBackground}
        style={styles.background}
      >
        <AnimatedLoader
          visible={false}
          overlayColor={theme.colors.softLight}
          animationStyle={styles.lottie}
          speed={1}
        />
        <View style={styles.innerPage}>
          <Text>{text}</Text>
        </View>
        <Rectangle w={wp('29%')} h={hp('32%')} t={hp('26%')} />
        <Rectangle w={wp('32%')} h={hp('34%')} t={hp('6%')} />
        <Rectangle w={wp('26%')} h={hp('26%')} t={hp('19%')} />
      </LinearGradient>
    );
  }
}

const pageStyles = StyleSheet.create({
  balance: {
    width: hp('25%'),
    height: hp('25%'),
    padding: hp('3%'),
    paddingTop: hp('5%'),
    marginBottom: hp('24%'),
    marginTop: hp('5%'),
    marginRight: hp('25%'),
    borderRadius: hp('25%') / 2,
    backgroundColor: theme.colors.secondary
  },
  circleButton: {
    width: hp('10%'),
    height: hp('10%'),
    backgroundColor: theme.colors.primary,
    borderRadius: hp('5%'),
    marginTop: hp('3%')
  }
});

const mapStateToProps = (state: any) => ({
  user: state.user
});

export default connect(mapStateToProps)(Dashboard);
