import React from "react";
import { Text, Box, HStack, Icon, } from "native-base";
import colors from "../../constants/colours";
import {Foundation} from "@expo/vector-icons";


const CustomToast = ({ message }) => {
  return (
    <Box
      bg="red.100"
      px={4}
      py={3}
      rounded="md"
      shadow={3}
      _text={{ color: "white" }}
      w="100%"
    >
      <HStack space={2} flex={1} alignItems={"center"}>
        <Icon
          as={<Foundation name="alert" size={24} color={colors.danger} />}
          size={5}
          color={colors.danger}
        />
        <Text>{message}</Text>
      </HStack>
    </Box>
  );
};
export default CustomToast;
