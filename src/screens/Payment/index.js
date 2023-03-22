import { Box, Button, Center, HStack, Image, Input, ScrollView, Text, VStack } from "native-base";
import React from "react";
import styles from "./style";
import visaUrl from '../../assets/img/visa.png'
import colors from "../../constants/colours";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Header from "../../components/Header";
import MaskInput from 'react-native-mask-input';

const description = "Votre compte sera débité d’un montant de 5000 Fcfa. Le dit montant fait office de frais de rendez-vous et est non-remboursable."
const creditCardMask = [/\d/, /\d/, /\d/, /\d/, " ",[/\d/], [/\d/], [/\d/], [/\d/], " ", [/\d/], [/\d/], [/\d/], [/\d/], " ", /\d/, /\d/, /\d/, /\d/];
const expirationMask = [/\d/, /\d/, "/", /\d/, /\d/];


const Payment = () => {
    const [formData, setFormData] = React.useState({
        name: null,
        cardNumber: null,
        expirationDate: null,
        securityCode: null
    })

    const handleChange = (trigger, value) => {
        switch (trigger) {
            case 'name':
                setFormData({
                    ...formData,
                    name: value
                })
                break;
            case 'cardNumber':
                console.log(value, 'card')
                setFormData({
                    ...formData,
                    cardNumber: value
                })
                break;
            case 'expiration':
                setFormData({
                    ...formData,
                    expirationDate: value
                })
                break;
            case 'securityCode':
                setFormData({
                    ...formData,
                    securityCode: value
                })
                break;
            default:
                break;
        }
    }

    return (
        <>
            <Header title={'Paiement'} />
            <ScrollView showsVerticalScrollIndicator={false} flex={1} style={styles.container} automaticallyAdjustKeyboardInsets={true}>
                <VStack style={styles.infoBox}>
                    <Text style={styles.boxTitle}>Important</Text>
                    <Text style={styles.descText}>{description}</Text>
                    <Text style={styles.warningText}>Vous recevrez un message de confirmation à la fin de l’opération.</Text>
                </VStack>
                <VStack style={styles.paymentBox}>
                    <Box style={styles.titleBox}>
                        <Text style={styles.paymentTitle}>Choisir une méthode de paiement</Text>
                        <Text style={styles.titleHelper}>Vous serez débité dès la validation de cette étape.</Text>
                    </Box>
                    <Box style={styles.paymentMethodBox}>
                        <ScrollView style={styles.scrollView} showsHorizontalScrollIndicator={false} horizontal={true}>
                            <Center style={styles.paymentMethod}>
                                <Pressable onPress={() => console.log("Pressed")}>
                                    <Image source={visaUrl} alt="visa" size={"xs"} />
                                </Pressable>
                            </Center>
                        </ScrollView>
                    </Box>
                    <VStack style={styles.cardInfos}>
                        <Box>
                            <Text style={styles.inputLabel}>Nom sur la carte</Text>
                            <Input variant={"unstyled"} value={formData.name} onChangeText={(v) => handleChange('name', v)} style={styles.input} size={'lg'} placeholder="Luc Skywalker" />
                        </Box>
                        <Box style={styles.inputBox}>
                            <Text style={styles.inputLabel}>Numéro de carte</Text>
                            <MaskInput
                                value={formData.cardNumber}
                                mask={creditCardMask}
                                showObfuscatedValue
                                obfuscationCharacter="#"
                                onChangeText={(v) => handleChange('cardNumber', v)}
                                style={{...styles.input, paddingLeft: 10}} 
                                size={'lg'} 
                                placeholder="#### #### #### ####"
                            />
                        </Box>
                        <HStack justifyContent={'space-between'}>
                            <Box style={{ ...styles.inputBox, width: '48%' }}>
                                <Text style={styles.inputLabel}>Date d'expiration</Text>
                                <MaskInput
                                    value={formData.cardNumber}
                                    mask={expirationMask}
                                    showObfuscatedValue
                                    obfuscationCharacter="#"
                                    onChangeText={(v) => handleChange('expiration', v)}
                                    style={{...styles.input, paddingLeft: 10}}
                                    size={'lg'}
                                    placeholder="MM/YY"
                                />
                            </Box>
                            <Box style={{ ...styles.inputBox, width: '48%' }}>
                                <Text style={styles.inputLabel}>Code de sécurité</Text>
                                <Input variant={"unstyled"} onChangeText={(v) => handleChange('securityCode', v)} style={styles.input} size={'lg'} placeholder="CVC" />
                            </Box>
                        </HStack>
                    </VStack>
                </VStack>
                <VStack flex={1} style={styles.btnBox}>
                    <Button style={styles.btn}>
                        <Text color={colors.white} style={styles.btnLabel}>Confirmer et Continuer</Text>
                    </Button>
                </VStack>
            </ScrollView>
        </>
    )
}

export default Payment;