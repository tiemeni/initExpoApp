import { StyleSheet } from "react-native";
import colors from "../../constants/colours";


export const styles = StyleSheet.create({
    constainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.white
    },
    image: {
        width: 25,
        height: 25
    },
    title: {
        fontSize: 20
    }
})