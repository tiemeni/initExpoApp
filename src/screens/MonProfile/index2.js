import { Avatar, ScrollView, View, VStack } from 'native-base'
import React from 'react'
import { useState } from 'react'
import { Image, Platform, Pressable, StyleSheet, Text, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RadioButton } from 'react-native-paper'
import Header from '../../components/Header'
import colors from '../../constants/colours'
import { styles } from './style'
import plus from "../../assets/img/edit.png"
import tick from "../../assets/img/tick.png"

const IS_ANDROID = Platform.OS === "android"

const style = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        position: "absolute",
        bottom: 30,
        right: 30,
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: 60,
        height: 60
    },
    title: {
        width: 20,
        height: 20
    },
});

const FAB = (props) => {
    console.log(props)
    return (
        <Pressable style={{ ...style.container, backgroundColor: props.OnBoarding ? "white" : colors.primary }}>
            <TouchableOpacity onPress={props.onPress}>
                <Image style={style.title} source={props.editeMode ? plus : tick} />
            </TouchableOpacity>
        </Pressable >
    );
};

export const CustomeFab = (props) => {
    return <FAB title="hey" onPress={props.action} onBoarding={props.onBoarding} editeMode={props.editeMode} />
}

export default function MonProfile2() {
    const [editeMode, setEditeMode] = useState(true)


    return (
        <View flex={1} style={{ backgroundColor: "white" }}>
            <ScrollView>
                <View height={30}>
                    <Header />
                </View>
                <VStack>
                    <View
                        height={120}
                        borderColor={'blue'}
                        justifyContent={'center'}
                        alignItems={'center'}>
                        <Avatar
                            bg={colors.bg_grey}
                            width={92}
                            height={92}
                            source={{
                                uri: null
                            }}></Avatar>
                    </View>
                    <View
                        height={25}
                        alignItems={'center'}
                        mb={5}
                    >
                        <View style={{
                            backgroundColor: 'rgba(240, 240, 240, 0.69)',
                            display: "flex",
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: "100%",
                            width: "90%",
                            borderRadius: 10,
                            paddingLeft: 10
                        }}>
                            <Text style={{
                                lineHeight: 19.36,
                                fontSize: 17,
                                fontWeight: "bold"
                            }}>Détail de base</Text>
                        </View>
                    </View>
                    <View
                        width={"100%"}
                        marginBottom={5}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <View width={"85%"} mb={5}>
                            <Text style={{ marginBottom: 5, fontSize: 14, color: "#626262" }}>Nom(s) et prenom(s)</Text>
                            <TextInput
                                isInvalid={true}
                                placeholderTextColor={'#343434'}
                                style={{
                                    borderRadius: 5,
                                    backgroundColor: "white",
                                    borderWidth: 1,
                                    borderColor: "#F0F0F0",
                                    padding: 10,
                                    height: 45,
                                    fontSize: 15
                                }}
                                placeholder="Tiemani hapi christian"
                                underlineColor="transparent"
                                keyboardType="default"
                                selectionColor={colors.primary}
                                activeUnderlineColor="transparent"
                                value={""}
                            />
                        </View>
                        <View width={"85%"} mb={4}>
                            <Text style={{ marginBottom: 5, fontSize: 14, color: "#626262" }}>Date de naissance</Text>
                            <TextInput
                                isInvalid={true}
                                placeholderTextColor={'#343434'}
                                style={{
                                    borderRadius: 5,
                                    backgroundColor: "white",
                                    borderWidth: 1,
                                    borderColor: "#F0F0F0",
                                    padding: 10,
                                    height: 45,
                                    fontSize: 15
                                }}
                                placeholder="17 Decembre 2004"
                                underlineColor="transparent"
                                keyboardType="default"
                                selectionColor={colors.primary}
                                activeUnderlineColor="transparent"
                                value={""}
                            />
                        </View>
                        <View
                            width={"95%"}
                            mt={2}
                            justifyContent={'center'}
                            alignItems={'center'}>
                            <View style={{ width: "90%", }}>
                                <Text style={{ marginBottom: 2, color: "#626262" }}>Sexe</Text>
                                <View style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                }}>
                                    <View style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: "center",
                                        borderWidth: 1,
                                        width: "40%",
                                        height: 45,
                                        padding: 5,
                                        borderRadius: 10,
                                        borderColor: "#F0F0F0"
                                    }}>
                                        <RadioButton.Android
                                            style={{ height: 100 }}
                                            uncheckedColor={"#F0F0F0"}
                                            color={colors.primary}
                                            value="first"
                                            status={"checked"}
                                        />
                                        <Text style={{ fontSize: 15, color: "#343434" }}>Homme</Text>
                                    </View>
                                    <View style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: "center",
                                        borderWidth: 1,
                                        width: "40%",
                                        height: 45,
                                        padding: 5,
                                        borderRadius: 10,
                                        borderColor: "#F0F0F0"
                                    }}>
                                        <RadioButton.Android
                                            style={{ height: 100 }}
                                            uncheckedColor={"#F0F0F0"}
                                            color={colors.primary}
                                            value="first"
                                            status={"checked"}
                                        />
                                        <Text style={{ fontSize: 15, color: "#343434" }}>Femme</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View height={25} alignItems={'center'} mt={11} mb={5}>
                        <View style={{
                            backgroundColor: 'rgba(240, 240, 240, 0.69)',
                            display: "flex",
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: "90%",
                            height: "100%",
                            borderRadius: 10,
                            paddingLeft: 10
                        }}>
                            <Text style={{
                                lineHeight: 19.36,
                                fontSize: 17,
                                fontWeight: "bold"
                            }}>Coordonnées</Text>
                        </View>
                    </View>
                    <View mb={5}>
                        <View
                            width={"100%"}
                            marginBottom={11}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <View width={"85%"} mb={5}>
                                <Text style={{ marginBottom: 5, fontSize: 14, color: "#626262" }}>Adresse mail</Text>
                                <TextInput
                                    isInvalid={true}
                                    placeholderTextColor={'#343434'}
                                    style={{
                                        borderRadius: 5,
                                        backgroundColor: "white",
                                        borderWidth: 1,
                                        borderColor: "#F0F0F0",
                                        padding: 10,
                                        height: 45,
                                        fontSize: 15
                                    }}
                                    placeholder="tiemanirocket@gmail.com"
                                    underlineColor="transparent"
                                    keyboardType="default"
                                    selectionColor={colors.primary}
                                    activeUnderlineColor="transparent"
                                    value={""}
                                />
                            </View>
                            <View width={"85%"}>
                                <Text style={{ marginBottom: 5, fontSize: 14, color: "#626262" }}>Numero de telephone</Text>
                                <TextInput
                                    isInvalid={true}
                                    placeholderTextColor={'#343434'}
                                    style={{
                                        borderRadius: 5,
                                        backgroundColor: "white",
                                        borderWidth: 1,
                                        borderColor: "#F0F0F0",
                                        padding: 10,
                                        height: 45,
                                        fontSize: 15,
                                    }}
                                    placeholder="+237658686162"
                                    underlineColor="transparent"
                                    keyboardType="default"
                                    selectionColor={colors.primary}
                                    activeUnderlineColor="transparent"
                                    value={""}
                                />
                            </View>
                        </View>
                    </View>
                    {/* <VStack style={styles.child4}>
                        <View style={{
                            display: "flex",
                            width: "90%",
                            borderRadius: 10,
                            height: 50,
                            marginBottom: 15,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: colors.primary
                        }}>
                            <TouchableOpacity>
                                <Text style={{ fontSize: 17, color: "white" }}>Enregistrer</Text>
                            </TouchableOpacity>
                        </View>
                    </VStack> */}
                </VStack >
            </ScrollView>
            <CustomeFab editeMode={editeMode} action={() => {
                setEditeMode(v => !v)
            }} />
        </View >
    )
}
