import React from "react";
import { Box, Input, ScrollView, View, HStack, Text, VStack, Icon, Avatar } from 'native-base'
import colors from "../../constants/colours";
import { Feather } from '@expo/vector-icons';

export const PraticiensForSearch = () => {
    return (
        <View px={4}>
            <VStack style={{
                padding: 5,
                borderRadius: 5,
                shadowColor: "#000",
                shadowOffset: {
                    width: 1,
                    height: 1,
                },
                shadowOpacity: 0,
                shadowRadius: 2,
                elevation: 1,
            }}>
                <HStack mb={3}>
                    <Box>
                        <Avatar
                            bg={colors.primary}
                            width={42}
                            height={42}
                            source={{
                                uri: null
                            }}></Avatar>
                    </Box>
                    <VStack ml={3}>
                        <Text style={{
                            fontWeight: "bold"
                        }}>Dr Tiemeni hapi</Text>
                        <Text style={{
                        }}>Ophtalmologiste </Text>
                    </VStack>
                </HStack>
            </VStack>
        </View>
    )
}