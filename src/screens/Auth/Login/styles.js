import { Center } from 'native-base';
import { StyleSheet } from 'react-native';
import colors from '../../../constants/colours';

const styles = StyleSheet.create({
  contenair: {
    backgroundColor: "white"
  },
  connexionText: {
    fontWeight: "700",
    fontSize: 24,
  },

  inputConex: {
    marginTop: 10,
    marginBottom: 7,
    borderRadius: 25,
    height: 50,
    width: "90%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderColor: '#7C7C7C',
    backgroundColor: '#F5FAFF',

  },
  fogetpass: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.yellow,
    marginTop: 20,
    marginBottom: 25,
    textAlign: 'center'
  },
  clor: {
    color: colors.secondaryColor,
    fontSize: 16,
    fontWeight: "400"
  },
  forgetpass: {
    fontWeight: "400",
    color: colors.secondaryColor,
    fontSize: 16,
    marginLeft: "auto",
    marginRight: 2,
    marginTop: 10,
    textDecorationLine: 'underline',
    textDecorationColor: colors.secondaryColor,
    textDecorationStyle: 'solid',
  },
  textT: {
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
    color: colors.blackffColor,
    textAlign: 'center',

  },
  clorS: {
    color: colors.secondaryColor,
    fontSize: 12,
    fontWeight: "400",
    textAlign: 'center',
  },
  submitBtnText: {
    marginBottom: 15,
    width: '90%',
    borderRadius: 25,
    backgroundColor: colors.primary,
    color: colors.secondaryColor,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
  }
});

export default styles;
