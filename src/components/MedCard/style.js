import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

const styles = StyleSheet.create({
    medBox: {
        height: 300,
        backgroundColor: colors.white,
        width: 200,
        borderRadius: 15,
        padding: 10,
        marginRight: 20
    },
    medPic: {
        backgroundColor: colors.bg_grey,
        width: '100%',
        height: 100,
        borderRadius: 15,
    },
    medName: {
        fontWeight: '600',
    },
    location: {
        color: colors.text_grey_hint
    },
    icon: {
        marginRight: 10,
    },
    tarif: {
        color: colors.secondary
    },
    rdvBtn: {
        height: 50,
        width: '100%',
        backgroundColor: colors.primary,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    }
})

export default styles