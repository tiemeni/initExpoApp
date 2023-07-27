import React, { useState } from "react";
import { Image, Pressable, View } from "react-native";
import { Checkbox } from "react-native-paper";
import { Box, Center, HStack, VStack, Icon, Input, Text, ScrollView } from "native-base";
import { MaterialIcons, Ionicons, FontAwesome  } from "@expo/vector-icons";
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

const Login = ({ navigation }) => {
  const [formFields, setFormFields] = useState({
    username: "",
    password: "",
  });
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
    formFields.username.trim() === "" ||
    formFields.password === "" ||
    formFields.password.length < 6 ||
    formFields.username.length < 4;

  return (
    <ScrollView style={styles.contenair}>
    <View flex={1}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
          marginTop:10
        }}
      >
        <Image
          style={{ width: 200, height: 150, marginTop: 20 }}
          source={logo}
          alt={logo}
        />
        <Text style={styles.text1}>S’il vous plaît, entrez votre email et votre mot de passe</Text>
      </View>
      <VStack space={5} style={styles.formContent}>
        <Input
          h={50}
          rounded={25}
          borderWidth={0}
          bg={colors.desable}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="person" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder="Entrer votre addresse mail"
          keyboardType="default"
          isInvalid={isFieldInError("username")}
          onChangeText={(value) => handleInputChange("username", value)}
          value={formFields.username}
        />
        <Input
          rounded={25}
          h={50}
          borderWidth={0}
          bg={colors.desable}
          w={{ base: "100%", md: "100%" }}
          InputLeftElement={
            <Icon
              as={<MaterialIcons name="lock" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          InputRightElement={
            formFields.password ===""?"":
            (<Pressable onPress={handleViewPass}>
              <Icon
                as={
                  viewPass ? (
                    <MaterialIcons name="remove-red-eye" />
                  ) : (
                    <Ionicons name="ios-eye-off" />
                  )
                }
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>)
          }
          type={viewPass ? "text" : "password"}
          placeholder="Entrer votre mot de passe"
          onChangeText={(value) => handleInputChange("password", value)}
          value={formFields.password}
        />
        {(isFieldInError("username") || isFieldInError("password")) && (
          <Text
            style={{ color: "red", fontSize: 14, marginTop: 3, marginLeft: 8 }}
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
            status={isCkeck?"checked":"unchecked"}
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
      <Pressable onPress={() => navigation.navigate(PHONE_CONFIRMATION_SCREEN)}>
        <Text style={styles.fogetpass}>Mot de passe oublié ?</Text>
      </Pressable>
      <Center>
        <PrimaryButton
          title="Se connecter"
          isLoadingText="En Cours..."
          isLoading={false}
          style={styles.submitBtnText}
          color={isFieldsEmpty ? colors.text_grey_hint : colors.primary}
          onPress={() => navigation.navigate(HOME_CONTAINER_ROUTE)}
          disabled={isFieldsEmpty}
        />
      </Center>
      <Center>
        <VStack>
          <Text style={{ marginBottom: 10, color: "#858585" }}>
            Pas encore de compte ?{" "}
            <Text
              style={styles.fogetpass}
              onPress={() => navigation.navigate(SIGNUP)}
            >
              Inscrivez-vous !
            </Text>
          </Text>
        </VStack>
        <Text style={styles.connectWith}>Connectez-vous avec </Text>
        <HStack mb={4} mt={2} flex={1} space={8}>
          <Box rounded={50} style={styles.boxIcon} shadow={2}><Center><Icon size={5} color={'blue.300'} as={<FontAwesome  name="facebook"/>}/></Center></Box>
          <Box shadow={1} rounded={50} style={styles.boxGoogle}><Icon size={5} color={'red.800'} as={<FontAwesome name="google"/>}/></Box>
          <Box shadow={1} rounded={50} style={styles.boxTwitter}><Icon size={6} color={'blue.300'} as={<Ionicons name="md-logo-twitter"/>}/></Box>
        </HStack>
      </Center>
    </View>
    </ScrollView>
  );
};

export default Login;
