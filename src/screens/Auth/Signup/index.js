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
} from "native-base";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import Logo from "../../../assets/img/hospi-rdv__9_-removebg-preview.png";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import colors from "../../../constants/colours";
import styles from "./styles";
import moment from "moment";
import MaskInput from "react-native-mask-input";
import { Checkbox } from "react-native-paper";


const Signup = ({ navigation }) => {
  const toast = useToast();
  const [date, setDate] = useState(moment().format("DD/MM/YYYY"));
  const [isCkeck, setIsCheck] = useState(false);


  const [formFields, setFormFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    emailConfirm: "",
    phone: "",
    birdday: date,
  });
  const [errors, setErrors] = useState({});
  const [textDate, setTextDate] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");

  const handleChangeText = (formatted, extracted) => {
    setPhoneNumber(formatted);
  };

  const handleDateChange = useCallback(
    (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShowDatePicker(Platform.OS === "ios");
      setDate(currentDate);
    },
    [date]
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

  const isFieldsEmpty =
    formFields.firstName.trim() === "" ||
    formFields.lastName === "" ||
    formFields.email === "" ||
    formFields.emailConfirm === "" ||
    formFields.phone === "" ||
    formFields.birdday === ""||
    isCkeck ===false
  const onSubmit = () => {
    if (!isFieldsEmpty) {
      //dispatch(register(formData));
      console.log("clik me");
    } else {
      console.log("Validation Failed ", errors);
    }
  };

  const handleCheck = () => {
    setIsCheck(!isCkeck);
  };

  return (
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
          <HStack justifyContent={"space-between"} width={"100%"}>
            <Box w={"55%"}>
              <Input
                rounded={15}
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
                placeholder="Nom"
                onChangeText={(value) => handleInputChange("firstName", value)}
                value={formFields.firstName}
              />
            </Box>
            <Box width={"40%"}>
              <Input
                rounded={15}
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
                placeholder="Prénom"
                onChangeText={(value) => handleInputChange("lastName", value)}
                value={formFields.lastName}
              />
            </Box>
          </HStack>
          <Input
            rounded={15}
            borderWidth={0}
            bg={colors.desable}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="email" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="adresse mail"
            onChangeText={(value) => handleInputChange("email", value)}
            value={formFields.email}
          />
          <Input
            rounded={15}
            borderWidth={0}
            bg={colors.desable}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="email" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Confirmer votre adresse mail"
            onChangeText={(value) => handleInputChange("emailConfirm", value)}
            value={formFields.emailConfirm}
          />
          <Input
            rounded={15}
            borderWidth={0}
            bg={colors.desable}
            keyboardType="numeric"
            maxLength={9}
            InputLeftElement={
              <Icon
                as={<MaterialIcons name="phone" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            placeholder="Téléphone"
            onChangeText={(value) => handleInputChange("phone", value)}
            value={formFields.phone}
          />
          <View>
            <Pressable onPress={showDatepicker}>
              <HStack style={styles.datePick} rounded={15} space={3}>
                <Box style={styles.boxDatePick}>
                  <Icon
                    as={<MaterialCommunityIcons name="calendar-edit" />}
                    size={5}
                    ml="2"
                    color="muted.400"
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
                onChange={handleDateChange}
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
              <Checkbox
                status={isCkeck ? "checked" : "unchecked"}
                onPress={handleCheck}
                color={colors.primary}
              />
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 14,
                  color: colors.primary,
                  fontStyle: "normal",
                  marginLeft: 3,
                }}
              >
                Vous acceptez nos CGU
              </Text>
            </HStack>

            <Center mb={3} mt={5}>
              <PrimaryButton
                title="Créer votre compte"
                isLoadingText="En Cours..."
                isLoading={false}
                style={styles.submitBtnText}
                color={isFieldsEmpty ? colors.desable : colors.primary}
                disabled={isFieldsEmpty}
                onPress={onSubmit}
              />
            </Center>
            <Center>
              <VStack>
                <Text style={{ marginBottom: 10, color: "#858585" }}>
                  Vous avez déjà un compte ?{" "}
                  <Text
                    style={{ color: colors.primary}}
                    onPress={() => navigation.goBack()}
                  >
                    {" "}
                    Connectez-vous!
                  </Text>
                </Text>
              </VStack>
            </Center>
          </View>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Signup;
