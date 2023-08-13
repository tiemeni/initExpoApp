import {
  Avatar,
  ScrollView,
  View,
  VStack,
  Icon,
  Button,
  Spinner,
} from "native-base";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RadioButton } from "react-native-paper";
import Header from "../../components/Header";
import colors from "../../constants/colours";
import plus from "../../assets/img/edit.png";
import tick from "../../assets/img/tick.png";
import { AntDesign } from "@expo/vector-icons";
import { LOGIN } from "../../constants/screens";
import { connect, useDispatch } from "react-redux";
import { isValidEmail } from "../../utils/helper";
import moment from "moment";
import { userInfoUpdate } from "../../redux/User/action";

const IS_ANDROID = Platform.OS === "android";

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 60,
    height: 60,
  },
  title: {
    width: 20,
    height: 20,
  },
});

const FAB = (props) => {
  return (
    <Pressable
      style={{
        ...style.container,
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
              <Spinner accessibilityLabel="loading" size="sm" color={'white'} />
            ) : (
              <Image
                style={{ ...style.title }}
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

const MonProfile2 = ({ userInfos, loading }) => {
  const [user, setUser] = useState(null);
  const [gender, setGender] = useState("male");
  const [editeMode, setEditeMode] = useState(true);
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
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

  const UpdateInfo = () => {
    if (!editeMode) {
      //Vérifier si des informations ont changés sur le formData
      dispatch(userInfoUpdate(formData, user._id));
    }
  };

  useEffect(() => {
    if (userInfos?.user) {
      setUser(userInfos.user);
      setFormData({
        name: userInfos.user.name,
        email: userInfos.user.email,
        telephone: userInfos.user.telephone,
        birthdate: moment(userInfos.user.birthdate).format("YYYY-MM-DD"),
      });
    }
  }, [userInfos]);

  return (
    <View flex={1} style={{ backgroundColor: "white" }}>
      <View height={50}>
        <Header title={"Vos informations"} />
      </View>
      <ScrollView>
        <VStack>
          <View
            height={120}
            borderColor={"blue"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Avatar
              bg={colors.bg_grey}
              width={92}
              height={92}
              source={{
                uri: null,
              }}
            ></Avatar>
          </View>
          <View height={25} alignItems={"center"} mb={5}>
            <View
              style={{
                backgroundColor: "rgba(240, 240, 240, 0.69)",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                height: "100%",
                width: "90%",
                borderRadius: 10,
                paddingLeft: 10,
              }}
            >
              <Text
                style={{
                  lineHeight: 19.36,
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                Détail de base
              </Text>
            </View>
          </View>
          <View
            width={"100%"}
            marginBottom={5}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <View width={"85%"} mb={5}>
              <Text style={{ marginBottom: 5, fontSize: 14, color: "#626262" }}>
                Nom(s) et prenom(s)
              </Text>
              <TextInput
                isInvalid={true}
                placeholderTextColor={"#343434"}
                style={{
                  borderRadius: 5,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "#F0F0F0",
                  padding: 10,
                  height: 45,
                  fontSize: 15,
                }}
                placeholder="Tiemani hapi christian"
                underlineColor="transparent"
                keyboardType="default"
                selectionColor={colors.primary}
                activeUnderlineColor="transparent"
                onChangeText={(value) => handleInputChange("name", value)}
                value={formData.name}
                editable={!editeMode}
              />
            </View>
            <View width={"85%"} mb={4}>
              <Text style={{ marginBottom: 5, fontSize: 14, color: "#626262" }}>
                Date de naissance
              </Text>
              <TextInput
                isInvalid={true}
                placeholderTextColor={"#343434"}
                style={{
                  borderRadius: 5,
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "#F0F0F0",
                  padding: 10,
                  height: 45,
                  fontSize: 15,
                }}
                placeholder="17 Decembre 2004"
                underlineColor="transparent"
                keyboardType="default"
                selectionColor={colors.primary}
                activeUnderlineColor="transparent"
                onChangeText={(value) => handleInputChange("birthdate", value)}
                value={formData.birthdate}
                editable={!editeMode}
              />
            </View>
            <View
              width={"95%"}
              mt={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <View style={{ width: "90%" }}>
                <Text style={{ marginBottom: 2, color: "#626262" }}>Sexe</Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 1,
                      width: "40%",
                      height: 45,
                      padding: 5,
                      borderRadius: 10,
                      borderColor: "#F0F0F0",
                    }}
                  >
                    <RadioButton.Android
                      style={{ height: 100 }}
                      uncheckedColor={"#F0F0F0"}
                      color={colors.primary}
                      value="first"
                      status={gender === "male" ? "checked" : "unchecked"}
                      onPress={() => handleGenderChange("male")}
                      disabled={editeMode}
                    />
                    <Text style={{ fontSize: 15, color: "#343434" }}>
                      Homme
                    </Text>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      borderWidth: 1,
                      width: "40%",
                      height: 45,
                      padding: 5,
                      borderRadius: 10,
                      borderColor: "#F0F0F0",
                    }}
                  >
                    <RadioButton.Android
                      style={{ height: 100 }}
                      uncheckedColor={"#F0F0F0"}
                      color={colors.primary}
                      value="first"
                      status={gender === "female" ? "checked" : "unchecked"}
                      onPress={() => handleGenderChange("female")}
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
            <View
              style={{
                backgroundColor: "rgba(240, 240, 240, 0.69)",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "90%",
                height: "100%",
                borderRadius: 10,
                paddingLeft: 10,
              }}
            >
              <Text
                style={{
                  lineHeight: 19.36,
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                Coordonnées
              </Text>
            </View>
          </View>
          <View mb={5}>
            <View
              width={"100%"}
              marginBottom={11}
              justifyContent={"center"}
              alignItems={"center"}
            >
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
                    borderRadius: 5,
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "#F0F0F0",
                    padding: 10,
                    height: 45,
                    fontSize: 15,
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
                    borderRadius: 5,
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "#F0F0F0",
                    padding: 10,
                    height: 45,
                    fontSize: 15,
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
  );
};

const mapStateToProps = ({ UserReducer }) => ({
  userInfos: UserReducer.userInfos,
  loading: UserReducer.loading,
});

export default connect(mapStateToProps)(MonProfile2);
