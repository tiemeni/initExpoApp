import { TextInput, Text } from 'react-native-paper';
import { Box, Center, HStack, Button, View, VStack, Checkbox } from 'native-base';
import { ActivityIndicator, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useValidation } from 'react-native-form-validator';
import colors from '../../../constants/colours'
import { connect, useDispatch } from 'react-redux';
import styles from './styles';
import logo from '../../../assets/img/hospi-rdv__9_-removebg-preview.png';
import SCREENS, { HOME_CONTAINER_ROUTE, PHONE_CONFIRMATION_SCREEN, SIGNUP } from '../../../constants/screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Cards from '../../../components/Cards';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { validate, isFieldInError, getErrorMessages } = useValidation({
    state: { username, password },
  });

  return (
    <View flex={1} style={styles.contenair}>
      <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 15 }}>
        <Image
          style={{ width: 200, height: 200, marginTop: 30 }}
          source={logo}
          alt={logo}
        />
        <Text
          style={{
            color: "#5C5C5C",
            width: "90%",
            fontSize: 14,
            textAlign: "center",
            fontStyle: 'normal',
            marginTop: -30,
          }}>
          S'il vous plaît, entrez votre email et votre mot de passe
        </Text>
      </View>
      <VStack width={"100%"} alignItems={'center'}>
        <TextInput
          isInvalid={isFieldInError('username')}
          style={styles.inputConex}
          placeholder="Nom d'utilisateur"
          underlineColor="transparent"
          keyboardType="default"
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
                  <MaterialCommunityIcons name={'email-outline'} size={21} />
                </Box>
              )}
            />
          }
          selectionColor={colors.secondaryColor}
          activeUnderlineColor="transparent"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          isInvalid={isFieldInError('password')}
          style={styles.inputConex}
          placeholder="Mot de passe"
          secureTextEntry
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
                  <MaterialCommunityIcons name={'lock'} size={21} />
                </Box>
              )}
            />
          }
          underlineColor="transparent"
          keyboardType="default"
          selectionColor={colors.secondaryColor}
          activeUnderlineColor="transparent"
          onChangeText={setPassword}
          value={password}
        />
        {isFieldInError('username') && isFieldInError('password') && (
          <Text
            style={{ color: 'red', fontSize: 14, marginTop: 3, marginLeft: 8 }}>
            remplisser bien les champs !
          </Text>
        )}
      </VStack>
      <HStack style={{ alignItems: 'center', marginTop: 15, marginBottom: 5, marginLeft: 30 }}>
        <Checkbox />
        <Text
          style={{
            fontWeight: '400',
            fontSize: 14,
            color: '#5C5C5C',
            fontStyle: 'normal',
            marginLeft: 15
          }}>
          Se souvenir de moi
        </Text>
      </HStack>
      <Pressable onPress={() => navigation.navigate(PHONE_CONFIRMATION_SCREEN)}>
        <Text style={styles.fogetpass}>Mot de passe oublié ?</Text>
      </Pressable>
      <Center>
        <PrimaryButton
          title="Se connecter"
          isLoadingText="En Cours..."
          isLoading={false}
          style={styles.submitBtnText}
          color={colors.primaryColor}
          onPress={() => navigation.navigate(HOME_CONTAINER_ROUTE)}
        />
      </Center>
      <Center>
        <VStack>
          <Text style={{ marginBottom: 10, color: "#858585" }}>
            Pas encore de compte ? <Text
              style={styles.fogetpass}
              onPress={() => navigation.navigate(SIGNUP)}>Inscrivez-vous!</Text>
          </Text>
          <Center>
            {/* <Text style={{ color: "#858585" }}>
              Connectez-vous avec :
            </Text> */}
          </Center>
        </VStack>
      </Center>
    </View>
  );
};
export default Login;
