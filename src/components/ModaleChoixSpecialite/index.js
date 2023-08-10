import { View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Dialog, RadioButton } from 'react-native-paper'
import { Box, Button, Icon, Text } from 'native-base'
import styles from './style'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import colors from '../../constants/colours'
import { useDispatch } from 'react-redux'
import { setProfessionForRdv, setShouldSeeBehind } from '../../redux/commons/action'



export default function ModaleChoixProfession({ navigation }) {

    const [isSpecialiste, setIsSpecialiste] = useState(true)
    const [visible, setVisible] = React.useState(true);
    const hideDialog = () => setVisible(false);
    const dispatch = useDispatch()

    return (
        <Dialog
            visible={visible}
            style={{ ...styles.dialog, borderRadius: 5, backgroundColor: colors.white, }}
            onDismiss={hideDialog}>
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
                                        status={isSpecialiste ? "unchecked" : "checked"}
                                        onPress={() => setIsSpecialiste(false)}
                                    />
                                    <Text style={{ fontSize: 15 }}>Généraliste</Text>
                                </View>
                                <View style={{ ...styles.radio }}>
                                    <RadioButton.Android
                                        style={{ height: 100 }}
                                        uncheckedColor={"#F0F0F0"}
                                        color={colors.primary}
                                        value="first"
                                        status={isSpecialiste ? "checked" : "unchecked"}
                                        onPress={() => setIsSpecialiste(true)}
                                    />
                                    <Text style={{ fontSize: 15 }}>Spécialiste</Text>
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
                    }}>
                        <Text color={colors.white} style={styles.btnLabel}>Continuer</Text>
                    </Button>
                </Box>
            </Dialog.Content>
        </Dialog>
    )
}