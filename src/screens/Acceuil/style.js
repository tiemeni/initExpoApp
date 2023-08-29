import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

const styles = StyleSheet.create({
    filter: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20
    },
    medPic: {
        height: 45,
        width: 45,
        borderRadius: 5,
        backgroundColor: colors.bg_grey
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.01,
        shadowRadius: 3.84,
        elevation: 0.1,
    }
})

export default styles