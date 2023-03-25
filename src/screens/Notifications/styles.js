import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingTop: 30,
    },

    headerTitle: {
        fontSize: 22,
        fontWeight: '500',
    },

    groupTitle: {
        fontSize: 18,
        color: colors.text_grey_hint
    },
})

export default styles;