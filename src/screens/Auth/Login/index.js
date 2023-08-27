import React from "react";
import { Image, Pressable, View } from "react-native";
import {
  Center,
  HStack,
  VStack,
  Icon,
  Input,
  Text,
  ScrollView,
  useToast,
  Checkbox
} from "native-base";
import { MaterialIcons, Ionicons, AntDesign, Foundation } from "@expo/vector-icons";
import { useValidation } from "react-native-form-validator";
import colors from "../../../constants/colours";
import styles from "./styles";
import logo from "../../../assets/img/hospi-rdv__9_-removebg-preview.png";
import * as SCREENS from "../../../constants/screens";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { useDispatch, connect } from "react-redux";
import { userLogin, reinitialize, processVerifCode } from "../../../redux/User/action"
import CustomToast from "../../../components/CustomToast";
import { useTranslation } from "react-i18next";

const Login = ({ navigation, error, loading, errorMsg, success }) => {
  const toast = useToast();
  const translate = useTranslation().t;
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);
  const { isFieldInError } = useValidation({ state: formData });
  const [formData, setformData] = React.useState({
    email: "",
    password: "",
    saveCredentials: true
  });

  const handleInputChange = (field, value) => {
    setformData({
      ...formData,
      [field]: value,
    });
  };

  const formValidator = () => {
    return formData.email.trim() === "" ||
      formData.password === "" ||
      formData.password.length < 6 ||
      formData.email.length < 4;
  }
  const isFieldsEmpty = formValidator()


  const handleSubmit = () => {
    dispatch(reinitialize())
    dispatch(userLogin(formData))
  };

  React.useEffect(() => {
    if (error && errorMsg !== '') {
      toast.show({
        render: () => {
          return <CustomToast
            message={errorMsg}
            color={colors.danger}
            bgColor={"red.100"}
            icon={<Foundation name="alert" size={24} />}
            iconColor={colors.danger}
          />
        },
        placement: "top",
        duration: 5000
      })
    }
  }, [error, success])

  return (
    <ScrollView style={styles.container}>
      <View flex={1}>
        <View style={styles.logoBox}>
          <Image style={styles.image} source={logo} alt="logo" />
          <Text style={styles.text1}>
            {translate('TEXT.LOGIN_TITRE')}</Text>
        </View>
        <VStack space={4} style={styles.formContent}>
          <Input
            h={50}
            rounded={50}
            borderWidth={0}
            fontSize={14}
            bg={colors.desable}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="person" />}
                size={5}
                ml="4"
                color={colors.primary}
              />
            }
            placeholder={translate('TEXT.EMAIL_FIELD')}
            keyboardType="default"
            isInvalid={isFieldInError("email")}
            onChangeText={(value) => handleInputChange("email", value)}
            value={formData.email}
          />
          <Input
            rounded={50}
            h={50}
            borderWidth={0}
            fontSize={14}
            bg={colors.desable}
            w={{ base: "100%", md: "100%" }}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="lock" />}
                size={5}
                ml="4"
                color={colors.primary}
              />
            }
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={
                    show ? (
                      <MaterialIcons name="remove-red-eye" />
                    ) : (
                      <Ionicons name="ios-eye-off" />
                    )
                  }
                  size={5}
                  mr="4"
                  color={colors.primary}
                />
              </Pressable>
            }
            type={show ? "text" : "password"}
            placeholder="Entrer votre mot de passe"
            onChangeText={(value) => handleInputChange("password", value)}
            value={formData.password}
          />

          {(isFieldInError("email") || isFieldInError("password")) && (
            <Text style={styles.errorMsg}>
              Remplissez bien les champs !
            </Text>
          )}

          <HStack space={2} mt={1}>
            <Checkbox
              aria-label="cgu"
              isChecked={formData.saveCredentials}
              onPress={() => handleInputChange("saveCredentials", !formData.saveCredentials)}
              color={colors.primary}
            />
            <Text
              style={{
                fontWeight: "400",
                fontSize: 14,
                color: "#5C5C5C",
                fontStyle: "normal",
              }}
            >
              Se souvenir de moi
            </Text>
          </HStack>
        </VStack>

        <Pressable onPress={() => formData?.email && dispatch(processVerifCode(formData?.email)) && navigation.navigate(SCREENS.PHONE_CONFIRMATION_SCREEN, { email: formData?.email })}>
          <Text style={styles.forgetPassword} mt={5}>Mot de passe oublié ?</Text>
        </Pressable>

        <Center mt={2}>
          <PrimaryButton
            title={translate("TEXT.BUTTON_LOGIN")}
            isLoadingText={translate("TEXT.BUTTON_LOGIN_LOADER")}
            isLoading={loading}
            style={styles.submitBtnText}
            color={colors.primary}
            onPress={handleSubmit}
            disabled={isFieldsEmpty}
          />
        </Center>
        <Center>
          <HStack mt={5}>
            <Text style={styles.labelText}>
              Pas encore de compte?
            </Text>
            <Text
              style={[styles.forgetPassword, styles.registerText]}
              onPress={() => {
                dispatch(reinitialize())
                navigation.navigate(SCREENS.SIGNUP)
              }}
              ml={1}
            >
              Inscrivez-vous !
            </Text>
          </HStack>
        </Center>
        {/*<SocialMedia/>*/}
      </View>
    </ScrollView>
  );
};

const mapStateToProps = ({ UserReducer }) => ({
  loading: UserReducer.loading,
  error: UserReducer.error,
  errorMsg: UserReducer.errorMsg,
  success: UserReducer.success
})

export default connect(mapStateToProps)(Login);
