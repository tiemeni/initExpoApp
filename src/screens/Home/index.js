import { View } from "react-native";
import { useDispatch } from "react-redux";
import OnBoarding2 from "../../components/OnBoarding";
import { NORMAL_TEXT_SIZE } from "../../constants/size";
import { setApp } from "../../redux/commons/action";

const Home = () => {
    const dispatcher = useDispatch();
    dispatcher(setApp('initial step !'))

    return <OnBoarding2 />
}
const style = {
    container: {
        flex: 1,
    },
    text: {
        fontSize: NORMAL_TEXT_SIZE
    }
}

export default Home;