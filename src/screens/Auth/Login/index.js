import React, { useState } from "react";
import { Image, Pressable, View } from "react-native";
import { Checkbox } from "react-native-paper";
import {
  Box,
  Center,
  HStack,
  VStack,
  Icon,
  Input,
  Text,
  ScrollView,
} from "native-base";
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import { useValidation } from "react-native-form-validator";
import colors from "../../../constants/colours";
import styles from "./styles";
import logo from "../../../assets/img/hospi-rdv__9_-removebg-preview.png";
import {
  HOME_CONTAINER_ROUTE,
  PHONE_CONFIRMATION_SCREEN,
  SIGNUP,
} from "../../../constants/screens";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import '../../../i18n'

const Login = ({ navigation }) => {

  const translate = useTranslation().t;

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [loader, setLoading] = useState(false)
  const [viewPass, setView] = useState(false);
  const [isCkeck, setIsCheck] = useState(false);
  const { isFieldInError } = useValidation({
    state: formFields,
  });
  
  const handleViewPass = () => {
    setView(!viewPass);
  };
  const handleCheck = () => {
    setIsCheck(!isCkeck);
  };

  const handleInputChange = (field, value) => {
    setFormFields({
      ...formFields,
      [field]: value,
    });
  };

  const isFieldsEmpty =
    formFields.email.trim() === "" ||
    formFields.password === "" ||
    formFields.password.length < 6 ||
    formFields.email.length < 4;

    const HanleLogin = () => {
      console.log('info pour le login', formFields);
      setLoading(true);
      //dispatch(login(formFields))
      setTimeout(() => {
        navigation.navigate(HOME_CONTAINER_ROUTE);
          setLoading(false);
      }, 5000); // 10000 ms = 10 secondes
    };

  return (
    <ScrollView style={styles.contenair}>
      <View flex={1}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 30,
            marginTop: 10,
          }}
        >
          <Image
            style={{ width: 200, height: 150, marginTop: 20 }}
            source={logo}
            alt={logo}
          />
          <Text style={styles.text1}>
          {translate('TEXT.LOGIN_TITRE') }</Text>
        </View>
        <VStack space={5} style={styles.formContent}>
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
            value={formFields.email}
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
              formFields.password === "" ? (
                ""
              ) : (
                <Pressable onPress={handleViewPass}>
                  <Icon
                    as={
                      viewPass ? (
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
              )
            }
            type={viewPass ? "text" : "password"}
            placeholder={translate('TEXT.PASS_FIELD')}
            onChangeText={(value) => handleInputChange("password", value)}
            value={formFields.password}
          />
          {(isFieldInError("email") || isFieldInError("password")) && (
            <Text
              style={{
                color: "red",
                fontSize: 14,
                marginTop: 3,
                marginLeft: 8,
              }}
            >
              Remplissez bien les champs !
            </Text>
          )}
        </VStack>
        <HStack
          style={{
            alignItems: "center",
            marginTop: 15,
            marginBottom: 5,
            marginLeft: 3,
          }}
        >
          <Checkbox
            status={isCkeck ? "checked" : "unchecked"}
            onPress={handleCheck}
            color={colors.primary}
          />
          <Text
            style={{
              fontWeight: "400",
              fontSize: 14,
              color: "#5C5C5C",
              fontStyle: "normal",
              marginLeft: 10,
            }}
          >
            {translate("TEXT.LOGIN_REMEMBER")}
          </Text>
        </HStack>
        <Pressable
          onPress={() => navigation.navigate(PHONE_CONFIRMATION_SCREEN)}
        >
          <Text style={styles.fogetpass}>{translate("TEXT.PASS_FORGET")}</Text>
        </Pressable>
        <Center>
          <PrimaryButton
            title={translate("TEXT.BUTTON_LOGIN")}
            isLoadingText={translate("TEXT.BUTTON_LOGIN_LOADER")}
            isLoading={loader}
            style={styles.submitBtnText}
            color={isFieldsEmpty ? colors.text_grey_hint : colors.primary}
            onPress={HanleLogin}
            disabled={isFieldsEmpty}
          />
        </Center>
        <Center>
          <VStack mt={5}>
            <Text style={{ marginBottom: 10, color: "#858585" }}>
              {translate("TEXT.NOT_HAVE_ACCOUNT")}
              <Text
                style={styles.fogetpass}
                onPress={() => navigation.navigate(SIGNUP)}
              >
                {translate("TEXT.SINSCRIRE")}
              </Text>
            </Text>
          </VStack>
        </Center>
        {/*<SocialMedia/>*/}
      </View>
    </ScrollView>
  );
};

export default Login;
