import { StyleSheet } from "react-native";

import { height, width } from "../../constants/Layout";
import colors from "../../constants/colours";

const styles = StyleSheet.create({

    contenair: {
        flex: 1,
        flexDirection: 'column',
        borderColor: "red",
        backgroundColor: "white"
    },
    section1: {
        flex: 3
    },
    section1of1: {
        height: "34%"
    },
    section2of1: {
        height: "66%",
        display: "flex",
        flexDirection: 'row',
        backgroundColor: colors.bg_grey,
    },
    section2: {
        flex: 6,
        height: "100%",
        paddingTop: "5%"
    },
    section3: {
        flex: 2,
    },
    item: {
        height: "15%",
        margin: 5,
        // width: "95%",
    }
});

export default styles;