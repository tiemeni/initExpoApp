import React, { useEffect, useState } from "react";
import { Box, Icon, View, Text, HStack, Button, VStack, Input } from "native-base"
import { EvilIcons } from '@expo/vector-icons';
import styles from "./style";
import colors from "../../constants/colours";
import CustomInput from "../../components/CustomInput";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { resettingPassword } from "../../redux/User/action";


const PhoneConfirm = ({ navigation, route }) => {
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

    const handleChange = (v, i) => {
        setCaracters((cs) => {
            cs[i] = v;
            return cs
        })
    }

    const handleCheck = () => {
        if (caracters[0] == codeVerif?.codeVerif?.split('')[0] &&
            caracters[1] == codeVerif?.codeVerif?.split('')[1] &&
            caracters[2] == codeVerif?.codeVerif?.split('')[2] &&
            caracters[3] == codeVerif?.codeVerif?.split('')[3] &&
            caracters[4] == codeVerif?.codeVerif?.split('')[4]) {
            setCanResetPw(true)
        }
    }

    const handleChangeMp = () => {
        console.log('submit')
        dispatch(resettingPassword({ id: codeVerif?.id, password: newPw }))
    }

    useEffect(() => { }, [canResetPw])

    return (
        <View alignItems={'center'} bg={colors.white} flex={1} p={5}>
            <VStack alignItems={'center'} mb={10}>
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
                <Text mb={1} style={styles.title}>Code de vérification</Text>
                <Text style={styles.message}>nous avons envoyé la vérification du code à votre adresse mailI</Text>
            </VStack>
            <VStack alignItems={'center'} mb={7}>
                {!canResetPw && <HStack mb={5}>
                    <CustomInput handleChange={handleChange} index={0} />
                    <CustomInput handleChange={handleChange} index={1} />
                    <CustomInput handleChange={handleChange} index={2} />
                    <CustomInput handleChange={handleChange} index={3} />
                    <CustomInput handleChange={handleChange} index={4} />
                </HStack>}
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
            {!canResetPw && <Button borderWidth={2} isLoading={loading} style={styles.btn} variant={'outline'} onPress={() => handleCheck()}>
                <Text color={colors.primary} style={styles.btnLabel}>Soumettre</Text>
            </Button>}

            <Button textDecorationLine={'underline'} mt={'20%'} variant={'unstyled'}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text color={colors.primary} style={styles.btnLabel}>Fermer</Text>
                </TouchableOpacity>
            </Button>

        </View>
    )
}

export default PhoneConfirm;