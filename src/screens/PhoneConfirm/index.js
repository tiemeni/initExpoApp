import React, { useEffect, useState } from "react";
import { Box, Icon, View, Text, HStack, Button, VStack, Input } from "native-base"
import { EvilIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';

import styles from "./style";
import colors from "../../constants/colours";
import CustomInput from "../../components/CustomInput";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { resettingPassword } from "../../redux/User/action";
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';


const CELL_COUNT = 5;

const PhoneConfirm = ({ navigation, route }) => {
    const [borderCol, setBorderCol] = useState(colors.danger)
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const codeVerif = useSelector(state => state.UserReducer.codeVerif)
    const settingPWLoading = useSelector(state => state.UserReducer.settingPWLoading)
    const dispatch = useDispatch()
    const { email } = route?.params;
    const [newPw, setNewPw] = useState('')
    const [loading, setLoading] = useState(false)
    const [caracters, setCaracters] = useState([])
    const [canResetPw, setCanResetPw] = useState(false)
    let verificationCond = caracters == codeVerif?.codeVerif?.split("")
    caracters[1] == codeVerif?.codeVerif?.split("")[1] &&
        caracters[2] == codeVerif?.codeVerif?.split("")[2] &&
        caracters[3] == codeVerif?.codeVerif?.split("")[3] &&
        caracters[4] == codeVerif?.codeVerif?.split("")[4]


    const handleCheck = () => {
        console.log(value, codeVerif.codeVerif)
        if (value == codeVerif?.codeVerif) {
            setBorderCol(colors.success)
            setCanResetPw(true)
        }
    }

    const handleChangeMp = () => {
        console.log('submit')
        dispatch(resettingPassword({ id: codeVerif?.id, password: newPw }))
    }

    useEffect(() => {
        setBorderCol(value == codeVerif?.codeVerif ? colors.success : colors.danger)
    }, [canResetPw, value])

    return (
        <View alignItems={'center'} bg={colors.white} flex={1} p={5}>
            <VStack alignItems={'center'} mb={15}>
                <Box mb={10}>
                    <Box style={styles.circle}>
                        <Icon
                            as={EvilIcons}
                            name="lock"
                            color={colors.white}
                            size={90}
                        />
                    </Box>
                </Box>
                <Text mb={5} style={{
                    paddingTop: 5,
                    fontSize: 25,
                    fontWeight: 700, height: 30,
                }}>Mot de passe oublié</Text>
                <Text style={styles.message}>nous avons envoyé le code de vérification à votre adresse mail</Text>
            </VStack>
            <VStack alignItems={'center'} mb={7}>
                {!canResetPw &&
                    <SafeAreaView style={styles.root}>
                        <CodeField
                            ref={ref}
                            {...props}
                            value={value}
                            onChangeText={setValue}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFiledRoot}
                            keyboardType="ascii-capable"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <Text
                                    key={index}
                                    style={[{ ...styles.cell, borderColor: value && borderCol }, isFocused && { ...styles.focusCell, borderColor: value && borderCol }, { marginRight: 10 }]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            )}
                        />
                    </SafeAreaView>}
                {!canResetPw && <Text style={styles.phoneNumber}>{email ?? ""}</Text>}
                {canResetPw && <Input mx="3" value={newPw} onChangeText={(t) => setNewPw(t)} fontSize={15} placeholder="Nouveau mot de passe" w="90%" borderRadius={25} paddingLeft={5} paddingRight={5} />}
            </VStack>
            <Button
                mb={4}
                style={styles.btn}
                isLoading={settingPWLoading}
                onPress={() => {
                    if (canResetPw) {
                        handleChangeMp()
                    }
                }}>
                <Text color={colors.white} style={styles.btnLabel}>{canResetPw ? "Envoyer" : "Renvoyer le code"}</Text>
            </Button>
            {
                !canResetPw && <Button borderWidth={2} isLoading={loading} style={styles.btn} variant={'outline'} onPress={() => handleCheck()}>
                    <Text color={colors.primary} style={styles.btnLabel}>Soumettre</Text>
                </Button>
            }

            <Button textDecorationLine={'underline'} mt={'20%'} variant={'unstyled'}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text color={colors.primary} style={styles.btnLabel}>Fermer</Text>
                </TouchableOpacity>
            </Button>

        </View >
    )
}

export default PhoneConfirm;