import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Input,
  ScrollView,
  Text,
  useToast,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import styles from "./style";
import visaUrl from "../../assets/img/visa.png";
import MtnLogo from "../../assets/img/mobile_money.jpg";
import OrangeLOgo from "../../assets/img/orange_money.jpg";
import colors from "../../constants/colours";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Header from "../../components/Header";
import MaskInput from "react-native-mask-input";
import ModalPaySuccess from "../../components/ModalPaymentSuccess";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import { RDV } from "../../constants/screens";
import { useDispatch, useSelector } from "react-redux";
import { postRDV } from "../../redux/RDV/actions";
import CustomToast from "../../components/CustomToast";
import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  Foundation,
} from "@expo/vector-icons";
import { setShouldSeeBehind } from "../../redux/commons/action";

const description =
  "Votre compte sera débité d’un montant de 5000 Fcfa. Le dit montant fait office de frais de rendez-vous et est non-remboursable.";
const creditCardMask = [
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  " ",
  [/\d/],
  [/\d/],
  [/\d/],
  [/\d/],
  " ",
  [/\d/],
  [/\d/],
  [/\d/],
  [/\d/],
  " ",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];
const expirationMask = [/\d/, /\d/, "/", /\d/, /\d/];

const telMask = [
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
  " ",
  /\d/,
  /\d/,
  /\d/,
];

