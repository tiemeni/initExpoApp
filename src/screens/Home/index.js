import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NORMAL_TEXT_SIZE } from "../../constants/size";
import { setApp } from "../../redux/commons/action";

const Home = () => {
    const dispatcher = useDispatch();
    dispatcher(setApp('initial step !'))
    const step = useSelector(state => state.Common.actualStep)
    return <View style={style.container}><Text style={style.text}>{step}</Text></View>
}
const style = {
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: NORMAL_TEXT_SIZE
    }
}

export default Home;