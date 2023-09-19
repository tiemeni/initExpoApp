import { connect, useDispatch } from "react-redux";
import OnBoarding2 from "../../components/OnBoarding";
import { NORMAL_TEXT_SIZE } from "../../constants/size";
import { setApp } from "../../redux/commons/action";
import logo from "../../assets/img/hospi-rdv__9_-removebg-preview.png";
import { Center, Image, Spinner, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { userLocalAuth } from "../../redux/User/action";
import colors from "../../constants/colours";
import { IS_BYPASS_ONBOARDING } from "../../constants/others";
import { getLocalStorageOnBoardingState } from "../../utils/helper";
import Login from "../Auth/Login";

const Home = ({ loading, localAuth }) => {
  const dispatch = useDispatch();
  const [bypassOnboarding, setBypassOnboarding] = useState(false);

  dispatch(setApp("initial step !"));

  useEffect(() => {
    getLocalStorageOnBoardingState(IS_BYPASS_ONBOARDING).then((res) => {
      if (JSON.parse(res)?.data) {
        setBypassOnboarding(JSON.parse(res)?.data);
      }
    });
    dispatch(userLocalAuth());
  }, []);

  return (
    <>
      {!loading && !localAuth ? (
        bypassOnboarding ? (
          <Login />
        ) : (
          <OnBoarding2 />
        )
      ) : (
        <Center flex={1} alignItems={"center"}>
          <VStack space={2}>
            <Image height={200} width={250} source={logo} alt="logo" />
            <Spinner accessibilityLabel="Loading" size={"sm"} />
            <Center>
              <Text color={colors.text_grey_hint} fontSize={14}>
                Patientez...
              </Text>
            </Center>
          </VStack>
        </Center>
      )}
    </>
  );
};
const style = {
  container: {
    flex: 1,
  },
  text: {
    fontSize: NORMAL_TEXT_SIZE,
  },
};

const mapStateToProps = ({ UserReducer }) => ({
  loading: UserReducer.loading,
  localAuth: UserReducer.localAuth,
});

export default connect(mapStateToProps)(Home);