const Payment = ({ route, navigation }) => {
  const ext = route.params.ext;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userInfo = useSelector((state) => state.UserReducer.userInfos);
  const idCentre = useSelector((state) => state.Common.idc);
  const toast = useToast();
  const dispatch = useDispatch();
  const success = useSelector((state) => state.RdvForm.successPostRdv);
  const extPRData = useSelector((state) => state.RdvForm.extPRData);
  const error = useSelector((state) => state.RdvForm.errorMsgPostRDV);
  const loadingPostRdv = useSelector((state) => state.RdvForm.loadingPostRdv);
  const formRDV = useSelector((state) => state.RdvForm.rdvForm);
  const clientID = useSelector((state) => state.UserReducer.clientID);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("visa");
  const [showLoaderInModal, setShowLoaderInModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: null,
    cardNumber: null,
    expirationDate: null,
    securityCode: null,
  });

  const [formDataMobile, setFormDataMobile] = useState({
    phone: "",
    amount: "",
  });

  const handlePaymentMethodPress = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleInputChange = (field, value) => {
    setFormDataMobile({
      ...formDataMobile,
      [field]: value,
    });
  };

  const onSubmitPayment = () => {
    let payload = { clientID };
    setIsLoading(true);
    payload = !ext ? { ...formRDV, ...userInfo } : { ...extPRData };
    dispatch(postRDV(payload));
  };

  React.useEffect(() => {
    dispatch(setShouldSeeBehind(false));
    if (error) {
      toast.show({
        render: () => {
          return (
            <CustomToast
              message={"Une erreur est survenue !"}
              color={colors.danger}
              bgColor={"red.100"}
              icon={<Foundation name="alert" size={24} />}
              iconColor={colors.danger}
            />
          );
        },
        placement: "top",
        duration: 2000,
      });
    }

    if (success) {
      toast.show({
        render: () => {
          return (
            <CustomToast
              message={"Rendez-vous crée avec succès !"}
              color={colors.success}
              bgColor={"green.100"}
              icon={<AntDesign name="checkcircle" size={24} />}
              iconColor={colors.success}
            />
          );
        },
        placement: "top",
        duration: 2000,
      });
    }
  }, [error, success]);

  const renderPaymentForm = () => {
    if (
      selectedPaymentMethod === "visa" ||
      selectedPaymentMethod === "mastercard"
    ) {
      return (
        <VStack style={styles.cardInfos}>
          <Box>
            <Text style={styles.inputLabel}>Nom sur la carte</Text>
            <Input
              variant={"unstyled"}
              value={formData.name}
              onChangeText={(v) => handleChange("name", v)}
              style={styles.input}
              size={"lg"}
              placeholder="Luc Skywalker"
            />
          </Box>
          <Box style={styles.inputBox}>
            <Text style={styles.inputLabel}>Numéro de carte</Text>
            <MaskInput
              value={formData.cardNumber}
              mask={creditCardMask}
              showObfuscatedValue
              obfuscationCharacter="#"
              onChangeText={(v) => handleChange("cardNumber", v)}
              style={{ ...styles.input, paddingLeft: 10 }}
              size={"lg"}
              placeholder="#### #### #### ####"
            />
          </Box>
          <HStack justifyContent={"space-between"}>
            <Box style={{ ...styles.inputBox, width: "48%" }}>
              <Text style={styles.inputLabel}>Date d'expiration</Text>
              <MaskInput
                value={formData.cardNumber}
                mask={expirationMask}
                showObfuscatedValue
                obfuscationCharacter="#"
                onChangeText={(v) => handleChange("expiration", v)}
                style={{ ...styles.input, paddingLeft: 10 }}
                size={"lg"}
                placeholder="MM/YY"
              />
            </Box>
            <Box style={{ ...styles.inputBox, width: "48%" }}>
              <Text style={styles.inputLabel}>Code de sécurité</Text>
              <Input
                variant={"unstyled"}
                onChangeText={(v) => handleChange("securityCode", v)}
                style={styles.input}
                size={"lg"}
                placeholder="CVC"
              />
            </Box>
          </HStack>
        </VStack>
      );
    } else if (
      selectedPaymentMethod === "orange_money" ||
      selectedPaymentMethod === "mtn_money"
    ) {
      return (
        <VStack style={styles.cardInfos}>
          <Box>
            <Text style={styles.inputLabel}>Numéro de téléphone</Text>
            <MaskInput
              value={formDataMobile.phone}
              mask={telMask}
              showObfuscatedValue
              obfuscationCharacter="#"
              onChangeText={(value) => handleInputChange("phone", value)}
              style={{ ...styles.input, paddingLeft: 10 }}
              size={"lg"}
              placeholder="658 559 995"
            />
          </Box>
          <Text style={styles.inputLabel}>Montant</Text>
          <Input
            value={formDataMobile.amount}
            mask={creditCardMask}
            showObfuscatedValue
            obfuscationCharacter="#"
            onChangeText={(value) => handleInputChange("amount", value)}
            style={{ paddingLeft: 10 }}
            size={"lg"}
            height={42}
            rounded={10}
            placeholder="5000"
          />
        </VStack>
      );
    } else {
      return;
    }
  };

  const handleChange = (trigger, value) => {
    switch (trigger) {
      case "name":
        setFormData({
          ...formData,
          name: value,
        });
        break;
      case "cardNumber":
        setFormData({
          ...formData,
          cardNumber: value,
        });
        break;
      case "expiration":
        setFormData({
          ...formData,
          expirationDate: value,
        });
        break;
      case "securityCode":
        setFormData({
          ...formData,
          securityCode: value,
        });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Header bg={"white"} title={"Terminez votre prise de rdv"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        flex={1}
        style={styles.container}
        automaticallyAdjustKeyboardInsets={true}
      >
        <VStack style={styles.infoBox}>
          <Text style={styles.boxTitle}>Important</Text>
          <Text style={styles.descText}>{description}</Text>
          <Text style={styles.warningText}>
            Vous recevrez un message de confirmation à la fin de l’opération.
          </Text>
        </VStack>
        <VStack style={styles.paymentBox}>
          <Box style={styles.titleBox}>
            <Text style={styles.paymentTitle}>
              Choisir une méthode de paiement
            </Text>
            <Text style={styles.titleHelper}>
              Vous serez débité dès la validation de cette étape.
            </Text>
          </Box>
          <Box style={styles.paymentMethodBox}>
            <Center>
              <HStack
                style={styles.scrollView}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                space={3}
              >
                <Box
                  style={{
                    ...styles.paymentMethodSelect,
                    backgroundColor:
                      selectedPaymentMethod === "visa"
                        ? colors.trans_primary
                        : colors.white,
                  }}
                >
                  <Pressable
                    style={styles.paymentMethod}
                    onPress={() => handlePaymentMethodPress("visa")}
                  >
                    <Image source={visaUrl} alt="visa" size={"xs"} />
                  </Pressable>
                </Box>
                <Box
                  style={{
                    ...styles.paymentMethodSelect,
                    backgroundColor:
                      selectedPaymentMethod === "orange_money"
                        ? colors.trans_primary
                        : colors.white,
                  }}
                >
                  <Pressable
                    style={styles.paymentMethod}
                    onPress={() => handlePaymentMethodPress("orange_money")}
                  >
                    <Image
                      source={OrangeLOgo}
                      alt="orange"
                      rounded={50}
                      width={45}
                      height={45}
                    />
                  </Pressable>
                </Box>
                <Box
                  style={{
                    ...styles.paymentMethodSelect,
                    backgroundColor:
                      selectedPaymentMethod === "mtn_money"
                        ? colors.trans_primary
                        : colors.white,
                  }}
                >
                  <Center>
                    <Pressable
                      style={styles.paymentMethod}
                      onPress={() => handlePaymentMethodPress("mtn_money")}
                    >
                      <Image
                        rounded={50}
                        source={MtnLogo}
                        alt="visa"
                        width={45}
                        height={45}
                      />
                    </Pressable>
                  </Center>
                </Box>
                <Box
                  style={{
                    ...styles.paymentMethodSelect,
                    backgroundColor:
                      selectedPaymentMethod === "mastercard"
                        ? colors.trans_primary
                        : colors.white,
                  }}
                >
                  <Pressable
                    style={styles.paymentMethod}
                    onPress={() => handlePaymentMethodPress("mastercard")}
                  >
                    <Image source={visaUrl} alt="mastercard" size={"xs"} />
                  </Pressable>
                </Box>
              </HStack>
            </Center>
          </Box>
          {renderPaymentForm()}
        </VStack>
        {renderPaymentForm() && (
          <VStack flex={1} style={styles.btnBox}>
            <PrimaryButton
              // disabled={!formData.name || !formData.cardNumber || !formData.expirationDate || !formData.securityCode}
              title={
                loadingPostRdv
                  ? "en cours de chargement..."
                  : "Confirmez et Continuez"
              }
              isLoadingText="en cours de chargement..."
              isLoading={loadingPostRdv}
              style={styles.submitBtnText}
              onPress={onSubmitPayment}
            />
          </VStack>
        )}
      </ScrollView>
    </>
  );
};

export default Payment;
