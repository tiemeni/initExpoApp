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

export const Skelette = () => {
  return (
    <View
      style={{
        height: 180,
        width: "100%",
        padding:5,
        marginTop: 0,
        borderRadius:15,
        alignItems: "center",
        backgroundColor:'white'
      }}
    >
      <HStack mt={3} marginBottom={2} justifyContent={"space-between"}>
        <VStack flex={1} width={'100%'} space={3}>
            <Skeleton startColor="gray.300" rounded={50} width={'80%'} h={3} />
            <Skeleton startColor="gray.300" rounded={50} width={'30%'} h={2} />
        </VStack>
        <Avatar
          bg={colors.trans_primary}
          width={42}
          height={42}
          source={{ uri: null }}
        />
      </HStack>
      <Divider/>
      <HStack mt={4} mb={3} space={3}>
        <Text style={{ fontSize: 14 }}>
          <Skeleton startColor="gray.300" rounded={50} w={100} h={2} />
        </Text>
        <Text style={{ fontSize: 14 }}>
          <Skeleton startColor="gray.300" rounded={50} w={100} h={2} />
        </Text>
        <Text style={{ fontSize: 14 }}>
          <Skeleton startColor="gray.300" rounded={50} w={100} h={2} />
        </Text>
      </HStack>
      <HStack mt={6} space={18} justifyContent={"space-between"}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.transp_danger,
            height: 40,
            width: 133,
            display: "flex",
            flexDirection: "row",
            borderRadius: 10,
            justifyContent: "center",
            marginRight: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            <Skeleton startColor="gray.300" rounded={50} w={100} h={1/2} />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: colors.trans_primary,
            height: 40,
            width: 133,
            display: "flex",
            flexDirection: "row",
            borderRadius: 10,
            justifyContent: "center",
            marginRight: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>
            <Skeleton startColor="gray.300" rounded={50} w={100} h={1/2} />
          </Text>
        </TouchableOpacity>
      </HStack>
    </View>
  );
};
