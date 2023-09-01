import { View } from 'react-native'
import React from 'react'
import { Avatar, Button, HStack, VStack, Text } from 'native-base'
import colors from '../../constants/colours'
import styles from './style'
import * as SCREENS from '../../constants/screens'
import { Calendar, DocumentText, Location, Map1, Timer1 } from 'iconsax-react-native'
import { transfomeToSlashDate } from '../../utils/helper'

export default function Rdv({ _id, navigation, date, motif, startTime, praticien, status, localisation }) {
    return (
        <View style={{
            height: "100%",
            width: "100%"
        }}>
            <HStack justifyContent={"space-between"} alignItems={'center'}>
                <VStack>
                    <Text fontWeight="500" fontSize={16}>{"Dr. " + praticien}</Text>
                    <Text style={{ fontSize: 14, color: colors.text_grey_hint }}>{"Genicologue"}</Text>
                </VStack>
                <Avatar
                    bg={colors.primary}
                    width={42}
                    height={42}
                    source={{
                        uri: null
                    }}></Avatar>
            </HStack>
            <VStack borderTopWidth={1} paddingLeft={1} borderTopColor={"#DFDFDF"} mt={2}>
                <HStack mt={2} space={3}>
                    <HStack alignItems={'center'} style={styles.left} space={1}>
                        <DocumentText color={colors.text_grey_hint} size={22} />
                        <Text style={{ fontSize: 12 }}>{motif ?? ""}</Text>
                    </HStack>
                    <HStack alignItems={'center'} space={1}>
                        <Location color={colors.text_grey_hint} size={22} />
                        <Text style={{ fontSize: 12 }}>{"Clinique FOUDA"}</Text>
                    </HStack>
                </HStack>
                <HStack mt={2} space={3}>
                    <HStack alignItems={'center'} style={styles.left} space={1}>
                        <Calendar color={colors.text_grey_hint} size={22} />
                        <Text style={{ fontSize: 12 }}>{transfomeToSlashDate(date)}</Text>
                    </HStack>
                    <HStack alignItems={'center'} space={1}>
                        <Timer1 color={colors.text_grey_hint} size={22} />
                        <Text style={{ fontSize: 12 }}>{startTime.split(" à ")[1]}</Text>
                    </HStack>
                </HStack>
                <HStack justifyContent={"space-between"} mt={4}>
                    {localisation && <Button style={styles.mapBtn} onPress={() => navigation.navigate(SCREENS.GOOGLE_MAP, { localisation })}>
                        <Map1 color={colors.primary} />
                    </Button>}
                    <Button onPress={() => navigation.navigate(SCREENS.APPOINTMENT_DETAILS_SCREEN, { _id: _id })} style={{ ...styles.reportBtn, width: localisation ? "80%" : "100%" }}>
                        <Text style={styles.reportText}>Afficher</Text>
                    </Button>
                </HStack>
            </VStack>
        </View >
    )
}