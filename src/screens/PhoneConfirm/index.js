import React, { useEffect, useState } from "react";
import {
  Box,
  Icon,
  View,
  Text,
  HStack,
  Button,
  VStack,
  Input,
  Spinner,
} from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import { Pressable, SafeAreaView } from "react-native";
import { useToast } from "native-base";
import styles from "./style";
import colors from "../../constants/colours";
import { TouchableOpacity } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import { resettingPassword } from "../../redux/User/action";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { Warning2 } from "iconsax-react-native";
import { processVerifCode } from "../../redux/User/action";
import CustomToast from "../../components/CustomToast";
import { isEmailValid, isValidEmail } from "../../utils/helper";


const CELL_COUNT = 5;

const PhoneConfirm = ({
  navigation,
  codeVerifLoading,
  codeVerifSuccess,
  errorCodeVerif,
}) => {
  const [borderCol, setBorderCol] = useState(colors.danger);
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  let messages = [];
  const codeVerif = useSelector((state) => state.UserReducer.codeVerif);
  const settingPWLoading = useSelector(
    (state) => state.UserReducer.settingPWLoading
  );

  const dispatch = useDispatch();
  // const { email } = route?.params;
  const [newPw, setNewPw] = useState("");
  const [cnfPw, setCnfPw] = useState("");
  const [email1, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [caracters, setCaracters] = useState([]);
  const [canResetPw, setCanResetPw] = useState(false);
  let verificationCond = caracters == codeVerif?.codeVerif?.split("");
  caracters[1] == codeVerif?.codeVerif?.split("")[1] &&
    caracters[2] == codeVerif?.codeVerif?.split("")[2] &&
    caracters[3] == codeVerif?.codeVerif?.split("")[3] &&
    caracters[4] == codeVerif?.codeVerif?.split("")[4];
  const [isSendCode, setIsSendCode] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  const emailValide = isEmailValid(email1);

  const toast = useToast();
  useEffect(() => {
    if (codeVerifSuccess) {
      toast.show({
        render: () => {
          return (
            <CustomToast
              message={"Un code à été envoyer a votre mail"}
              color={colors.success}
              bgColor={"red.100"}
              icon={<Warning2 />}
              iconColor={colors.success}
            />
          );
        },
        placement: "top",
        duration: 3000,
      });
    }
  }, [codeVerifSuccess, errorCodeVerif]);

  const resetPassword = () => {
    dispatch(processVerifCode(email1));
  };

  const resetPassword1 = () => {
    if(emailValide){
     dispatch(processVerifCode(email1));
     setTimeout(() => {
      setIsSendCode(false);
    }, 3000);
    }else{
      setIsEmpty(true);
    } 
  };

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

  const isTrong = isPasswordWeak(newPw);

  const handleCheck = () => {
    if (value == codeVerif?.codeVerif) {
      setBorderCol(colors.success);
      setCanResetPw(true);
    }
  };

  const handleChangeMp = () => {
    dispatch(resettingPassword({ id: codeVerif?.id, password: newPw }));
  };

  useEffect(() => {
    setBorderCol(
      value == codeVerif?.codeVerif ? colors.success : colors.danger
    );
  }, [canResetPw, value, codeVerif]);

  return (
    <View alignItems={"center"} bg={colors.white} flex={1} p={5}>
      <VStack alignItems={"center"} mb={15}>
        <Box mb={10}>
          <Box style={styles.circle}>
            <Icon as={EvilIcons} name="lock" color={colors.white} size={90} />
          </Box>
        </Box>
        <Text
          mb={5}
          style={{
            paddingTop: 5,
            fontSize: 25,
            fontWeight: 700,
            height: 30,
          }}
        >
          Mot de passe oublié
        </Text>
      </VStack>

      {/*section 1 */}
      {isSendCode ? (
        <VStack
          justifyItems={"center"}
          justifyContent={"center"}
          alignItems={"center"}
          w={"100%"}
        >
          <Text mb={10} style={styles.message}>
            Veillez entre l'adresse mail lié à votre compte afin de recevoir le
            code de vérification
          </Text>
          <Input
            mx="3"
            value={email1}
            fontSize={15}
            placeholder="Entrez votre adresse mail"
            w="90%"
            borderRadius={25}
            paddingLeft={5}
            paddingRight={5}
            onChangeText={(e) => setEmail(e)}
            height={45}
            mb={3}
          />

          {isEmpty && !emailValide && email1 !== "" && (
            <HStack
              rounded={5}
              p={1}
              backgroundColor={colors.transp_warning}
              space={1}
              width={'85%'}
            >
              <Warning2 color={colors.warning} size={15} />
              <Text
                style={{
                  fontSize: 12,
                  color: colors.warning,
                }}
              >
                email invalide, Veillez saisir un email valide 
              </Text>
            </HStack>
          )}
          <Button
            mt={10}
            style={styles.btn}
            isLoading={settingPWLoading}
            onPress={() => {
              resetPassword1();
            }}
          >
            {codeVerifLoading ? (
              <Spinner accessibilityLabel="loading" size="sm" color={"white"} />
            ) : (
              <Text color={colors.white}>Envoyer</Text>
            )}
          </Button>
        </VStack>
      ) : (
        <Box alignItems={"center"} bg={colors.white} width={"100%"}>
          <VStack alignItems={"center"} mb={7}>
            {canResetPw ? (
              ""
            ) : (
              <Text style={styles.message}>
                nous avons envoyé le code de vérification à votre adresse mail, veillez le saisir ici 
              </Text>
            )}

            {!canResetPw && (
              <SafeAreaView style={styles.root}>
                <CodeField
                  ref={ref}
                  {...props}
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
                  rootStyle={styles.codeFiledRoot}
                  keyboardType="ascii-capable"
                  textContentType="oneTimeCode"
                  renderCell={({ index, symbol, isFocused }) => (
                    <Text
                      key={index}
                      style={[
                        { ...styles.cell, borderColor: value && borderCol },
                        isFocused && {
                          ...styles.focusCell,
                          borderColor: value && borderCol,
                        },
                        { marginRight: 10 },
                      ]}
                      onLayout={getCellOnLayoutHandler(index)}
                    >
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  )}
                />
              </SafeAreaView>
            )}
            {!canResetPw && (
              <HStack space={1}>
                <Text style={styles.phoneNumber}>{email1 ?? ""}</Text>
                <Pressable onPress={() => setIsSendCode(!isSendCode)}>
                  <Text style={{ ...styles.phoneNumber, color: colors.yellow }}>
                    /changer ?
                  </Text>
                </Pressable>
              </HStack>
            )}
            {canResetPw && (
              <VStack space={5}>
                <Input
                  mx="3"
                  value={newPw}
                  onChangeText={(t) => setNewPw(t)}
                  fontSize={15}
                  placeholder="Nouveau mot de passe"
                  w="90%"
                  borderRadius={25}
                  paddingLeft={5}
                  paddingRight={5}
                  height={45}
                />

                {newPw !== "" && messages.length > 0 && (
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
                      <Text
                        style={{ color: colors.black, fontSize: 12 }}
                        key={index}
                      >
                        {index + 1}. {message}
                      </Text>
                    ))}
                  </VStack>
                )}

                <Input
                  mx="3"
                  value={cnfPw}
                  onChangeText={(t) => setCnfPw(t)}
                  fontSize={15}
                  placeholder="Confirmer le nouveau mot de passe"
                  w="90%"
                  borderRadius={25}
                  paddingLeft={5}
                  paddingRight={5}
                  height={45}
                />

                {cnfPw !== "" && cnfPw !== newPw && (
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
                        Les mot de passe ne correspondent pas !
                      </Text>
                    </HStack>
                  </VStack>
                )}
              </VStack>
            )}
          </VStack>
          <Button
            mb={4}
            style={styles.btn}
            isLoading={settingPWLoading}
            onPress={() => {
              if (canResetPw && messages.length <= 0 && cnfPw === newPw) {
                handleChangeMp();
              } else {
                resetPassword();
              }
            }}
          >
            {canResetPw ? (
              <Text color={colors.white} style={styles.btnLabel}>
                Envoyer
              </Text>
            ) : codeVerifLoading ? (
              <Spinner accessibilityLabel="loading" size="sm" color={"white"} />
            ) : (
              <Text color={colors.white} style={styles.btnLabel}>
                Renvoyer le code
              </Text>
            )}
          </Button>
          {!canResetPw && (
            <Button
              borderWidth={2}
              isLoading={loading}
              style={styles.btn}
              variant={"outline"}
              onPress={() => handleCheck()}
            >
              <Text color={colors.primary} style={styles.btnLabel}>
                Soumettre
              </Text>
            </Button>
          )}
        </Box>
      )}

      <Button textDecorationLine={"underline"} mt={"20%"} variant={"unstyled"}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text color={colors.primary} style={styles.btnLabel}>
            Fermer
          </Text>
        </TouchableOpacity>
      </Button>
    </View>
  );
};

const mapStateToProps = ({ UserReducer }) => ({
  codeVerifLoading: UserReducer.codeVerifLoading,
  errorCodeVerif: UserReducer.errorCodeVerif,
  codeVerifSuccess: UserReducer.codeVerifSuccess,
});
export default connect(mapStateToProps)(PhoneConfirm);
