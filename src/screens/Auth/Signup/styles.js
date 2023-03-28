import { StyleSheet } from "react-native";
import colors from "../../../constants/colours";


const styles = StyleSheet.create({

    inputConex: {
        marginTop: 10,
        marginBottom: 7,
        borderRadius: 30,
        height: 50,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderColor: '#F5FAFF',
        backgroundColor: '#F5FAFF',
    },

    inputConexJust: {
        marginTop: 10,
        borderRadius: 30,
        height: 50,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderColor: '#7C7C7C',
        backgroundColor: '#F5FAFF',
        justifyContent: "center"
    },

    submitBtnText: {
        width: '100%',
        borderRadius: 25,
        backgroundColor: colors.primary,
        color: colors.secondaryColor,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
    },

    contenair: {
        paddingHorizontal: 15,
        backgroundColor: "white"
    }

});

export default styles;