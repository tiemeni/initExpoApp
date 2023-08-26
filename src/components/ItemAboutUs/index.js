import { View, Icon, HStack, VStack } from "native-base";
import React from "react";
import { Text } from "react-native";
import { styles } from "./style";
import colors from "../../constants/colours";

export default function ItemAboutUs({ tilte, description, icon }) {
  return (
    <View style={styles.container}>
      <HStack style={styles.subContainer}>
        <Icon as={icon} color={colors.primary} size={6} />
        <VStack padding={3}>
          <Text style={styles.label}>{tilte}</Text>
          {tilte ==="Conditions d'utilisation" || tilte ==="Politique de confidentialité" || tilte==="Licenses et remerciements"? "":  <Text style={{fontSize:12}}>{description}</Text>}
        </VStack>
      </HStack>
    </View>
  );
}
