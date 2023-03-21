import { StyleSheet } from "react-native";
import colors from "../../../constants/colours";


const styles = StyleSheet.create({

    inputConex: {
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 10,
        height: 50,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: '#F5FAFF',
        backgroundColor: '#F5FAFF',
    },

    inputConexJust: {
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 25,
        height: 50,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
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