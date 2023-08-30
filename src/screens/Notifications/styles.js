import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

const styles = StyleSheet.create({
    container: {
        padding: 12,
        paddingTop: 20,
    },

    headerTitle: {
        fontSize: 20,
        paddingVertical: 2
    },

    groupTitle: {
        fontSize: 16,
        color: colors.text_grey_hint
    },
})

export default styles;