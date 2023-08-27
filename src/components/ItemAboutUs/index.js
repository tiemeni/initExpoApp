import { View, Icon, HStack, VStack } from "native-base";
import React from "react";
import { Text } from "react-native";
import { styles } from "./style";
import colors from "../../constants/colours";

export default function ItemAboutUs({ tilte, description, icon }) {
  return (
    <View style={styles.container}>
      <HStack style={styles.subContainer} space={2}>
        <Icon as={icon} color={colors.black} size={6} />
        <VStack w={"92%"}>
          <Text style={styles.label}>{tilte}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </VStack>
      </HStack>
    </View>
  );
}
