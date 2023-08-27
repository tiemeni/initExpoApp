import { StyleSheet } from "react-native";
import colors from "../../constants/colours";


export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
    },
    subContainer: {
        alignItems: 'center',
        padding: 10
    },
    label: {
        fontSize: 14,
        color: colors.black
    },

    description: {
        fontSize: 12,
        color: colors.text_grey_hint
    }
})