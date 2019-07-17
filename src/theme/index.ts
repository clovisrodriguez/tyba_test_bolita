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
    width: 320,
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
    fontSize: 18,
    marginTop: 2,
    marginBottom: 8,
    textAlign: 'center'
  },
  background: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    height: '100%',
    width: '100%'
  },
  greenButton: {
    borderRadius: 23,
    height: 56,
    width: 320,
    marginTop: 13,
    marginBottom: 13,
    backgroundColor: theme.colors.primary
  },
  greenButtonOutline: {
    borderRadius: 23,
    height: 56,
    width: 320,
    marginTop: 13,
    marginBottom: 13
  },
  innerPage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    elevation: 3
  },
  input: {
    height: 40,
    width: 319,
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
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 12
  },
  lottie: {
    width: 100,
    height: 100
  }
};
