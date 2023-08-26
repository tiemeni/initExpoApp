import { StyleSheet } from "react-native";
import colors from "../../constants/colours";

const styles = StyleSheet.create({
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
})

export default styles