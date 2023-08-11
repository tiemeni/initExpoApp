import { View, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Dialog, RadioButton } from 'react-native-paper'
import { Box, Button, Icon, Text } from 'native-base'
import styles from './style'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import colors from '../../constants/colours'
import { useDispatch, useSelector } from 'react-redux'
import { setProfessionForRdv, setShouldSeeBehind } from '../../redux/commons/action'
import { getProfession } from '../../redux/professions/actions'
import { getMotifs, getSpecialities, setRDVForm } from '../../redux/RDV/actions'


const searchByName = (tab, val) => {
    let id = ""
    tab.forEach(element => {
        if (element.name === val) {
            console.log(element._id)
            id = element._id
        }
    });
    return id
}


export default function ModaleChoixProfession({ navigation }) {

    const [isSpecialiste, setIsSpecialiste] = useState(false)
    const [visible, setVisible] = React.useState(true);
    const professions = useSelector(state => state.Profession.professions)
    console.log(isSpecialiste)
    const hideDialog = () => setVisible(false);
    const dispatch = useDispatch()

    return (
        <Dialog

            visible={visible}
            style={{ ...styles.dialog, borderRadius: 5, backgroundColor: colors.white, }}
        // onDismiss={hideDialog}
        >
            <Dialog.Content style={{ ...styles.dialogContent }}>
                <Box style={{ ...styles.boxCloseIconDialogContainer }}>
                    <Box></Box>
                    <Box style={{ ...styles.boxCloseIconDialog }}>
                        <Pressable onPress={() => navigation.goBack()}>
                            <Icon
                                as={AntDesign}
                                name='close'
                                size={'sm'}
                                color={colors.black}
                            />
                        </Pressable>
                    </Box>
                </Box>
                <Text variant="bodyMedium"
                    textAlign={'center'}
                    fontSize={'15'}
                    fontWeight={'bold'}>Choisissez une profession pour votre RDV</Text>
                <Box marginBottom={10}>
                    <View style={{ ...styles.radioContainer }}>
                        <View style={{ width: "100%", }}>
                            <View style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "column",
                            }}>
                                <View style={{ ...styles.radio }}>
                                    <RadioButton.Android
                                        style={{ height: 100 }}
                                        uncheckedColor={"#F0F0F0"}
                                        color={colors.primary}
                                        value="first"
                                        status={isSpecialiste ? "checked" : "unchecked"}
                                        onPress={() => setIsSpecialiste(true)}
                                    />
                                    <Text style={{ fontSize: 15 }}>{professions[0]?.name}</Text>
                                </View>
                                <View style={{ ...styles.radio }}>
                                    <RadioButton.Android
                                        style={{ height: 100 }}
                                        uncheckedColor={"#F0F0F0"}
                                        color={colors.primary}
                                        value="first"
                                        status={isSpecialiste ? "unchecked" : "checked"}
                                        onPress={() => setIsSpecialiste(false)}
                                    />
                                    <Text style={{ fontSize: 15 }}>{professions[1]?.name}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Box>
                <Box>
                    <Button width={"100%"} onPress={() => {
                        setVisible(false)
                        dispatch(setProfessionForRdv(isSpecialiste))
                        dispatch(setShouldSeeBehind(true))
                        dispatch(setRDVForm(
                            {
                                motif: null,
                                praticien: null,
                                profession: isSpecialiste ? searchByName(professions, "Specialiste") : searchByName(professions, "Generaliste"),
                                period: {
                                    day: null,
                                    time: null
                                }
                            }
                        ))
                        console.log(isSpecialiste, isSpecialiste ? searchByName(professions, "Specialiste") : searchByName(professions, "Generaliste"))
                        isSpecialiste && dispatch(getSpecialities(searchByName(professions, "Specialiste"))) && console.log("special")
                        !isSpecialiste && dispatch(getMotifs({ id: searchByName(professions, "Generaliste") })) && console.log("gene")
                    }}>
                        <Text color={colors.white} style={styles.btnLabel}>Continuer</Text>
                    </Button>
                </Box>
            </Dialog.Content>
        </Dialog>
    )
}