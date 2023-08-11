import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  Avatar,
  Circle,
  HStack,
  VStack,
  Skeleton,
  Divider,
  Center,
} from "native-base";
import colors from "../../constants/colours";

export const SkeletteNotif = () => {
  return (
    <View
      style={{
        height: 180,
        width: "100%",
        padding: 3,
        marginTop: 0,
        borderRadius: 15,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <HStack flex={1} mt={3} marginBottom={2} justifyContent={"space-between"}>
        <VStack flex={1} width={"100%"} space={3}>
          <Skeleton startColor="gray.300" rounded={50} w={"50%"} h={30} />
        </VStack>
        <Skeleton startColor="gray.300" rounded={50} w={100} h={1 / 2} />
      </HStack>
      <VStack width={"100%"} mt={3} mb={3} space={3}>
        <Text style={{ fontSize: 14 }}>
          <Skeleton startColor="gray.300" rounded={50} w={"100%"} h={3} />
        </Text>
        <Text style={{ fontSize: 14 }}>
          <Skeleton startColor="gray.300" rounded={50} w={100} h={1} />
        </Text>
        <Text style={{ fontSize: 14 }}>
          <Skeleton startColor="gray.300" rounded={50} w={100} h={1} />
        </Text>
        <Text style={{ fontSize: 14 }}>
          <Skeleton startColor="gray.300" rounded={50} w={100} h={1} />
        </Text>
      </VStack>
      <HStack mt={6} space={18} justifyContent={"space-between"}>
        <Text style={{ color: "white", fontSize: 16 }}>
          <Skeleton startColor="gray.300" rounded={50} w={100} h={1 / 2} />
        </Text>
      </HStack>
    </View>
  );
};
