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
  Box,
  useToast
} from "native-base";
import { MaterialIcons, MaterialCommunityIcons, Foundation, Ionicons } from "@expo/vector-icons";
import logo from "../../../assets/img/hospi-rdv__9_-removebg-preview.png";
import PrimaryButton from "../../../components/Buttons/PrimaryButton";
import colors from "../../../constants/colours";
import styles from "./styles";
import moment from "moment";
import * as SCREENS from "../../../constants/screens";
import { useDispatch, connect } from "react-redux";
import { userRegistration, reinitialize } from "../../../redux/User/action"
import { isValidEmail } from "../../../utils/helper";

const Signup = ({ navigation, error, loading, errorMsg }) => {
  const toast = useToast()
  const dispatch = useDispatch();
  const [date, setDate] = useState(moment().format("DD/MM/YYYY"));
  const [isCkeck, setIsCheck] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    telephone: "",
    birthdate: "",
  });
  const [errors, setErrors] = useState({
    email: isValidEmail(formData.email),
    password: null
  })

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

  const checkEmptyField = () => {
    return formData.name === "" ||
      formData.surname === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.telephone === "" ||
      formData.birthdate === "" ||
      isCkeck === false;
  }

  const isFieldsEmpty = checkEmptyField()

  useEffect(() => {
    if (error && errorMsg !== '') {
      toast.show({
        render: () => {
          return (
            <Box
              bg="red.100"
              px={4}
              py={3}
              rounded="md"
              shadow={3}
              _text={{ color: 'white' }}
              w="100%"
            >
              <HStack space={2} flex={1} alignItems={'center'}>
                <Icon
                  as={<Foundation name="alert" size={24} color={colors.danger} />}
                  size={5}
                  color={colors.danger}
                />
                <Text>{errorMsg}</Text>
              </HStack>
            </Box>
          );
        },
        placement: "top",
        duration: 5000
      })
    }
  }, [error])

  const onSubmit = () => {
    if (!isFieldsEmpty) {
      dispatch(userRegistration({ ...formData, active: true }))
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
        <Center>
          <HStack alignItems={'center'} space={1}>
            <Icon as={<Ionicons name="alert-circle" size={24} />} size={5} color={colors.danger} />
            <Text style={{ color: colors.danger }}>Veuillez remplir tous les champs</Text>
          </HStack>
        </Center>
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
            placeholder="Adresse mail"
            onChangeText={(value) => handleInputChange("email", value)}
            value={formData.email}
          />

          {!errors.email && formData.email !== "" &&
            <Text style={{
              fontSize: 12,
              color: colors.danger,
            }}>Veillez entrez une adresse mail valide</Text>}

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
            placeholder="Mot de passe"
            onChangeText={(value) => handleInputChange("password", value)}
            value={formData.password}
            type="password"
          />

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
            onChangeText={(value) => handleInputChange("telephone", value)}
            value={formData.telephone}
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
              isChecked={isCkeck}
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
            isLoadingText="Veuillez patienter..."
            isLoading={loading}
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
              onPress={() => {
                dispatch(reinitialize())
                navigation.navigate(SCREENS.LOGIN)
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
  errorMsg: UserReducer.errorMsg
})

export default connect(mapStateToProps)(Signup);
