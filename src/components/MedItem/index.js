
import React from "react";
import { Box, HStack, Icon, Pressable, Text } from "native-base";
import { FontAwesome, Fontisto, Entypo } from '@expo/vector-icons';
import styles from './style';
import colors from "../../constants/colours";

const MedItem = ({ value, infosPraticien, handleChange, index }) => {
    let isSelected = value === infosPraticien.id;

    const handlePress = () => {
        handleChange('praticien', infosPraticien.id)
    }

    return (
        <Pressable onPress={handlePress}>
            <Box
                ml={index != 0 ? 3 : 0}
                style={{
                    ...styles.medBox,
                    backgroundColor: isSelected ? colors.trans_primary : 'transparent',
                    borderColor: isSelected ? colors.trans_primary : colors.text_grey_hint,
                }}>
                <HStack alignItems={'center'}>
                    <Icon color={colors.primary} as={Fontisto} name='doctor' />
                    <Text ml={1} style={styles.medName}>Dr. {infosPraticien.name}</Text>
                </HStack>
                <HStack mt={1} alignItems={'center'}>
                    <Icon color={colors.primary} as={FontAwesome} name='hospital-o' />
                    <Text ml={1} style={styles.medCenter}>{infosPraticien.center}</Text>
                </HStack>
                <HStack mt={1} alignItems={'center'}>
                    <Icon color={colors.secondary} as={Entypo} name='wallet' />
                    <Text ml={1} style={styles.medTax}>{infosPraticien.cost}FCfa</Text>
                </HStack>
            </Box>
        </Pressable >
    )
}

export default MedItem;