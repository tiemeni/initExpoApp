import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Pressable, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  HStack,
  Icon,
  Input,
  VStack,
  Center,
  Image,
  ScrollView,
  Checkbox,
  Box
} from "native-base";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import logo from "../../../assets/img/hospi-rdv__9_-removebg-preview.png";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import colors from "../../../constants/colours";
import styles from "./styles";
import moment from "moment";
import * as SCREENS from "../../../constants/screens";
import { useDispatch, connect } from "react-redux";
import { userRegistration } from "../../../redux/User/action"

const Signup = ({ navigation, userInfos, success, error }) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(moment().format("DD/MM/YYYY"));
  const [isCkeck, setIsCheck] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    emailConfirm: "",
    phone: "",
    birthday: "",
    surname: "",
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
      setFormData({
        ...formData,
        birthday: formattedDate,
      });
    },
    [date, formData]
  );

  const showDatepicker = useCallback(() => {
    setShowDatePicker(true);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
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

  const email1 = isValidEmail(formData.email)
  const email2 = isValidEmail(formData.emailConfirm)

  const checkEmptyField = () => {
    return formData.firstName === "" ||
      formData.email === "" ||
      formData.emailConfirm === "" ||
      formData.phone === "" ||
      formData.birthday === "" ||
      isCkeck === false;
  }

  const isFieldsEmpty = checkEmptyField()


  const onSubmit = () => {
    if (!isFieldsEmpty) {
      console.log("Mes données de création compte", formData);
      dispatch(userRegistration(formData))
    }
  };

  const handleCheck = () => {
    setIsCheck(!isCkeck);
  };

  return (
    <ScrollView flex={1} backgroundColor={"white"} paddingX={5}>
      <View style={styles.logoBox}>
        <Image style={styles.image} source={logo} alt="logo" />
        <Text style={styles.intitule}>
          S’il vous plaît, entrez votre email et créez un mot de passe
        </Text>
      </View>
      <VStack space={5} mt={5} style={styles.contentForm}>
        <VStack space={4}>
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
                ml="3"
                color={colors.primary}
              />
            }
            placeholder="Nom"
            onChangeText={(value) => handleInputChange("firstName", value)}
            value={formData.firstName}
          />
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
                ml="3"
                color={colors.primary}
              />
            }
            placeholder="Prénom"
            onChangeText={(value) => handleInputChange("surname", value)}
            value={formData.surname}
          />
          <Input
            h={50}
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
            value={formData.email}
          />

          {!email1 && formData.email !== "" &&
            <Text style={{
              fontSize: 10,
              marginLeft: 12,
              color: colors.danger,
            }}>Veillez saisir l'email valide svp !</Text>}

          <Input
            h={50}
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
            value={formData.emailConfirm}
          />

          {formData.email !== formData.emailConfirm && formData.emailConfirm !== "" &&
            <Text style={{
              fontSize: 10,
              marginLeft: 12,
              color: colors.danger,
              marginTop: -6,
            }}>Vos emails ne correspondent pas !</Text>}

          <Input
            h={50}
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
            value={formData.phone}
          />

          <VStack>
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
          </VStack>

          <HStack alignItems={"center"} space={2} mt={2}>
            <Checkbox
              borderColor={"gray.300"}
              borderWidth={2}
              aria-label="cgu"
              onPress={handleCheck}
              color={colors.primary}
            />
            <HStack>
              <Text style={styles.cgu}>
                J'accepte les
              </Text>
              <Pressable onPress={() => console.log("open cgu")}>
                <Text style={styles.cguText}>
                  Conditions génétales d'utilisations
                </Text>
              </Pressable>
            </HStack>
          </HStack>
        </VStack>

        <Center w={"100%"} mt={5}>
          <PrimaryButton
            title="Créez votre compte"
            isLoadingText="Création en cours..."
            isLoading={loader}
            style={styles.submitBtnText}
            color={colors.primary}
            disabled={isFieldsEmpty}
            onPress={onSubmit}
          />
        </Center>
        <Center mb={5}>
          <HStack mt={2}>
            <Text style={styles.labelText}>
              Vous avez déjà un compte?
            </Text>
            <Text
              style={[styles.forgetPassword, styles.registerText]}
              onPress={() => navigation.navigate(SCREENS.LOGIN)}
            >
              Connectez-vous !
            </Text>
          </HStack>
        </Center>
      </VStack>
    </ScrollView>
  );
};

const mapStateToProps = ({ UserReducer }) => ({
  userInfos: UserReducer.userInfos,
  success: UserReducer.success,
  error: UserReducer.error
})

export default connect(mapStateToProps)(Signup);
