import { Avatar, ScrollView, View, VStack } from 'native-base'
import React from 'react'
import { Text, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RadioButton } from 'react-native-paper'
import Header from '../../components/Header'
import colors from '../../constants/colours'
import { styles } from './style'

export default function MonProfile2() {
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
                            width={90}
                            height={90}
                            source={{
                                uri: null
                            }}></Avatar>
                    </View>
                    <View
                        height={25}
                        alignItems={'center'}
                        mb={3}
                    >
                        <View style={{
                            backgroundColor: 'rgba(240, 240, 240, 0.69)',
                            display: "flex",
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: "100%",
                            width: "90%",
                            borderRadius: 10,
                            paddingLeft: 20
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
                        marginBottom={0}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <View width={"90%"} mb={4}>
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
                        <View width={"90%"}>
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
                            width={"100%"}
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
                    <View height={25} alignItems={'center'} mt={11} mb={3}>
                        <View style={{
                            backgroundColor: 'rgba(240, 240, 240, 0.69)',
                            display: "flex",
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: "90%",
                            height: "100%",
                            borderRadius: 10,
                            paddingLeft: 20
                        }}>
                            <Text style={{
                                lineHeight: 19.36,
                                fontSize: 17,
                                fontWeight: "bold"
                            }}>Coordonnées</Text>
                        </View>
                    </View>
                    <View mb={2}>
                        <View
                            width={"100%"}
                            marginBottom={11}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <View width={"90%"} mb={2}>
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
                            <View width={"90%"}>
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
                    <VStack style={styles.child4}>
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
                    </VStack>
                </VStack >
            </ScrollView>
        </View >
    )
}
