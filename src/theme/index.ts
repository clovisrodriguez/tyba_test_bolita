import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';

export const theme = {
  colors: {
    darkBackground: ['#0F253C', '#010305'],
    darkLabel: '#121212',
    disabled: '#5f4621',
    disabledGrey: '#d9d9d9',
    grey: '#adadad',
    linkGrey: '#5e5e5e',
    primary: '#E0525D',
    secondary: '#0F253C',
    softBlue: '#1F3A54',
    softLight: 'rgba(252, 214, 42, 0.2)',
    primaryTransparent: 'rgba(220, 148, 37, 0)',
    transparent: 'rgba(20, 20, 20, 0)',
    white: '#FFF',
    whiteBackground: '#EAEAEA'
  }
};

export const styles = StyleSheet.create({
  answer: {
    color: theme.colors.white,
    fontStyle: 'italic',
    fontSize: wp('4%'),
    marginTop: 2,
    marginBottom: 8,
    textAlign: 'center'
  },
  background: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: hp('3%'),
    height: hp('100%'),
    width: wp('100%')
  },
  blueCard: {
    backgroundColor: theme.colors.softBlue,
    borderRadius: wp('2%'),
    marginTop: hp('1%'),
    marginBottom: hp('1%')
  },
  greenButton: {
    borderRadius: 23,
    height: hp('8%'),
    width: wp('80%'),
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    backgroundColor: theme.colors.primary
  },
  greenButtonOutline: {
    borderRadius: 23,
    height: hp('8%'),
    width: wp('80%'),
    marginTop: hp('1%'),
    marginBottom: hp('1%')
  },
  greenCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: wp('2%'),
    marginTop: hp('1%'),
    marginBottom: hp('1%')
  },
  innerPage: {
    flex: 1,
    alignItems: 'center',
    zIndex: 1,
    elevation: 3
  },
  innerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    height: hp('6%'),
    backgroundColor: '#fff',
    marginTop: 12,
    marginBottom: 12,
    borderBottomWidth: 0,
    paddingLeft: 45,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 15,
    fontSize: 14,
    shadowColor: '#000000',
    shadowOpacity: 0.1
  },
  label: {
    color: theme.colors.white,
    textAlign: 'center',
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginTop: wp('1%'),
    marginBottom: wp('1%')
  },
  link: {
    color: theme.colors.linkGrey,
    textDecorationLine: 'underline'
  },
  lottie: {
    width: 100,
    height: 100
  },
  simpleButtonWhite: {
    backgroundColor: theme.colors.transparent
  },
  whiteTitleButton: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
