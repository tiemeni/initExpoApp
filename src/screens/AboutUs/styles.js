import colors from '../../constants/colours';

const styles = {
    container: {
        backgroundColor: colors.bg_grey,
        padding:8
    },

    headerItemGroup: {
        padding: 15,
    },

    headerText: {
        color: colors.text_grey_hint
    },

    headerItem: {
        alignItems: 'center',
        marginBottom: '5%',
    },

    hstackItem: {
        marginTop:40,
        justifyContent:'center'
    },

    titreContact:{
      fontSize: 16,
      fontWeight:'bold'
    },

    iconBox: {
        height: 50,
        width: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
}

export default styles;