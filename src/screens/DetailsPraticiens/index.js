import { Box, Button, Divider, FlatList, HStack, Pressable, ScrollView, Stack, Text, VStack, View } from "native-base";
import React from "react";
import Header from "../../components/Header";
import colors from "../../constants/colours";
import { useState } from "react";
import MedItem from "../../components/MedItem";

const _spacing = 3

export const DetailsPraticien = () => {
    const [itemSelected, setItemSelected] = useState("consultation")
    const [selectedDat, setSelectedDay] = useState("")
    const [selectedCreneau, setSelectedCreneau] = useState("")
    const [selectedClinic, setSelectedClinic] = useState('')
    return (
        <Box flex={1} style={{ backgroundColor: colors.white }}>
            <Header title={""} bg={colors.white} />
            <VStack space={4} height={"82%"}>
                <HStack px={5} alignItems={'center'} space={4} style={{
                    backgroundColor: colors.white,
                    padding: 10,
                    borderRadius: 10
                }}>
                    <Box style={{
                        height: 90,
                        width: 90,
                        borderRadius: 10,
                        backgroundColor: colors.text_grey_hint
                    }}></Box>
                    <VStack>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: colors.black
                        }}>Dr {"Dongmo Donald"}</Text>
                        <Text style={{ color: colors.text_grey_hint }}>{"Genicologue"}</Text>
                        <Text style={{ color: colors.text_grey_hint }}>4,5/5 (388 avis)</Text>
                    </VStack>
                </HStack>
                <HStack justifyContent={"space-around"} px={10}>
                    <VStack justifyContent={'center'} alignItems={"center"}>
                        <Text>542+</Text>
                        <Text>Patients</Text>
                    </VStack>
                    <VStack justifyContent={'center'} alignItems={"center"}>
                        <Text>11 years</Text>
                        <Text>Experience+</Text>
                    </VStack>
                    <VStack justifyContent={'center'} alignItems={"center"}>
                        <Text>4.79</Text>
                        <Text>Rating</Text>
                    </VStack>
                </HStack>
                <HStack justifyContent={"center"}>
                    <Divider width={"80%"} />
                </HStack>
                <ScrollView height={"53%"}>
                    <VStack space={_spacing}>
                        <VStack px={5}>
                            <Text>Motifs Traitables</Text>
                            <FlatList
                                data={["consultation", "radiologie", "checkup", "homodialyse"]}
                                keyExtractor={({ value, key }) => key?.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                scrollEnabled={true}
                                renderItem={({ item, index }) => {
                                    return (
                                        <Pressable py={_spacing} ml={_spacing - 1} key={index} onPress={() => { setItemSelected(item) }}>
                                            <View
                                                bg={itemSelected === item ? "primary.500" : "white"}
                                                style={[{
                                                    paddingHorizontal: 20,
                                                    paddingVertical: 10,
                                                    borderRadius: 20
                                                }, {
                                                    shadowColor: "#000",
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 3,
                                                    },
                                                    shadowOpacity: 0.01,
                                                    shadowRadius: 3.84,
                                                    elevation: 0.1,
                                                }]}>
                                                <Text color={itemSelected === item ? "white" : colors.text_grey_hint}>
                                                    {item}
                                                </Text>
                                            </View>
                                        </Pressable>
                                    )
                                }}
                            />
                        </VStack>
                        <VStack px={5} space={_spacing}>
                            <Text>Clinique affectées</Text>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                                {[1, 2, 3, 4, 5, 6].map((p, index) => {
                                    return <MedItem
                                        key={index}
                                        value={selectedClinic}
                                        handleChange={() => setSelectedClinic(p)}
                                        infosClinique={{ _id: p }}
                                        index={index}
                                    />
                                })}
                            </ScrollView>
                        </VStack>
                        <VStack px={5} space={_spacing}>
                            <Text>Periode de travail</Text>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} mb={4}>
                                <HStack alignItems={'center'}>
                                    {["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"].map((d, index) =>
                                        <Pressable key={index} onPress={() => { setSelectedDay(d) }}>
                                            <Box
                                                ml={index !== 0 ? 2 : 0}
                                                style={{
                                                    padding: 10,
                                                    borderRadius: 10,
                                                    borderColor: colors.text_grey_hint,
                                                    borderWidth: 0.5,
                                                    backgroundColor: 'transparent',
                                                    borderColor: selectedDat === d ? colors.trans_primary : colors.text_grey_hint,
                                                    backgroundColor: selectedDat === d ? colors.trans_primary : 'transparent',
                                                }}
                                            >
                                                <Text style={{ color: colors.black, }}>
                                                    {d}
                                                </Text>
                                            </Box>
                                        </Pressable>
                                    )}
                                </HStack>
                            </ScrollView>
                        </VStack>
                        <HStack px={5}>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                                <HStack alignItems={'center'}>
                                    {[1, 2, 3, 4, 5, 6].map((d, index) =>
                                        <Pressable onPress={() => {
                                            setSelectedCreneau(d)
                                        }} key={index}>
                                            <Box
                                                ml={index !== 0 ? 2 : 0}
                                                style={{
                                                    padding: 10,
                                                    borderRadius: 10,
                                                    borderColor: colors.text_grey_hint,
                                                    borderWidth: 0.5,
                                                    borderColor: selectedCreneau === d ? colors.trans_primary : colors.text_grey_hint,
                                                    backgroundColor: selectedCreneau === d ? colors.trans_primary : 'transparent',
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        color: selectedCreneau === d ? colors.primary : colors.black,
                                                    }}
                                                >
                                                    {"10:30"}
                                                </Text>
                                            </Box>
                                        </Pressable>
                                    )}
                                </HStack>
                            </ScrollView>
                        </HStack>
                    </VStack>
                </ScrollView>
            </VStack>
            <HStack
                justifyContent={"center"}
                alignItems={"center"}
                px={5}
                width={"100%"}
                height={"10%"}
               //</Box> marginTop={5}
               >
                <Button width={"100%"} height={"60%"} >
                    <Text color={colors.white}>PRENDRE UN RDV</Text>
                </Button>
            </HStack>
        </Box>
    )
}