import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white
    },

    infoBox: {
        backgroundColor: colors.trans_primary,
        padding: 10,
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    },

    boxTitle: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: '500',
    },

    descText: {
        marginTop: 5
    },

    warningText: {
        marginTop: 10,
        fontSize: 12,
        color: colors.secondary
    },

    paymentBox: {
        marginTop: 20
    },

    titleBox: {
        marginLeft: 20,
        marginRight: 20,
    },

    paymentTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    titleHelper: {
        color: colors.text_grey_hint,
        fontSize: 14
    },

    paymentMethod: {
        height: 55,
        width: 55,
        backgroundColor: colors.white,
        borderRadius: 50,
        marginRight: 15,
        alignItems:'center',
        justifyContent:'center',
       shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 6,
    },

    cardInfos: {
        margin: 20
    },

    inputLabel: {
        marginBottom: 5,
        fontWeight: '500'
    },

    inputBox: { marginTop: 15 },
    input: {
        borderRadius: 10,
        height: 40,
        // backgroundColor: colors.danger,
        borderWidth: 1,
        borderColor: 'gainsboro'
    },

    btnBox: {
        margin: 20
    },

    btn: {
        height: 50,
        borderRadius: 10,
        borderColor: colors.primary,
    },

    btnLabel: {
        fontSize: 18
    },

    scrollView: {
        padding: 20
    }
})

export default styles