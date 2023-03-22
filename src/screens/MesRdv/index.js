import React, { useEffect, useState } from 'react'
import { Avatar, Box, HStack, ScrollView, View, VStack } from 'native-base'
import { ActivityIndicator, Image, StyleSheet, Text } from 'react-native'
import colors from '../../constants/colours'
import plusBlack from "../../assets/img/plus_black.png"
import Rdv from '../../components/Rdv'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { MAKE_APPOINTMENT_SCREEN } from '../../constants/screens'

export const IsLoadingComponent = () => {
    return (
        <View style={{
            padding: 3,
            alignItems: 'center',
            width: '100%',
        }}>
            <View>
                <ActivityIndicator
                    color={colors.primary}
                    size={30}
                    style={{
                        backgroundColor: "white",
                        borderRadius: 100,
                        padding: 5,
                        elevation: 5
                    }} />
            </View>
        </View>
    )
}

export const CustomHeader = ({ navigation, mb }) => {
    return (
        <HStack
            justifyContent={"space-between"}
            padding={2}
            alignItems={'center'}
            backgroundColor={'white'}
            style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.1,
                shadowRadius: 3.84,
                elevation: 1
            }}
            mb={mb}>
            <HStack
                alignItems={"center"}>
                <Avatar
                    bg={colors.primary}
                    width={37}
                    height={37}
                    source={{
                        uri: null
                    }}></Avatar>
                <Text style={{ marginLeft: 15, fontSize: 18 }}>John Doe</Text>
            </HStack>
            <TouchableOpacity onPress={() => navigation.navigate(MAKE_APPOINTMENT_SCREEN)}>
                <Image
                    source={plusBlack}
                    style={{ height: 20, width: 20, marginRight: 5 }} />
            </TouchableOpacity>
        </HStack>
    )
}

export default function MesRdv({ navigation }) {

    const [actualState, setActualState] = useState(1)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    })

    return (
        <View flex={1}>
            <CustomHeader navigation={navigation} mb={5} />
            <Box
                width={"100%"}
                justifyContent={'center'}
                alignItems={'center'}
                height={45}
                mb={5}>
                <HStack
                    width={"95%"}
                    alignItems={'center'}
                    height={'95%'}
                    backgroundColor={'#EEEFF3'}
                    borderRadius={10}>
                    <View
                        display={"flex"}
                        flexDirection={'row'}
                        justifyContent={'center'}
                        borderRightWidth={1}
                        borderRightColor={'#DADADA'}
                        height={'90%'}
                        width={"33%"}>
                        <Pressable
                            onPress={() => {
                                setActualState(1)
                                setLoading(true)
                                setTimeout(() => {
                                    setLoading(false)
                                }, 1000)
                            }}
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={'center'}
                            alignItems={'center'}
                            backgroundColor={actualState === 1 ? "#04B7C9" : "#EEEFF3"}
                            height={"100%"}
                            width={'90%'}
                            borderRadius={10}
                        >
                            <TouchableOpacity>
                                <Text style={{ fontSize: 16, color: actualState === 1 ? "white" : "#909090" }}>A venir</Text>
                            </TouchableOpacity>
                        </Pressable>
                    </View>
                    <View
                        display={"flex"}
                        flexDirection={'row'}
                        justifyContent={'center'}
                        borderRightWidth={1}
                        borderRightColor={'#DADADA'}
                        height={'90%'}
                        width={"34%"}>
                        <Pressable
                            onPress={() => {
                                setActualState(2)
                            }}
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={'center'}
                            alignItems={'center'}
                            backgroundColor={actualState === 2 ? "#04B7C9" : "#EEEFF3"}
                            height={"100%"}
                            width={'90%'}
                            borderRadius={10}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 16, color: actualState === 2 ? "white" : "#909090" }}>Terminé</Text>
                            </TouchableOpacity>
                        </Pressable>
                    </View>
                    <View
                        height={'90%'}
                        width={"33%"}
                        display={"flex"}
                        flexDirection={'row'}
                        borderRightColor={'#DADADA'}
                        justifyContent={'center'}>
                        <Pressable
                            onPress={() => setActualState(3)}
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={'center'}
                            alignItems={'center'}
                            backgroundColor={actualState === 3 ? "#04B7C9" : "#EEEFF3"}
                            height={"100%"}
                            width={'90%'}
                            borderRadius={10}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 16, color: actualState === 3 ? "white" : "#909090" }}>Annulé</Text>
                            </TouchableOpacity>
                        </Pressable>
                    </View>
                </HStack>
            </Box>
            <ScrollView
                overScrollMode='never'
            >
                {actualState === 1 && !loading ?
                    <VStack justifyContent={"center"} alignItems={'center'}>
                        {[1, 2, 3, 4, 5, 6].map((_e, i) => (
                            <View
                                key={i}
                                height={182}
                                width={340}
                                borderRadius={10}
                                padding={3}
                                mb={2}
                                backgroundColor={'white'}
                                style={{
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 3.84,
                                    elevation: 1
                                }}
                            >
                                <Rdv />
                            </View>)
                        )}
                    </VStack> :
                    actualState !== 1 && !loading ?
                        <VStack>
                        </VStack> :
                        <VStack>
                            <IsLoadingComponent />
                        </VStack>}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    comp1Child1: {

    }
})