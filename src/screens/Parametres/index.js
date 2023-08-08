import React, { useState } from "react";
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
import styles from "./styles"; // Assurez-vous d'importer le style correctement
import colors from "../../constants/colours";
import Header from "../../components/Header";
import SelectDropdown from "react-native-select-dropdown";
import { useTranslation } from "react-i18next";
import "../../i18n";

const Parametres = () => {
  const { i18n } = useTranslation();
  const translate = useTranslation().t;

  const countries = [
    { value: "Fr", label: "Fr" },
    { value: "En", label: "En" },
  ];
  const [selectedLang, setSelectedLang] = useState(countries[0].value);

  const IconItem = (props) => {
    const SelectLang = () => {
      console.log("ancien", selectedLang);
      const handleLangChange = (item) => {
        console.log("item", item);
        i18n
          .changeLanguage(item)
          .then(() => {
            console.log("nouvelle", item);
            setSelectedLang(item);
          })
          .catch((err) => console.log(err));
      };

      return (
        <SelectDropdown
          defaultValue={selectedLang}
          data={countries}
          onSelect={(selectedItem, index) => {
            handleLangChange(selectedItem.value);
            console.log(selectedItem.value, index);
          }}
          buttonTextAfterSelection={(item, index) => {
            return item.value;
          }}
          rowTextForSelection={(item, index) => {
            return item.label;
          }}
          defaultButtonText={selectedLang}
          buttonTextStyle={{
            color: colors.primary,
            fontSize: 14,
            fontWeight: "600",
          }}
          buttonStyle={{
            width: 60,
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
          {props.text === translate("TEXT_CHOISE_LANGUAGE") ? (
            <SelectLang />
          ) : (
            <Switch size="sm" />
          )}
        </HStack>
      </HStack>
    );
  };

  return (
    <View flex={1} style={styles.container}>
      <Header bg={"white"} title={"Paramètres"} />
      <VStack marginTop={30} style={styles.headerItemGroup}>
        <Box>
          <IconItem
            iconName="web"
            iconType={MaterialCommunityIcons}
            text={translate("TEXT_CHOISE_LANGUAGE")}
          />
          <Divider />
          <IconItem
            iconName="megaphone"
            iconType={Foundation}
            text={translate("TEXT_RECIVE_FEDBACK")}
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
