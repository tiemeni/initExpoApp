import { React } from 'react';
import { Box, HStack, Text, VStack, Icon, Pressable, Avatar } from 'native-base';
import { Entypo, Fontisto } from '@expo/vector-icons';
import colors from "../../constants/colours";
import styles from "./style";
import { Image } from 'react-native';
import * as SCREENS from "../../constants/screens";
import { useNavigation } from '@react-navigation/native';




const MedCard = ({ praticien }) => {
    const navigation = useNavigation()
    return (
        <VStack space={3} flex={1} style={styles.medBox}>
            <Box style={styles.medPic}>
            </Box>

            <VStack>
                <HStack mt={1}>
                    <Icon
                        color={colors.primary}
                        as={<Fontisto name="doctor" />}
                        size='md'
                        style={styles.icon}
                    />
                    <Text style={styles.medName}>Dr {praticien.name}</Text>
                </HStack>
                <HStack mt={4}>
                    <Icon
                        color={colors.text_grey_hint}
                        as={<Entypo name="location-pin" />}
                        size='md'
                        style={styles.icon}
                    />
                    <Text style={styles.location}>{"lskdlskdlk"}</Text>
                </HStack>
                <HStack mt={2}>
                    <Icon
                        color={colors.secondary}
                        as={<Entypo name="wallet" />}
                        size='md'
                        style={styles.icon}
                    />
                    <Text style={styles.tarif}>A partir de {praticien.cost ?? "5000"} Fcfa</Text>
                </HStack>

                <Pressable style={styles.rdvBtn} onPress={() => navigation.navigate(SCREENS.MAKE_APPOINTMENT_SCREEN, { idp: praticien?.id })}>
                    <Text color={colors.white}>Prendre un RDV</Text>
                </Pressable>
            </VStack>
        </VStack>
    )
}

export default MedCard;