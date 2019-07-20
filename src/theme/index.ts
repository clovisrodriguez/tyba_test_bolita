import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export const theme = {
  colors: {
    primary: '#88B91E',
    secondary: '#0F253C',
    grey: '#adadad',
    white: '#FFF',
    whiteBackground: '#EAEAEA',
    darkBackground: ['#0F253C', '#010305']
  },
  button: {
    backgroundColor: '#88B91E',
    width: wp('80%'),
    color: '#0F253C',
    marginBottom: 12,
    marginTop: 12,
    borderRadius: 23
  }
};

export const styles: any = {
  answer: {
    color: theme.colors.white,
    fontStyle: 'italic',
    fontSize: hp('3%'),
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
  greenButton: {
    borderRadius: 23,
    height: hp('8%'),
    width: wp('80%'),
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
    backgroundColor: theme.colors.primary
  },
  greenButtonOutline: {
    borderRadius: 23,
    height: hp('8%'),
    width: wp('80%'),
    marginTop: hp('2%'),
    marginBottom: hp('2%')
  },
  innerPage: {
    flex: 1,
    alignItems: 'center',
    zIndex: 1,
    elevation: 3
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
    fontSize: hp('3%'),
    fontWeight: 'bold',
    marginTop: hp('1%'),
    marginBottom: hp('1%')
  },
  lottie: {
    width: 100,
    height: 100
  }
};
