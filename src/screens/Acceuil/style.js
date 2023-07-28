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
    },
    speciality: {
        padding: 5,
        borderRadius: 50,
        backgroundColor: colors.transp_success,
        marginTop: 10,
        marginRight: 10,
    },
    specialityText: {
        color: colors.primary
    }
})

export default styles