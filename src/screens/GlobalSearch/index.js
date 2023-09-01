import { Box, Icon, Input, Text, VStack, View } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/colours";
import { SharedElement } from "react-navigation-shared-element";
import { Feather } from '@expo/vector-icons';
import { PraticiensForSearch } from "../../components/PraticiensForSearch";
import { useDispatch, useSelector } from "react-redux";
import { searchPratByKey } from "../../redux/Praticiens/actions";
import { PratSearchSkeleton } from "./skeleton";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SCREENS from "../../constants/screens";


export const GlobalSearch = ({ navigation }) => {
    const dispatch = useDispatch()
    const searchedPrats = useSelector(state => state.Praticiens.searchedPrats)
    const loadingSearch = useSelector(state => state.Praticiens.loadingSearchPrats)
    const InputRef = useRef()
    const handleSearch = (key) => {
        dispatch(searchPratByKey(key))
    }

    useEffect(() => {
        setTimeout(() => InputRef.current.focus(), 100)
    }, [])

    return (
        <Box flex={1} style={{ backgroundColor: colors.white }}>
            <Input
                ref={InputRef}
                h={38}
                rounded={12}
                onChangeText={(text) => handleSearch(text)}
                borderWidth={0}
                fontSize={14}
                margin={3}
                bg={colors.white}
                placeholder='Rechercher un praticien'
                InputLeftElement={
                    <Icon
                        onPress={() => navigation.goBack()}
                        as={<Feather name="arrow-left" size={24} />}
                        size={5}
                        ml="4"
                        color={colors.primary}
                    />}
            />
            <VStack space={3}>
                {
                    !loadingSearch ? searchedPrats?.map((p, i) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate(SCREENS.DETAILS_PRATICIEN, { praticien: p })}>
                                <PraticiensForSearch key={i} data={p} />
                            </TouchableOpacity>
                        )
                    }) : <PratSearchSkeleton />
                }
            </VStack>
        </Box>
    )
}

