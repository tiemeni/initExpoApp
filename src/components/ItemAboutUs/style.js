import { StyleSheet } from "react-native";
import colors from "../../constants/colours";


export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 5,
        paddingLeft: 15,
        justifyContent: 'space-between'
    },
    subContainer: {
        alignItems:'center',
        paddingRight:14
    },
    label: {
        fontSize: 15,
        color:colors.black
    },

    
        description: {
            fontSize: 12
        }
})