import { StyleSheet } from "react-native";
import colors from "../../../constants/colours";


const styles = StyleSheet.create({

    inputConex:{
        marginTop:10,
        marginBottom:5,
        borderRadius:25,
        height:50,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        borderColor:'#7C7C7C',
        backgroundColor:'#e3e6e8',},

        inputConexJust:{
            marginTop:10,
            marginBottom:5,
            borderRadius:25,
            height:50,
            borderTopLeftRadius:25,
            borderTopRightRadius:25,
            borderColor:'#7C7C7C',
            backgroundColor:'#F5FAFF',
            justifyContent:"center"
        },

        submitBtnText:{
        width:'80%',
        borderRadius:25,
        backgroundColor:colors.primary,
        color:colors.secondaryColor,
        alignItems:'center',
        height:48,
        justifyContent:'center',
        },

        contenair:{
           height:'100%',
           paddingHorizontal:15,
           backgroundColor:colors.whiteColor
        }
  
});

export default styles;