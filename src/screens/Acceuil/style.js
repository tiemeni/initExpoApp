import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

const styles = StyleSheet.create({
    input: {
        borderRadius: 10,
        height: 50,
        backgroundColor: colors.white,
        marginBottom: 20
    },
    tipBox: {
        width: '100%',
        height: 150,
        backgroundColor: "#04B7C9",
        opacity:0.4,
        borderRadius: 15,
    },
    sectionTitle: {
        fontWeight: '600',
        fontSize: 16
    },
    seeAll: {
        color: colors.primary
    },
    specialityBox: {
        flexWrap: 'wrap',
       //justifyContent:'center',
        alignItems:'center'
    },
    speciality: {
        padding: 5,
        borderRadius: 50,
        backgroundColor: colors.trans_primary,
        marginTop: 10,
        marginRight: 10,
    },
    specialityText: {
        color: colors.black,
        fontSize:14,
        fontWeight:'600'
    }
})

export default styles