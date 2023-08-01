import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Pressable, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  Box,
  HStack,
  Icon,
  Input,
  VStack,
  useToast,
  Center,
  Image,
  ScrollView,
} from "native-base";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Logo from "../../../assets/img/hospi-rdv__9_-removebg-preview.png";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import colors from "../../../constants/colours";
import styles from "./styles";
import moment from "moment";
import { Checkbox } from "react-native-paper";
import SocialMedia from "../../../components/ConnectWithSocilalMedia";
import { LOGIN } from "../../../constants/screens";

const Signup = ({ navigation }) => {
  const toast = useToast();
  const [date, setDate] = useState(moment().format("DD/MM/YYYY"));
  const [isCkeck, setIsCheck] = useState(false);

  const [formFields, setFormFields] = useState({
    firstName: "",
    email: "",
    emailConfirm: "",
    phone: "",
    birthday: "",
  });
  const [errors, setErrors] = useState({});
  const [textDate, setTextDate] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loader, setLoading] = useState(false);

  const handleDateChange = useCallback(
    (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowDatePicker(Platform.OS === "ios");
      setDate(currentDate);

      const formattedDate = moment(currentDate).format("DD/MM/YYYY");
      setFormFields({
        ...formFields,
        birthday: formattedDate,
      });
    },
    [date, formFields]
  );

  const showDatepicker = useCallback(() => {
    setShowDatePicker(true);
  }, []);

  const handleInputChange = (field, value) => {
    setFormFields({
      ...formFields,
      [field]: value,
    });
  };

  useEffect(() => {
    const currentDate = moment().format("DD/MM/YYYY");
    setTextDate(date === currentDate);
  }, [date]);

  const formattedDate = moment(date, "DD/MM/YYYY").format("DD/MM/YYYY");

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const email1 = isValidEmail(formFields.email)
  const email2 = isValidEmail(formFields.emailConfirm)

  const isFieldsEmpty =
    formFields.firstName === "" ||
    formFields.email === "" ||
    formFields.emailConfirm === "" ||
    formFields.phone === "" ||
    formFields.birthday === "" ||
    isCkeck === false;

  const onSubmit = () => {
    if (!isFieldsEmpty) {
      console.log("Mes données de création compte", formFields);

      setLoading(true);
      setTimeout(() => {
        navigation.navigate(LOGIN);
      }, 10000);
    } else {
      console.log("Validation Failed ", errors);
    }
  };

  const handleCheck = () => {
    setIsCheck(!isCkeck);
  };

  return (
    <ScrollView flex={1} backgroundColor={"white"}>
      <VStack flex={1} backgroundColor={"white"}>
        <View justifyContent={"center"} alignItems={"center"}>
          <VStack width={"95%"}>
            <Image
              width={"100%"}
              height={180}
              source={Logo}
              resizeMode={"contain"}
              alt="logo"
            />
          </VStack>
        </View>
        <VStack style={styles.contentForm}>
          <VStack space={3} width={"100%"}>
            <Input
              rounded={50}
              borderWidth={0}
              style={{ fontSize: 14 }}
              bg={colors.desable}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="3"
                  color={colors.primary}
                />
              }
              placeholder="Nom"
              onChangeText={(value) => handleInputChange("firstName", value)}
              value={formFields.firstName}
            />
            <Input
              rounded={50}
              borderWidth={0}
              style={{ fontSize: 14 }}
              bg={colors.desable}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="email" />}
                  size={5}
                  ml="3"
                  color={colors.primary}
                />
              }
              placeholder="adresse mail"
              onChangeText={(value) => handleInputChange("email", value)}
              value={formFields.email}
            />
            {!email1 && formFields.email !=="" &&
            <Text style={{
              fontSize: 10,
              marginLeft: 12,
              color: colors.danger,
            }}>Veillez saisir l'email valide svp !</Text>}
            <Input
              rounded={50}
              borderWidth={0}
              style={{ fontSize: 14 }}
              bg={colors.desable}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="email" />}
                  size={5}
                  ml="3"
                  color={colors.primary}
                />
              }
              placeholder="Confirmer votre adresse mail"
              onChangeText={(value) => handleInputChange("emailConfirm", value)}
              value={formFields.emailConfirm}
            />
            {formFields.email !== formFields.emailConfirm && formFields.emailConfirm !== "" &&
            <Text style={{
              fontSize: 10,
              marginLeft: 12,
              color: colors.danger,
              marginTop: -6,
            }}>Vos emails ne correspondent pas !</Text> }
            <Input
              rounded={50}
              borderWidth={0}
              bg={colors.desable}
              keyboardType="numeric"
              style={{ fontSize: 14 }}
              maxLength={9}
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="phone" />}
                  size={5}
                  ml="3"
                  color={colors.primary}
                />
              }
              placeholder="Téléphone"
              onChangeText={(value) => handleInputChange("phone", value)}
              value={formFields.phone}
            />
            <View>
              <Pressable onPress={showDatepicker}>
                <HStack style={styles.datePick} rounded={50} space={3}>
                  <Box style={styles.boxDatePick}>
                    <Icon
                      as={<MaterialCommunityIcons name="calendar-edit" />}
                      size={5}
                      ml="3"
                      color={colors.primary}
                    />
                  </Box>
                  <Text style={{ color: textDate ? "gray" : colors.black }}>
                    {textDate ? "Date de naissance" : formattedDate}
                  </Text>
                </HStack>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={moment(date, "DD/MM/YYYY").toDate()}
                  mode="date"
                  display="default"
                  collapsable
                  accentColor={colors.primary}
                  placeholderText="gggfgfgfgf"
                  onChange={handleDateChange}
                  style={{ backgroundColor: colors.primary }}
                />
              )}
              <HStack
                style={{
                  alignItems: "center",
                  marginTop: 15,
                  marginBottom: 0,
                  marginLeft: 3,
                }}
              >
                <Box style={{ opacity: isCkeck ? 1 : 0.4 }}>
                  <Checkbox
                    status={isCkeck ? "checked" : "unchecked"}
                    onPress={handleCheck}
                    color={colors.primary}
                  />
                </Box>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 12,
                    color: colors.text_grey_hint,
                    fontStyle: "normal",
                    marginLeft: 3,
                  }}
                >
                  Vous acceptez nos{" "}
                  <Text
                    style={{
                      color: colors.yellow,
                      textDecorationLine: "underline",
                    }}
                  >
                    conditions génrales d'utilisation ?
                  </Text>
                </Text>
              </HStack>
              {isFieldsEmpty && (
                <Text
                  style={{
                    fontSize: 10,
                    marginLeft: 12,
                    color: colors.danger,
                    marginTop: 4,
                  }}
                >
                  Tous les champs sont obligatoires !
                </Text>
              )}
              <Center mb={5} mt={8}>
                <PrimaryButton
                  title="Créez votre compte"
                  isLoadingText="Création en cours..."
                  isLoading={loader}
                  style={styles.submitBtnText}
                  color={isFieldsEmpty ? colors.text_grey_hint : colors.primary}
                  disabled={isFieldsEmpty}
                  onPress={onSubmit}
                />
              </Center>
              <Center>
                <VStack>
                  <Text style={{ marginBottom: 10, color: "#858585" }}>
                    Vous avez déjà un compte ?{" "}
                    <Text
                      style={{ color: colors.yellow }}
                      onPress={() => navigation.goBack()}
                    >
                      {" "}
                      Connectez-vous!
                    </Text>
                  </Text>
                </VStack>
              </Center>
            </View>
            {/*<SocialMedia />*/}
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default Signup;
