import { connect, useDispatch } from "react-redux";
import OnBoarding2 from "../../components/OnBoarding";
import { NORMAL_TEXT_SIZE } from "../../constants/size";
import { setApp } from "../../redux/commons/action";
import logo from "../../assets/img/hospi-rdv__9_-removebg-preview.png";
import { Center, Image, Spinner, Text, VStack } from "native-base";
import { useEffect } from "react";
import { userLocalAuth } from "../../redux/User/action";
import colors from "../../constants/colours";


const Home = ({ loading, localAuth }) => {
    const dispatch = useDispatch();
    dispatch(setApp('initial step !'))

    useEffect(() => {
        dispatch(userLocalAuth())
    }, [])


    return (
        <>
            {!loading && !localAuth ?
                <OnBoarding2 />
                :
                <Center flex={1} alignItems={'center'}>
                    <VStack space={2}>
                        <Image
                            height={200}
                            width={250}
                            source={logo}
                            alt="logo" />
                        <Spinner accessibilityLabel="Loading" size={'sm'} />
                        <Center>
                            <Text color={colors.text_grey_hint} fontSize={14}>Patientez...</Text>
                        </Center>
                    </VStack>
                </Center>
            }
        </>
    )
}
const style = {
    container: {
        flex: 1,
    },
    text: {
        fontSize: NORMAL_TEXT_SIZE
    }
}

const mapStateToProps = ({ UserReducer }) => ({
    loading: UserReducer.loading,
    localAuth: UserReducer.localAuth
})

export default connect(mapStateToProps)(Home);