import colors from '../../constants/colours';

const styles = {
    container: {
        backgroundColor: colors.bg_grey,
    },

    headerItemGroup: {
        paddingLeft:3,
    },

    headerText: {
        color: colors.text_grey_hint
    },

    headerItem: {
        alignItems: 'center',
        marginBottom:8,
    },

    iconBox: {
        height: 40,
        width: 40,
        marginRight:0,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textBox:{
        fontSize:16
    }
}

export default styles;