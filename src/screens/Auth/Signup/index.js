import React, { useState, useEffect, useCallback } from "react";
import { View, Pressable, Platform, Alert } from "react-native";
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
  Text,
  Box,
  useToast,
  InfoIcon,
} from "native-base";
import { Foundation } from "@expo/vector-icons";
import logo from "../../../assets/img/hospi-rdv__9_-removebg-preview.png";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import colors from "../../../constants/colours";
import styles from "./styles";
import moment from "moment";
import * as SCREENS from "../../../constants/screens";
import { useDispatch, connect } from "react-redux";
import { userRegistration, reinitialize } from "../../../redux/User/action";
import { isValidEmail } from "../../../utils/helper";
import CustomToast from "../../../components/CustomToast";
import {
  Calendar,
  Call,
  Eye,
  EyeSlash,
  Lock,
  MessageText1,
  User,
  Warning2,
} from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import MaskInput from "react-native-mask-input";
const Signup = ({ navigation, error, loading, errorMsg, success }) => {
  const navigateCgu = useNavigation();
  const toast = useToast();
  const dispatch = useDispatch();
  const [date, setDate] = useState(moment().format("DD/MM/YYYY"));
  const [isCkeck, setIsCheck] = useState(false);
  const [show, setShow] = useState(false);

  let messages = [];

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    telephone: "",
    birthdate: "",
  });

  console.log("mes données", formData);
  const [errors, setErrors] = useState({
    email: isValidEmail(formData.email),
    password: null,
    birth: moment().format("DD/MM/YYYY"),
  });

  const [textDate, setTextDate] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = useCallback(
    (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowDatePicker(Platform.OS === "ios");
      setDate(currentDate);

      const formattedDate = moment(currentDate).format("YYYY-MM-DD");
      setFormData({
        ...formData,
        birthdate: formattedDate,
      });
    },
    [date, formData]
  );

  const showDatepicker = useCallback(() => {
    setShowDatePicker(true);
  }, []);

  const isPasswordWeak = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-="']/;

    if (!uppercaseRegex.test(password) && !password.match(/[a-z]/)) {
      messages.push("Une lettre majuscule ou minuscule est requise.");
    }

    if (password.length < 8) {
      messages.push("Longueur minimale de 8 caractères.");
    }

    if (!specialCharRegex.test(password)) {
      messages.push("Au moins un caractère spécial parmi @$!%*#?&.");
    }

    if (!digitRegex.test(password)) {
      messages.push("Le mot de passe doit contenir au moins un chiffre.");
    }

    return messages;
  };

  const isTrong = isPasswordWeak(formData.password);

  const handleInputChange = (field, value) => {
    let newErrors = { ...errors };
    if (field === "email") {
      newErrors.email = isValidEmail(value);
    } else if (field === "password") {
      newErrors.password = value.length < 8;
    }

    setErrors(newErrors);
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

  const checkEmptyField = () => {
    return (
      formData.name === "" ||
      formData.surname === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.telephone === "" ||
      formData.birthdate === "" ||
      isCkeck === false
    );
  };

  const isFieldsEmpty = checkEmptyField();

  useEffect(() => {
    if (error && errorMsg !== "") {
      toast.show({
        render: () => {
          return (
            <CustomToast
              message={errorMsg}
              color={colors.danger}
              bgColor={"red.100"}
              icon={<Foundation name="alert" size={24} />}
              iconColor={colors.danger}
            />
          );
        },
        placement: "top",
        duration: 5000,
      });
    }

    if (success) {
      Alert.alert("INSCRIPTION", "Votre compte été crée avec succès.", [
        {
          text: "Continuer",
          onPress: () => navigation.navigate(SCREENS.HOME_CONTAINER_ROUTE),
        },
      ]);
    }
  }, [error, success]);

  const onSubmit = () => {
    if (!isFieldsEmpty) {
      dispatch(userRegistration({ ...formData, active: true }));
    } else {
      toast.show({
        render: () => {
          return (
            <CustomToast
              message={"Veuillez remplir tous les champs"}
              color={colors.danger}
              bgColor={"red.100"}
              icon={<Foundation name="alert" size={24} />}
              iconColor={colors.danger}
            />
          );
        },
        placement: "top",
        duration: 5000,
      });
    }
  };

  const handleCheck = () => {
    setIsCheck(!isCkeck);
  };

  return (
    <ScrollView flex={1} backgroundColor={"white"} paddingX={3}>
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
              <VStack
                alignItems={"center"}
                justifyContent={"center"}
                style={styles.leftElement}
              >
                <Icon
                  as={<User name="person" />}
                  size={5}
                  color={colors.text_grey_hint}
                />
              </VStack>
            }
            placeholder="Nom"
            onChangeText={(value) => handleInputChange("name", value)}
            value={formData.name}
          />
          <Input
            h={50}
            rounded={50}
            borderWidth={0}
            fontSize={14}
            bg={colors.desable}
            InputLeftElement={
              <VStack
                alignItems={"center"}
                justifyContent={"center"}
                style={styles.leftElement}
              >
                <Icon
                  as={<User name="person" />}
                  size={5}
                  color={colors.text_grey_hint}
                />
              </VStack>
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
              <VStack
                alignItems={"center"}
                justifyContent={"center"}
                style={styles.leftElement}
              >
                <Icon
                  as={<MessageText1 name="person" />}
                  size={5}
                  color={colors.text_grey_hint}
                />
              </VStack>
            }
            placeholder="Adresse mail"
            onChangeText={(value) => handleInputChange("email", value)}
            value={formData.email}
          />

          {!errors.email && formData.email !== "" && (
            <Text
              style={{
                fontSize: 12,
                marginLeft: 10,
                color: colors.danger,
              }}
            >
              Veillez entrez une adresse mail valide
            </Text>
          )}

          <Input
            isInvalid={!isCkeck}
            h={50}
            rounded={50}
            borderWidth={0}
            style={{ fontSize: 14 }}
            bg={colors.desable}
            InputLeftElement={
              <VStack
                alignItems={"center"}
                justifyContent={"center"}
                style={styles.leftElement}
              >
                <Icon
                  as={<Lock name="person" />}
                  size={5}
                  color={colors.text_grey_hint}
                />
              </VStack>
            }
            InputRightElement={
              <Pressable onPress={() => setShow(!show)}>
                <Icon
                  as={show ? <Eye /> : <EyeSlash />}
                  size={5}
                  mr={4}
                  color={colors.primary}
                />
              </Pressable>
            }
            placeholder="Mot de passe"
            onChangeText={(value) => handleInputChange("password", value)}
            value={formData.password}
            type={show ? "text" : "password"}
          />
          {formData.password !== "" && (
            <VStack
              style={{
                backgroundColor: colors.transp_warning,
                borderRadius: 5,
                padding: 8,
              }}
            >
              <HStack space={1}>
                <Warning2 color={colors.danger} size={15} />
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.danger,
                  }}
                >
                  Le mot de passe ne rempli pas le(s) critère(s)
                </Text>
              </HStack>
              {messages?.map((message, index) => (
                <Text style={{ color: colors.black, fontSize: 12 }} key={index}>
                  {index + 1}. {message}
                </Text>
              ))}
            </VStack>
          )}

          <MaskInput
            style={{backgroundColor:colors.desable, height:50, borderRadius:50}}
            value={formData.telephone}
            onChangeText={(value) => handleInputChange("telephone", value)}
            mask={["6",' ', /\d/, /\d/, /\d/,/\d/,/\d/,/\d/,/\d/,/\d/]}
            placeholder="Téléphone"
            keyboardType="numeric"
            inlineImageLeft={logo}
          />

          <VStack>
            <Pressable onPress={showDatepicker}>
              <HStack style={styles.datePick} rounded={50} space={3}>
                <VStack
                  alignItems={"center"}
                  justifyContent={"center"}
                  style={styles.leftElement}
                >
                  <Icon as={<Calendar />} color={colors.text_grey_hint} />
                </VStack>
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
                maximumDate={new Date()}
                accentColor={colors.primary}
                onChange={handleDateChange}
                style={{ backgroundColor: colors.primary }}
              />
            )}
          </VStack>
          <HStack alignItems={"center"} space={2} mt={2}>
            <Checkbox
              isChecked={isCkeck}
              borderColor={"gray.300"}
              borderWidth={2}
              aria-label="cgu"
              onPress={handleCheck}
              color={colors.primary}
            />
            <HStack>
              <Text style={styles.cgu}>J'accepte les</Text>
              <Pressable
                onPress={() => {
                  navigateCgu.navigate(SCREENS.CGU);
                }}
              >
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
            isLoadingText="Veuillez patienter..."
            isLoading={loading}
            style={styles.submitBtnText}
            color={colors.primary}
            // disabled={isFieldsEmpty}
            onPress={onSubmit}
          />
        </Center>
        <Center mb={5}>
          <HStack mt={2}>
            <Text style={styles.labelText}>Vous avez déjà un compte?</Text>
            <Text
              style={[styles.forgetPassword, styles.registerText]}
              onPress={() => {
                dispatch(reinitialize());
                navigation.navigate(SCREENS.LOGIN);
              }}
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
  success: UserReducer.success,
  error: UserReducer.error,
  loading: UserReducer.loading,
  errorMsg: UserReducer.errorMsg,
});

export default connect(mapStateToProps)(Signup);
