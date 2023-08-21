import React from "react";
import { Box, Icon, View, Text, HStack, Button, VStack } from "native-base"
import { EvilIcons } from '@expo/vector-icons';
import styles from "./style";
import colors from "../../constants/colours";
import CustomInput from "../../components/CustomInput";
import { TouchableOpacity } from "react-native";


const PhoneConfirm = ({ navigation }) => {

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
                <Text style={styles.message}>nous avons envoyé la vérification du code à votre numéro</Text>
            </VStack>
            <VStack alignItems={'center'} mb={7}>
                <HStack mb={5}>
                    <CustomInput />
                    <CustomInput />
                    <CustomInput />
                    <CustomInput />
                    <CustomInput />
                </HStack>
                <Text style={styles.phoneNumber}>tiemanirocket@gmail.com</Text>
            </VStack>
            <Button mb={4} style={styles.btn}>
                <Text color={colors.white} style={styles.btnLabel}>Renvoyer le code</Text>
            </Button>
            <Button borderWidth={2} style={styles.btn} variant={'outline'}>
                <Text color={colors.primary} style={styles.btnLabel}>Soumettre</Text>
            </Button>

            <Button textDecorationLine={'underline'} mt={'20%'} variant={'unstyled'}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text color={colors.primary} style={styles.btnLabel}>Fermer</Text>
                </TouchableOpacity>
            </Button>

        </View>
    )
}

export default PhoneConfirm;