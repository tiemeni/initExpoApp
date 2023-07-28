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
  ScrollView
} from "native-base";
import {
  MaterialCommunityIcons,
  AntDesign,
  Foundation,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import styles from "./styles";
import colors from "../../constants/colours";
import Header from "../../components/Header";
import SelectDropdown from "react-native-select-dropdown";
import { useState } from "react";
import logo from "../../assets/img/hospi-rdv__9_-removebg-preview.png";

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
          console.log(selectedItem, index);
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
              <Text style={{ fontSize: 20 }}>GatewayDoc Heatlty</Text>
              <Text style={{ fontSize: 11 }}>Version 1.23..14.82</Text>
            </Center>
          </VStack>
        }
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 30,
          marginTop: 40,
        }}
      >
        <Image
          style={{ width: 500, height: 200, marginTop: 20 }}
          source={logo}
          alt={'logo'}
        />
      </View>

      <VStack marginBottom={5} marginTop={25} style={styles.headerItemGroup}>
        <Box>
          <IconItem
            iconName="call"
            iconType={MaterialIcons}
            text="Contactez-nous"
          />
          <Divider mb={3} />
          <IconItem
            iconName="filetext1"
            iconType={AntDesign}
            text="Condition générale d'utilisation"
          />
          <Divider mb={3}  />
          <IconItem
            iconName="text-document-inverted"
            iconType={Entypo}
            text="Politique de de confidentialité"
          />
        </Box>
        <Text style={{fontSize:9 , textAlign:'center', marginTop:3}}> © 2023 GatewaysDoc Healty</Text>
      </VStack>
    </ScrollView>
  );
};

export default AboutUs;
