import {
  Box,
  Button,
  Checkbox,
  Divider,
  HStack,
  Icon,
  Image,
  Input,
  PresenceTransition,
  ScrollView,
  Text,
  VStack,
  useToast,
  Center,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import Logo from '../../../assets/img/hospi-rdv__9_-removebg-preview.png';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import colors from '../../../constants/colours';
import SCREENS from '../../../constants/screens';
import styles from './styles';
import DatePicker from 'react-native-date-picker';
import { connect, useDispatch } from 'react-redux';
import { TextInput } from 'react-native-paper';
import Cards from '../../../components/Cards';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Signup = ({ navigation }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [formData, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [textDate, setTextDate] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClick = () => setShow(!show);
  const [isAccept, setIsAccept] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (
      date.getFullYear() != new Date().getFullYear() ||
      date.getMonth() + 1 != new Date().getMonth() + 1 ||
      date.getDate() != new Date()?.getDate()
    )
      setTextDate(true);
    else setTextDate(false);
  }, [date]);

  const validate = () => {
    const isReq = "Tous ses champs sont obligatoire , veillez bien les remplir svp";
    const shot = "Cc'est champs sont obligation et veillez bien les remplir";
    setErrors({
      ...errors,
      nom:
        formData.nom === undefined ? isReq : formData?.nom.length < 5 && shot,
      telephone: formData.telephone === undefined && isReq,
      email:
        formData.email === undefined
          ? isReq
          : formData?.email.length < 5 && shot,
      confemail:
        formData.confemail === undefined
          ? isReq
          : formData?.email != formData?.confemail && "l'email est different",
      prenom:
        formData.prenom === undefined
          ? isReq
          : formData?.prenom.length < 5 && shot,
      telephone:
        formData.telephone === undefined
          ? isReq
          : formData?.telephone.length < 8 && shot,
    });
    if (
      formData.nom === undefined ||
      formData?.nom.length < 4 ||
      formData.telephone === undefined ||
      formData.email === undefined ||
      formData?.email.length < 5 ||
      formData.confemail === undefined ||
      formData?.email != formData?.confemail
    )
      return false;

    return true;
  };

  const onSubmit = () => {
    console.log('clik me');
    if (validate()) {
      //dispatch(register(formData));
    } else console.log('Validation Failed ', errors);
  };

  return (
    <ScrollView h={'100%'}>
      <Box style={styles.contenair}>
        <Image
          width={'100%'}
          height={180}
          source={Logo}
          resizeMode={'contain'}
          alt="logo"
        />
        <Text
          style={{
            color: colors.blackffColor,
            fontSize: 14,
            fontStyle: 'normal',
            marginBottom: 15,
            marginTop: -40,
            textAlign: 'center',
          }}>
          S'il vous plaît, entrez votre email et votre mot de passe
        </Text>
        <VStack alignItems={'center'}>
          <Box>
            <HStack justifyContent={'space-between'} width={'100%'}>
              <Box w={'49%'}>
                <TextInput
                  keyboardType="name-phone-pad"
                  style={styles.inputConex}
                  underlineColor="transparent"
                  left={
                    <TextInput.Icon
                      name={() => (
                        <Box
                          style={{
                            backgroundColor: colors.whiteColor,
                            width: 30,
                            borderRadius: 50,
                            height: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <MaterialIcons name={'person-outline'} size={21} />
                        </Box>
                      )}
                    />
                  }
                  selectionColor={colors.secondaryColor}
                  activeUnderlineColor="transparent"
                  placeholder="Nom"
                  onChangeText={value => setData({ ...formData, nom: value })}
                />
              </Box>
              <Box width={'49%'}>
                <TextInput
                  keyboardType="name-phone-pad"
                  style={styles.inputConex}
                  left={
                    <TextInput.Icon
                      name={() => (
                        <Box
                          style={{
                            backgroundColor: colors.whiteColor,
                            width: 30,
                            borderRadius: 50,
                            height: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <MaterialIcons name={'person-outline'} size={21} />
                        </Box>
                      )}
                    />
                  }
                  selectionColor={colors.secondaryColor}
                  activeUnderlineColor="transparent"
                  underlineColor="transparent"
                  placeholder="Prénom"
                  onChangeText={value => setData({ ...formData, prenom: value })}
                />
              </Box>
            </HStack>
            <Box>
              <TextInput
                keyboardType="email-address"
                style={styles.inputConex}
                underlineColor="transparent"
                left={
                  <TextInput.Icon
                    name={() => (
                      <Box
                        style={{
                          backgroundColor: colors.whiteColor,
                          width: 30,
                          borderRadius: 50,
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <MaterialCommunityIcons name={'email'} size={21} />
                      </Box>
                    )}
                  />
                }
                selectionColor={colors.secondaryColor}
                activeUnderlineColor="transparent"
                placeholder="adresse mail"
                onChangeText={value => setData({ ...formData, email: value })}
              />
              <TextInput
                keyboardType="email-address"
                style={styles.inputConex}
                underlineColor="transparent"
                left={
                  <TextInput.Icon
                    name={() => (
                      <Box
                        style={{
                          backgroundColor: colors.whiteColor,
                          width: 30,
                          borderRadius: 50,
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <MaterialCommunityIcons name={'email'} size={21} />
                      </Box>
                    )}
                  />
                }
                selectionColor={colors.secondaryColor}
                activeUnderlineColor="transparent"
                placeholder="Confirmation d'adresse mail"
                onChangeText={value => setData({ ...formData, confemail: value })}
              />
              <TextInput
                keyboardType="phone-pad"
                style={styles.inputConex}
                underlineColor="transparent"
                left={
                  <TextInput.Icon
                    name={() => (
                      <Box
                        style={{
                          backgroundColor: colors.whiteColor,
                          width: 30,
                          borderRadius: 50,
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <MaterialCommunityIcons name={'phone'} size={21} />
                      </Box>
                    )}
                  />
                }
                selectionColor={colors.secondaryColor}
                activeUnderlineColor="transparent"
                placeholder="Téléphone"
                onChangeText={value => setData({ ...formData, telephone: value })}
              />

              <VStack>
                <Pressable
                  style={styles.inputConexJust}
                  onPress={() => setOpen(true)}>
                  <HStack ml={5} space={3}>
                    <Box
                      style={{
                        height: 30,
                        width: 30,
                        backgroundColor: colors.whiteColor,
                        borderRadius: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <MaterialCommunityIcons size={20} name="calendar-edit" />
                    </Box>
                    <Text color={colors.greyColor}>
                      {textDate
                        ? date.getFullYear() +
                        '-' +
                        (date.getMonth() + 1) +
                        '-' +
                        date.getDate()
                        : 'Date de naissance'}
                    </Text>
                  </HStack>
                </Pressable>
                <DatePicker
                  mode="date"
                  modal
                  open={open}
                  date={date}
                  onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                    setData({ ...formData, date: date });
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
              </VStack>
              {errors?.nom ? (
                <Text color={'red.500'} fontSize={12} ml={3}>
                  {errors?.nom}
                </Text>
              ) : errors?.prenom ? (
                <Text color={'red.500'} fontSize={12} ml={3}>
                  {errors?.prenom}
                </Text>
              ) : errors?.confemail ? (
                <Text color={'red.500'} fontSize={12} ml={3}>
                  {errors?.confemail}
                </Text>
              ) : errors?.telephone ? (
                <Text color={'red.500'} fontSize={12} ml={3}>
                  {errors?.telephone}
                </Text>
              ) : <Text></Text>
              }
              <HStack marginTop={0} ml={3} mb={5} alignItems="center">
                <Checkbox
                  accessibilityLabel="gcu"
                  isChecked={isAccept}
                  onPress={() => setIsAccept(!isAccept)}
                />
                <Text marginLeft={3}>
                  Acceptez-vous nos{' '}
                  <Text style={{ color: colors.secondaryColor }}>CGU</Text>
                </Text>
              </HStack>
              <Center>
                <PrimaryButton
                  title="Créer votre compte"
                  isLoadingText="En Cours..."
                  isLoading={false}
                  style={styles.submitBtnText}
                  color={colors.primaryColor}
                  onPress={onSubmit}
                />
              </Center>
              {/* <Box>
                <Cards
                  _onPress={() => navigation.navigate(SCREENS.LOGIN)}
                  text1={'Vous avez déjà un compte ?'}
                  text2={'connectez-vous'}
                />
              </Box> */}
            </Box>
          </Box>
        </VStack>
      </Box>
    </ScrollView>
  );
};


export default Signup;
