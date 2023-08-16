import React from "react";
import {
  Box,
  Divider,
  HStack,
  Icon,
  Text,
  View,
  Switch,
  VStack,
  Center,
  Image,
  ScrollView,
  Link
} from "native-base";
import {
  AntDesign,
  FontAwesome5 ,
  Entypo,
  FontAwesome ,
  MaterialIcons,
} from "@expo/vector-icons";
import styles from "./styles";
import colors from "../../constants/colours";
import Header from "../../components/Header";
import SelectDropdown from "react-native-select-dropdown";
import { useState } from "react";
import logo from "../../assets/img/logBlac.jpg";

const IconItem = (props) => {
  const countries = [
    { value: "fr", label: "Fr" },
    { value: "en", label: "En" },
  ];

  const SelectLang = () => {
    const [selectedLang, setSelectedLang] = useState(countries[0]);
    const handleLangChange = (item) => {
      setSelectedLang(item);
    };

    return (
      <SelectDropdown
        data={countries}
        onSelect={(selectedItem, index) => {
          handleLangChange(selectedItem);
        }}
        defaultValue={selectedLang}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem.label;
        }}
        rowTextForSelection={(item, index) => {
          return item.label;
        }}
        buttonStyle={{
          width: 50,
          height: 30,
          backgroundColor: "white",
          borderRadius: 20,
        }}
      />
    );
  };
  
  return (
    <HStack style={styles.headerItem}>
      <Box style={styles.iconBox}>
        <Icon
          as={props.iconType}
          name={props.iconName}
          color={colors.primary}
          size="md"
        />
      </Box>
      <HStack flex={1} alignItems={"center"} justifyContent={"space-between"}>
        <Text style={styles.textBox}>{props.text}</Text>
          <Icon as={<AntDesign name="right"/>} size="sm" />
      </HStack>
    </HStack>
  );
};

const AboutUs = () => {
  const [searchedValue, setSearchedValue] = React.useState("");

  const handleChange = (text) => {
    setSearchedValue(text);
  };

  return (
    <ScrollView flex={1} style={styles.container}>
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
      <VStack marginBottom={5} marginTop={25} style={styles.headerItemGroup}>
        <Text style={styles.titreContact}>Contactez-nous</Text>
        <HStack style={styles.hstackItem} space={5}>
          <Box style={{...styles.iconBox, backgroundColor:'#a2d2ff'}}>
            <FontAwesome size={30} name="phone" color={'white'} />
          </Box>
          <Box style={{...styles.iconBox}}>
          <Entypo name="facebook-with-circle" color={'#457b9d'} size={50}  />
          </Box>
          <Box style={{...styles.iconBox}}>
          <Entypo name="mail-with-circle" color={colors.danger} size={50}  />
          </Box>
          <Box style={{...styles.iconBox, backgroundColor:colors.success}}>
          <FontAwesome5  name="whatsapp"  color={colors.white} size={30} />    
          </Box>
        </HStack>
        <Text style={{...styles.titreContact, marginTop:40}}>A propos</Text>
        <VStack mt={3} space={2}>
          <HStack>
          <Entypo name="dot-single" size={30} color={colors.primary} />
          <Text fontSize={16}>
           GatewaysDocs est une application de prise de rendez-vous médical
            conçue pour faciliter la vie des patients et des professionnels de santé.
            Grâce à cette application, les
            <Text> patients peuvent prendre des rendez-vous en 
             ligne avec des médecins et des spécialistes, sans avoir à se déplacer ou à passer
             des heures à chercher un rendez-vous disponible.
             </Text>
          </Text>
          </HStack>

          <HStack>
          <Entypo name="dot-single" size={30} color={colors.primary} />
          <Text>
           L'application GatewaysDocs est facile àutiliser et offre une grande flexibilité aux patients
           pour choisir le moment qui convient le mieux à leur emploi du temps.
            Les patients peuvent prendre des rendez-vous pour une consultation, 
            une analyse de laboratoire ou une procédure médicale, en fonction des
             disponibilités des médecins et des cliniques.

          </Text>
          </HStack>

          <HStack>
          <Entypo name="dot-single" size={30} color={colors.primary} />
          <Text>
          Les professionnels de santé bénéficient également de l'application GatewaysDocs, 
          car elle leur permet de gérer facilement leur calendrier de rendez-vous et de gagner
           du temps en évitant les appels téléphoniques ou les courriers électroniques. 
           Les médecins peuvent consulter leur planning à tout moment et vérifier les rendez-vous à 
           venir, ce qui leur permet de mieux organiser
           leur travail et de consacrer plus de temps à leurs patients.
          </Text>
          </HStack>
        </VStack>
        <Text style={{fontSize:9 , textAlign:'center', marginTop:10}}> © 2023 GatewaysDoc Healty</Text>
      </VStack>
    </ScrollView>
  );
};

export default AboutUs;
