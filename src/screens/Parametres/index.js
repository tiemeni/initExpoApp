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

const IconItem = (props) => {

  const countries = [
    { value: 'fr', label: 'Fr',  },
    { value: 'en', label: 'En',},

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
      buttonStyle={{ width: 50, height: 30, backgroundColor: 'white', borderRadius: 20 }}
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
        {props.text === "Choix de la langue" ? (
            <SelectLang />
        ) : (
          <Switch  size="md" />
        )}
      </HStack>
    </HStack>
  );
};

const Parametres = () => {
  const [searchedValue, setSearchedValue] = React.useState("");

  const handleChange = (text) => {
    setSearchedValue(text);
  };

  return (
    <View flex={1} style={styles.container}>
      <Header bg={"white"} title={"Paramètres"} />
      <VStack marginTop={30} style={styles.headerItemGroup}>
        <Box>
          <IconItem
            iconName="web"
            iconType={MaterialCommunityIcons}
            text="Choix de la langue"
          />
          <Divider />
          <IconItem
            iconName="megaphone"
            iconType={Foundation}
            text="Recevoir les rappels de rendez-vous"
          />
          <IconItem
            iconName="newsletter"
            iconType={Entypo}
            text="Recevoir les newsletters"
          />
          <IconItem
            iconName="swap"
            iconType={AntDesign}
            text="Partager mes informations entre mes centres"
          />
          <IconItem
            iconName="notifications"
            iconType={MaterialIcons}
            text="Recevoir des notifications des tiers partenaires des centres"
          />
        </Box>
      </VStack>
    </View>
  );
};

export default Parametres;
