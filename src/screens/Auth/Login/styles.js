import { Center } from 'native-base';
import { StyleSheet } from 'react-native';
import colors from '../../../constants/colours';

const styles = StyleSheet.create({
  contenair: {
    backgroundColor: "white",
    paddingHorizontal:15
  },
  connexionText: {
    fontWeight: "700",
    fontSize: 24,
  },

  fogetpass: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.yellow,
    marginTop: 20,
    marginBottom: 25,
    textAlign: 'center'
  },

  text1:{
    color:"#858585",
    fontSize: 14,
    fontWeight: '400',
    textAlign:'center'
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
    marginBottom: 10,
    marginTop: 10,
    width: '80%',
    borderRadius: 25,
    //color: colors.black,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
  },

  formContent :{
    alignItems:"center",
    width: '100%',
  },
  formInput:{
    borderRadius:25,
  },

  inputConex: {
    marginTop: 10,
    marginBottom: 7,
    borderRadius: 30,
    height: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderColor: '#F5FAFF',
    backgroundColor: '#F5FAFF',
},

connectWith:{
  color:"#858585"
},

boxIcon:{
  justifyContent:'center',
  width:40,
  height:40,
  paddingLeft:8,
  paddingTop:8,
  backgroundColor:'white'

},

boxGoogle:{
  justifyContent:'center',
  width:40,
  height:40,
  paddingLeft:11,
  paddingTop:4,
  backgroundColor:'white'

},
boxTwitter:{
  justifyContent:'center',
  width:40,
  height:40,
  paddingLeft:10,
  paddingTop:4,
  backgroundColor:'white'
}
});


export default styles;
