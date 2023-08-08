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
import { useTranslation } from "react-i18next";

const Signup = ({ navigation }) => {

  const toast = useToast();
  const [date, setDate] = useState(moment().format("DD/MM/YYYY"));
  const [isCkeck, setIsCheck] = useState(false);
  const translate = useTranslation().t

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
              placeholder={translate('TEXT.FULL_NAME')}
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
              placeholder={translate("TEXT.EMAIL2_FIELD")}
              onChangeText={(value) => handleInputChange("email", value)}
              value={formFields.email}
            />
            {!email1 && formFields.email !=="" &&
            <Text style={{
              fontSize: 10,
              marginLeft: 12,
              color: colors.danger,
            }}>{translate('TEXT_INVALID_EMAIL')}</Text>}
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
              placeholder={translate("TEXT.EMAIL_CONFIRM")}
              onChangeText={(value) => handleInputChange("emailConfirm", value)}
              value={formFields.emailConfirm}
            />
            {formFields.email !== formFields.emailConfirm && formFields.emailConfirm !== "" &&
            <Text style={{
              fontSize: 10,
              marginLeft: 12,
              color: colors.danger,
              marginTop: -6,
            }}>{translate("TEXT_INVALID2_EMAIL")}</Text> }
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
              placeholder={translate('TEXT.PHONE')}
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
                    {textDate ? translate('TEXT.NAISSANCE_FIELD') : formattedDate}
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
                  {translate('TEXT.ACCEP_CONDITION')}
                  <Text
                    style={{
                      color: colors.yellow,
                      textDecorationLine: "underline",
                    }}
                  >
                    {translate('TEXT.CONDITION_GENERALE')}
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
                  {translate("TEXT.ERROR_FIELDS")}
                </Text>
              )}
              <Center mb={5} mt={8}>
                <PrimaryButton
                  title={translate("TEXT.BUTTON_LOGIN_REGISTER")}
                  isLoadingText={translate("TEXT.BUTTON_REGISTER_LOADER")}
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
                    {translate("TEXT.HAVE_ACCOUNT")}
                    <Text
                      style={{ color: colors.yellow }}
                      onPress={() => navigation.goBack()}
                    >
                      {" "}
                      {translate("TEXT.CONNECT")}
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
