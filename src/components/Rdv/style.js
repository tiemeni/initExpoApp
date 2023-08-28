import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

const styles = StyleSheet.create({
    mapBtn: {
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor: colors.white,
        borderColor: colors.primary,
        borderWidth: 1.5
    },
    reportBtn: {
        backgroundColor: colors.trans_primary,
        height: 40,
        width: '80%',
        display: "flex",
        flexDirection: "row",
        borderRadius: 10,
        justifyContent: "center",
        marginRight: 10,
        alignItems: "center"
    },
    reportText: { color: colors.primary, fontSize: 16, fontWeight: "500" },
    left: {
        width: "50%",
    }
})

export default styles