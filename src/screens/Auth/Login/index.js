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
import * as SCREENS from "../../../constants/screens";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import { useDispatch } from "react-redux";

const Login = ({ navigation }) => {

  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const [loader, setLoading] = useState(false)
  const [show, setShow] = useState(false);
  const [isCkeck, setIsCheck] = useState(false);
  const { isFieldInError } = useValidation({
    state: formFields,
  });

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

  const handleSubmit = () => {
    navigation.navigate(SCREENS.HOME_CONTAINER_ROUTE);
  };

  return (
    <ScrollView style={styles.container}>
      <View flex={1}>
        <View style={styles.logoBox}>
          <Image style={styles.image} source={logo} alt="logo" />
          <Text style={styles.text1}>
            S’il vous plaît, entrez votre email et votre mot de passe
          </Text>
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
            placeholder="Entrer votre addresse mail"
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
            value={formFields.password}
          />
          {(isFieldInError("email") || isFieldInError("password")) && (
            <Text style={styles.errorMsg}>
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
            Se souvenir de moi
          </Text>
        </HStack>

        <Pressable onPress={() => navigation.navigate(SCREENS.PHONE_CONFIRMATION_SCREEN)}>
          <Text style={styles.forgetPassword} mt={5}>Mot de passe oublié ?</Text>
        </Pressable>

        <Center mt={1}>
          <PrimaryButton
            title="Se connecter"
            isLoadingText="Connexion en cours..."
            isLoading={loader}
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
              onPress={() => navigation.navigate(SCREENS.SIGNUP)}
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

export default Login;
