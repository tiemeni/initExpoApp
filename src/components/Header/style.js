import { StyleSheet } from "react-native";
import colors from "../../constants/colours";


export const styles = StyleSheet.create({
    constainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 25,
        height: 25,
        marginRight: 20
    },
    title: {
        fontSize: 20
    }
})