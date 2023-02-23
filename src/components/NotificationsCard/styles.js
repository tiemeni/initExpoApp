import colors from "../../constants/colours";

const styles = {
    card: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 10
    },

    headLabel: {
        height: 30,
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },

    label: {
        fontWeight: '500',
    },

    contentTitle: {
        fontWeight: '600',
        fontSize: 16
    },

    contentBody: {
        color: colors.text_grey_hint
    },

    footerLink: {
        justifyContent: 'space-between',
    },

    footerText: {
        color: colors.primary,
        textDecorationLine: 'underline'
    },

    footerDate: {
        fontSize: 12,
        color: colors.text_grey_hint,
    },

    userReact: {
        alignItems: 'center',
        justifyContent: 'center'
    },

    emoji: {
        height: 50,
        width: 50,
        borderRadius: '50%',
        backgroundColor: colors.yellow
    }
}

export default styles;