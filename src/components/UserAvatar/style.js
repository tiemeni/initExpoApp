import { StyleSheet } from "react-native";
import colors from "../../constants/colours";


export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameText: {
        fontSize: 17,
        fontWeight: "bold"
    },
    emailText: {
        color: 'gray'
    },
    age: {
        color: 'gray',
        textAlign: "center"
    },
    info: {
        marginLeft: 10
    },
    image: {
        width: 20,
        height: 30
    }
})