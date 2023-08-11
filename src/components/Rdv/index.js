import { View, Text, Image } from 'react-native'
import React from 'react'
import { Avatar, Circle, HStack, VStack } from 'native-base'
import colors from '../../constants/colours'
import icon from "../../assets/img/account.png"
import { TouchableOpacity } from 'react-native-gesture-handler'
import calendar from "../../assets/img/calendar.png"
import dot from "../../assets/img/black-circle.png"
import watch from "../../assets/img/clock.png"


export default function Rdv({ date, duration, startTime, praticien, status }) {

    const date2 = new Date(date);
    const day = date2.getDate();
    const month = date2.getMonth() + 1; // Les mois commencent à partir de 0, donc on ajoute 1
    const year = date2.getFullYear() % 100;

    return (
        <View style={{
            height: "100%",
            width: "100%"
        }}>
            <HStack
                justifyContent={"space-between"}

            >
                <VStack>
                    <Text style={{ fontSize: 16 }}>{praticien?.name ? "Dr. " + praticien?.name : "Dr. Tiemeni"}</Text>
                    <Text style={{ fontSize: 14, color: "#A8A8A8" }}>{duration ? duration + " minutes" : ""}</Text>
                </VStack>
                <Avatar
                    bg={colors.primary}
                    width={42}
                    height={42}
                    source={{
                        uri: null
                    }}></Avatar>
            </HStack>
            <VStack justifyContent={"space-around"} borderTopWidth={1} borderTopColor={"#DFDFDF"} height={110} mt={2}>
                <HStack justifyContent={"space-around"} mt={2}>
                    <HStack alignItems={'center'}>
                        <Image source={calendar} style={{ height: 15, width: 15 }} />
                        <Text style={{ fontSize: 12, marginLeft: 5 }}>{`${day}/${month}/${year}`}</Text>
                    </HStack>
                    <HStack alignItems={'center'}>
                        <Image source={watch} style={{ height: 15, width: 15 }} />
                        <Text style={{ fontSize: 12, marginLeft: 5 }}>{startTime}</Text>
                    </HStack>
                    <HStack alignItems={'center'}>
                        <Image source={dot} style={{ height: 8, width: 8 }} />
                        {/* <Circle color={'green'} width={10} height={10} /> */}
                        <Text style={{ fontSize: 12, marginLeft: 5 }}>{status}</Text>
                    </HStack>
                </HStack>
                <HStack justifyContent={"space-between"}>
                    <TouchableOpacity style={{
                        backgroundColor: "#fdf2f2",
                        height: 40,
                        width: 133,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        borderRadius: 10,
                        marginLeft: 10,
                        alignItems: "center"
                    }}>
                        <Text style={{ fontSize: 16, color: "#FF0000" }}>Annuler</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: colors.primary,
                        height: 40,
                        width: 133,
                        display: "flex",
                        flexDirection: "row",
                        borderRadius: 10,
                        justifyContent: "center",
                        marginRight: 10,
                        alignItems: "center"
                    }}>
                        <Text style={{ color: "white", fontSize: 16 }}>Reporter</Text>
                    </TouchableOpacity>
                </HStack>
            </VStack>
        </View >
    )
}