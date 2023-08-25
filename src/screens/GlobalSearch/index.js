import { Box, Icon, Input, Text, VStack } from "native-base";
import React, { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colours";
import { SharedElement } from "react-navigation-shared-element";
import { Feather } from '@expo/vector-icons';
import { PraticiensForSearch } from "../../components/PraticiensForSearch";

export const GlobalSearch = ({ navigation }) => {

    const InputRef = useRef()

    useEffect(() => {
        setTimeout(() => InputRef.current.focus(), 100)
    }, [])

    return (
        <Box>
            <SharedElement>
                <Input
                    ref={InputRef}
                    h={38}
                    rounded={12}
                    borderWidth={0}
                    fontSize={14}
                    margin={3}
                    bg={colors.white}
                    placeholder='Rechercher un praticien ou une spécialité'
                    InputLeftElement={
                        <Icon
                            onPress={() => navigation.goBack()}
                            as={<Feather name="arrow-left" size={24} />}
                            size={5}
                            ml="4"
                            color={colors.primary}
                        />}
                />
            </SharedElement>
            <VStack>
                <PraticiensForSearch />
            </VStack>
        </Box>
    )
}

