import {
  Avatar,
  ScrollView,
  View,
  VStack,
  Icon,
  Button,
  Spinner,
  useToast,
  HStack,
  Box,
} from "native-base";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  Text,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RadioButton } from "react-native-paper";
import Header from "../../components/Header";
import colors from "../../constants/colours";
import DateTimePicker from "@react-native-community/datetimepicker";
import plus from "../../assets/img/edit.png";
import tick from "../../assets/img/tick.png";
import { LOGIN } from "../../constants/screens";
import { connect, useDispatch } from "react-redux";
import { isValidEmail } from "../../utils/helper";
import moment from "moment";
import { userInfoUpdate, userSetProfile } from "../../redux/User/action";
import { styles } from "./styles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

const FAB = (props) => {
  return (
    <Pressable
      style={{
        ...styles.container,
        width: props.onBoarding ? "95%" : 60,
        right: props.onBoarding ? "2.5%" : 30,
        bottom: props.onBoarding ? 15 : 30,
        borderRadius: props.onBoarding ? 10 : 50,
        backgroundColor: props.onBoarding ? "white" : colors.primary,
        height: 60,
      }}
    >
      <TouchableOpacity onPress={props.onPress}>
        {!props.onBoarding ? (
          <>
            {props.editeMode && props.loading ? (
              <Spinner accessibilityLabel="loading" size="sm" color={"white"} />
            ) : (
              <Image
                style={{ ...styles.title }}
                source={props.editeMode ? plus : tick}
              />
            )}
          </>
        ) : (
          <TouchableOpacity
            onPress={() => props.navigation.navigate(LOGIN)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ color: colors.primary, fontSize: 20 }}>
              Commencez
            </Text>
            <Icon
              mt={0.5}
              marginLeft={5}
              size={5}
              color={colors.primary}
              as={<AntDesign name="arrowright" />}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Pressable>
  );
};

export const CustomeFab = (props) => {
  return (
    <FAB
      title="hey"
      navigation={props.navigation}
      onPress={props.action}
      onBoarding={props.onBoarding}
      editeMode={props.editeMode}
      loading={props.loading}
    />
  );
};

const MonProfile2 = ({ userInfos, loading, ImageLoading }) => {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const [gender, setGender] = useState(1);
  const [editeMode, setEditeMode] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    surname: user?.surname,
    telephone: user?.telephone,
    birthdate: moment(user?.birthdate).format("YYYY-MM-DD"),
  });

  const [errors, setErrors] = useState({
    email: isValidEmail(formData.email),
  });

  const handleInputChange = (field, value) => {
    let newErrors = { ...errors };
    if (field === "email") {
      newErrors.email = isValidEmail(value);
    }

    setErrors(newErrors);
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleGenderChange = (newGender) => {
    setGender(newGender);
  };
  const dispatch = useDispatch();

  const hasFormDataChanged = () => {
    return (
      formData.name !== user?.name ||
      formData.email !== user?.email ||
      formData.surname !== user?.surname ||
      formData.telephone !== user?.telephone ||
      formData.birthdate !== moment(user?.birthdate).format("YYYY-MM-DD")
    );
  };

  const UpdateInfo = () => {
    if (!editeMode && hasFormDataChanged()) {
      dispatch(userInfoUpdate(formData, user._id));
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const hideDatePickerModal = () => {
    setShowDatePicker(false);
  };

  const handleDateChange = (event, selectedDate) => {
    hideDatePickerModal();
    if (selectedDate) {
      handleInputChange("birthdate", moment(selectedDate).format("YYYY-MM-DD"));
    }
  };

  useEffect(() => {
    if (userInfos?.user) {
      setUser(userInfos.user);
      setFormData({
        name: userInfos.user.name,
        surname: userInfos.user.surname,
        email: userInfos.user.email,
        telephone: userInfos.user.telephone,
        birthdate: moment(userInfos.user.birthdate).format("YYYY-MM-DD"),
      });
    }
  }, [userInfos]);


  const selectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      console.log('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(userSetProfile(result.assets[0], user._id));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View flex={1} style={{ backgroundColor: "white" }}>
        <View height={50}>
          <Header title={"Vos informations"} />
        </View>
        <ScrollView>
          <VStack>
            <TouchableOpacity onPress={selectImage}>
              <HStack style={styles.viewStyle}>
                <Avatar
                  bg={colors.primary}
                  width={92}
                  height={92}
                  source={{
                    uri: user?.photo ?? null
                  }}
                ></Avatar>
                <Box style={styles.iconCam}>
                  {ImageLoading ? (
                    <Spinner accessibilityLabel="loading" size="sm" color={colors.primary} />
                  ) :
                    (<Icon
                      size={3}
                      color={colors.primary}
                      as={<Ionicons name="ios-camera" />}
                    />)
                  }
                </Box>
              </HStack>
            </TouchableOpacity>

            <View height={25} alignItems={"center"} mb={5}>
              <View style={styles.viewStyle2}>
                <Text
                  style={{
                    lineHeight: 19.36,
                    fontSize: 17,
                    fontWeight: "bold",
                  }}
                >
                  Détails de base
                </Text>
              </View>
            </View>
            <View style={styles.box1}>
              <View width={"85%"} mb={5}>
                <Text style={styles.textLabel}>Nom</Text>
                <TextInput
                  isInvalid={true}
                  placeholderTextColor={colors.text_grey_hint}
                  style={{
                    ...styles.textInput,
                    color: !editeMode ? colors.text_grey_hint : colors.black,
                  }}
                  placeholder="Modifier votre nom"
                  underlineColor="transparent"
                  keyboardType="default"
                  selectionColor={colors.primary}
                  selectTextOnFocus={true}
                  activeUnderlineColor="transparent"
                  onChangeText={(value) => handleInputChange("name", value)}
                  value={formData.name}
                  editable={!editeMode}
                />
              </View>
              <View width={"85%"} mb={5}>
                <Text style={styles.textLabel}>Prénom</Text>
                <TextInput
                  isInvalid={true}
                  placeholderTextColor={colors.text_grey_hint}
                  style={{
                    ...styles.textInput,
                    color: !editeMode ? colors.text_grey_hint : colors.black,
                  }}
                  placeholder="Modifier votre prénom"
                  underlineColor="transparent"
                  keyboardType="default"
                  selectionColor={colors.primary}
                  activeUnderlineColor="transparent"
                  onChangeText={(value) => handleInputChange("surname", value)}
                  value={formData.surname}
                  editable={!editeMode}
                />
              </View>
              <View width={"85%"} mb={4}>
                <Text
                  style={{ marginBottom: 5, fontSize: 14, color: "#626262" }}
                >
                  Date de naissance
                </Text>
                {editeMode ? (
                  <TextInput
                    isInvalid={true}
                    placeholderTextColor={colors.text_grey_hint}
                    style={{
                      ...styles.textInput,
                      color: !editeMode ? colors.text_grey_hint : colors.black,
                    }}
                    placeholder="17 Decembre 2004"
                    underlineColor="transparent"
                    keyboardType="default"
                    selectionColor={colors.primary}
                    activeUnderlineColor="transparent"
                    onChangeText={(value) =>
                      handleInputChange("birthdate", value)
                    }
                    value={formData.birthdate}
                    editable={!editeMode}
                  />
                ) : (
                  <TouchableOpacity onPress={showDatePickerModal}>
                    <Text
                      style={{
                        ...styles.textInput,
                        color: !editeMode
                          ? colors.text_grey_hint
                          : colors.black,
                      }}
                    >
                      {moment(formData.birthdate).format("YYYY-MM-DD")}
                    </Text>
                  </TouchableOpacity>
                )}

                {showDatePicker && (
                  <DateTimePicker
                    value={moment(formData.birthdate).toDate()} // Convertir en objet Date
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </View>

              <View
                width={"95%"}
                mt={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <View style={{ width: "90%" }}>
                  <Text style={{ marginBottom: 2, color: "#626262" }}>
                    Sexe
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    <View style={styles.boxRadio}>
                      <RadioButton.Android
                        style={{ height: 100 }}
                        uncheckedColor={"#F0F0F0"}
                        color={colors.primary}
                        value="first"
                        status={gender === 1 ? "checked" : "unchecked"}
                        onPress={() => handleGenderChange(1)}
                        disabled={editeMode}
                      />
                      <Text style={{ fontSize: 15, color: "#343434" }}>
                        Homme
                      </Text>
                    </View>
                    <View style={styles.boxRadio}>
                      <RadioButton.Android
                        style={{ height: 100 }}
                        uncheckedColor={"#F0F0F0"}
                        color={colors.primary}
                        value="first"
                        status={gender === 0 ? "checked" : "unchecked"}
                        onPress={() => handleGenderChange(0)}
                        disabled={editeMode}
                      />
                      <Text style={{ fontSize: 15, color: "#343434" }}>
                        Femme
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View height={25} alignItems={"center"} mt={11} mb={5}>
              <View style={styles.boxCoord}>
                <Text style={styles.textCoord}>Coordonnées</Text>
              </View>
            </View>
            <View mb={5}>
              <View style={styles.viewStyle3}>
                <View width={"85%"} mb={5}>
                  <Text
                    style={{ marginBottom: 5, fontSize: 14, color: "#626262" }}
                  >
                    Adresse mail
                  </Text>
                  <TextInput
                    isInvalid={true}
                    placeholderTextColor={"#343434"}
                    style={{
                      ...styles.textInput,
                      color: !editeMode ? colors.text_grey_hint : colors.black,
                    }}
                    placeholder="tiemanirocket@gmail.com"
                    underlineColor="transparent"
                    keyboardType="default"
                    selectionColor={colors.primary}
                    activeUnderlineColor="transparent"
                    onChangeText={(value) => handleInputChange("email", value)}
                    value={formData.email}
                    editable={!editeMode}
                  />
                </View>
                <View width={"85%"}>
                  <Text
                    style={{ marginBottom: 5, fontSize: 14, color: "#626262" }}
                  >
                    Numero de telephone
                  </Text>
                  <TextInput
                    isInvalid={true}
                    placeholderTextColor={"#343434"}
                    style={{
                      ...styles.textInput,
                      color: !editeMode ? colors.text_grey_hint : colors.black,
                    }}
                    placeholder="+237658686162"
                    underlineColor="transparent"
                    keyboardType="default"
                    selectionColor={colors.primary}
                    activeUnderlineColor="transparent"
                    onChangeText={(value) =>
                      handleInputChange("telephone", value)
                    }
                    value={formData.telephone}
                    editable={!editeMode}
                  />
                </View>
              </View>
            </View>
          </VStack>
        </ScrollView>
        <CustomeFab
          editeMode={editeMode}
          action={() => {
            setEditeMode(!editeMode);
            UpdateInfo();
          }}
          loading={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = ({ UserReducer }) => ({
  userInfos: UserReducer.userInfos,
  loading: UserReducer.loading,
  ImageLoading: UserReducer.ImageLoading
});

export default connect(mapStateToProps)(MonProfile2);
