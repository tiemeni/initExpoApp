import { View, Text, Image } from 'react-native'
import React from 'react'
import { Avatar, Button, Circle, HStack, Pressable, VStack } from 'native-base'
import colors from '../../constants/colours'
import icon from "../../assets/img/account.png"
import { TouchableOpacity } from 'react-native-gesture-handler'
import calendar from "../../assets/img/calendar.png"

import styles from './style'
import * as SCREENS from '../../constants/screens'
import motifIcon from "../../assets/img/stethoscope.png"
import locationIcon from "../../assets/img/location.png"
import { FontAwesome5 } from '@expo/vector-icons';

export default function Rdv({ _id, navigation, date, duration, startTime, praticien, status }) {
    const date2 = new Date(date);
    const day = date2.getDate();
    const month = date2.getMonth() + 1; // Les mois commencent à partir de 0, donc on ajoute 1
    const year = date2.getFullYear() % 100;

    return (
        <View style={{
            height: "100%",
            width: "100%"
        }}>
            <HStack justifyContent={"space-between"} alignItems={'center'}>
                <VStack>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>{"Dr. " + praticien}</Text>
                    <Text style={{ fontSize: 14, }}>{"Genicologue"}</Text>
                </VStack>
                <Avatar
                    bg={colors.primary}
                    width={42}
                    height={42}
                    source={{
                        uri: null
                    }}></Avatar>
            </HStack>
            <VStack justifyContent={"space-around"} borderTopWidth={1} paddingLeft={1} borderTopColor={"#DFDFDF"} height={110} mt={2}>
                <HStack justifyContent={"space-between"} mt={2}>
                    <HStack alignItems={'center'}>
                        <Image source={motifIcon} style={{ height: 15, width: 15 }} />
                        <Text style={{ fontSize: 12, marginLeft: 5 }}>{duration ?? ""}</Text>
                    </HStack>
                    <HStack alignItems={'center'}>
                        <Image source={locationIcon} style={{ height: 15, width: 15 }} />
                        <Text style={{ fontSize: 12, marginLeft: 5 }}>{"Clinique FOUDA"}</Text>
                    </HStack>
                </HStack>
                <HStack mt={2}>
                    <HStack alignItems={'center'}>
                        <Image source={calendar} style={{ height: 15, width: 15 }} />
                        <Text style={{ fontSize: 12, marginLeft: 5 }}>{startTime}</Text>
                    </HStack>
                </HStack>
                <HStack justifyContent={"space-between"} mt={3}>
                    <Pressable onPress={() => navigation.navigate(SCREENS.GOOGLE_MAP)}>
                        <FontAwesome5 name="map-marked-alt" size={21}
                            color={colors.white}
                            style={{ backgroundColor: colors.primary, padding: 8, borderRadius: 50 }}
                        />
                    </Pressable>
                    <Button onPress={() => navigation.navigate(SCREENS.APPOINTMENT_DETAILS_SCREEN, { _id: _id })} style={styles.reportBtn}>
                        <Text style={styles.reportText}>Afficher</Text>
                    </Button>
                </HStack>
            </VStack>
        </View >
    )
}