import React from "react";
import {
  Box,
  Divider,
  HStack,
  Icon,
  Text,
  View,
  VStack,
  Center,
  ScrollView,
} from "native-base";
import {
  AntDesign,
  FontAwesome5 ,
  Entypo,
  FontAwesome ,
} from "@expo/vector-icons";
import { Linking, Pressable } from "react-native";
import styles from "./styles";
import colors from "../../constants/colours";
import Header from "../../components/Header";
import { useState } from "react";
import Communications from 'react-native-communications';
import { sendEmail } from 'react-native-email-link';

const AboutUs = () => {

  const openService = (service) => {

    const whatsappUrl = `whatsapp://send?phone=${'+237658559995'}&text=${('Bonjour chers admin')}`;

    switch (service) {
      case 'phone':
        Communications.phonecall('658559995', true);
        break;
      case 'facebook':
        // Ouvrir l'application Facebook
        Linking.openURL('fb://page/109025655468380').catch(() => {
          // Si l'ouverture de l'application Facebook échoue, ouvrir dans un navigateur
          Linking.openURL('https://www.facebook.com/109025655468380');
        });
        break;
      case 'mail':
        Communications.email(['aicscloud@gmail.com'], null, null, '', '');

        break;
      case 'whatsapp':
          Linking.canOpenURL(whatsappUrl).then((supported) => {
            if (supported) {
              return Linking.openURL(whatsappUrl);
            } else {
              console.log("WhatsApp n'est pas pris en charge sur cet appareil.");
            }
          }).catch((err) => console.error('Erreur lors de l\'ouverture de WhatsApp:', err))

        break;
      default:
        break;
    }
  };

  return (
    <View flex={1}>
      <Header
        bg={"white"}
        title={
          <VStack>
            <Center marginLeft={10}>
              <Text style={{ fontSize: 20 }}>Informations</Text>
            </Center>
          </VStack>
        }
      />
      <ScrollView flex={1} style={styles.container}>
      <VStack marginBottom={5} style={styles.headerItemGroup}>
        <Text style={{...styles.titreContact}}>Contactez Nous</Text>
        <HStack style={styles.hstackItem} space={5}>
          <Pressable onPress={() => openService('phone')} style={{...styles.iconBox, backgroundColor:'#778da9'}}>
            <FontAwesome size={30} name="phone" color={'white'} />
          </Pressable>
          <Pressable onPress={() => openService('facebook')} style={{...styles.iconBox}}>
          <Entypo name="facebook-with-circle" color={'#457b9d'} size={50}  />
          </Pressable>
          <Pressable onPress={() => openService('mail')} style={{...styles.iconBox}}>
          <Entypo name="mail-with-circle" color={colors.danger} size={50}  />
          </Pressable>
          <Pressable onPress={() =>openService('whatsapp')} style={{...styles.iconBox, backgroundColor:colors.success}}>
          <FontAwesome5  name="whatsapp"  color={colors.white} size={30} />    
          </Pressable>
        </HStack>
        <Text style={{...styles.titreContact, marginTop:40}}>À Propos</Text>
        <VStack ml={-5} mt={3} space={5}>
          <HStack>
          <Entypo style={{marginTop:-12}} name="dot-single" size={50} color={colors.primary} />
          <Box paddingRight={10}>
            <Text style={styles.textStyle}> GatewaysDocs est une application de prise de rendez-vous médical conçue pour faciliter la vie des patients
             et des professionnels de santé. Grâce à cette application, les  patients peuvent prendre des rendez-vous en
             ligne avec des médecins et des spécialistes, sans avoir à se déplacer ou à passerdes heures à chercher un rendez-vous disponible.
             </Text>
          </Box>
          </HStack>

          <HStack>
          <Entypo style={{marginTop:-12}} name="dot-single" size={50} color={colors.primary} />
          <Box paddingRight={10}>
            <Text style={styles.textStyle}>
            L'application GatewaysDocs est facile à utiliser et offre une grande flexibilité aux patients
            pour choisir le moment qui convient le mieux à leur emploi du temps. 
            Les patients peuvent prendre des rendez-vous pour une consultation, une analyse de laboratoire
            ou une procédure médicale, en fonction des disponibilités des médecins et des cliniques.
             </Text>
          </Box>
          </HStack>

          <HStack>
          <Entypo name="dot-single" style={{marginTop:-12}} size={50} color={colors.primary} />
          <Box paddingRight={10}>
            <Text style={styles.textStyle}>
            Les professionnels de santé bénéficient également de l'application GatewaysDocs,
            car elle leur permet de gérer facilement leur calendrier de rendez-vous et de gagner
            du temps en évitant les appels téléphoniques ou les courriers électroniques. Les médecins
            peuvent consulter leur planning à tout moment et vérifier les rendez-vous à venir, ce qui
            leur permet de mieux organiser leur travail et de consacrer plus de temps à leurs patients.
             </Text>
          </Box>
          </HStack>
        </VStack>
        <Text style={{fontSize:9 , textAlign:'center', marginTop:10}}> © 2023 GatewaysDoc Healty</Text>
      </VStack>
      </ScrollView>
    </View>
  );
};

export default AboutUs;
