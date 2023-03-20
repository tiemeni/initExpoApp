import { StyleSheet } from "react-native";
import colors from "../../constants/colours";


export const styles = StyleSheet.create({
    container: {
        // display: 'flex',
        // flexDirection: "column",
        backgroundColor: "white",
        flex: 1,
        // height: 720
    },
    child1: {
        // flex: 2
        height: 150
    },
    child2of1: {
        height: 100,
        backgroundColor: colors.bg_grey,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    child2: {
        flex: 4.5,
        display: 'flex',
        justifyContent: 'center',
    },
    child3: {
        flex: 3,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
    },
    child4: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    avatarContainer: {
        height: 92,
        width: 92
    }
})