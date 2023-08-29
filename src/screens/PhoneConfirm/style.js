import colors from "../../constants/colours";

const styles = {
    circle: {
        borderRadius: 50,
        height: 100,
        width: 100,
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        padding: 2
    },

    message: {
        textAlign: 'center',
        color: colors.text_grey_hint
    },

    phoneNumber: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: '600'
    },

    btn: {
        height: 45,
        width: '90%',
        fontSize: 14,
        borderRadius: 25,
        borderColor: colors.primary,
    },

    btnLabel: {
        fontSize: 16
    }
}

export default styles;