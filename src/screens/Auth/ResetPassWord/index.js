import { Box, Center, Image, Text } from 'native-base';
import React from 'react';
import Logo from '../../../assets/img/logo.png';
import PrimaryButton from '../../../components/Buttons/PrimaryButton';
import colors from '../../../constants/colours';
import SCREENS from '../../../constants/screens';
import styles from './styles';

const ResetPassWord = ({ navigation }) => {

    const numero = '6 55 26 15 79'
    return (
        <Box flex={1}>
            <Center flex={1}>
                <Box style={styles.widthItem}>
                    <Box marginLeft={8} width={'100%'} >
                        <Image
                            source={Logo}
                            size={'xl'}
                            resizeMode={'contain'}
                            width={'85%'}
                            alt="logo"

                        />
                    </Box>
                    <Text style={styles.textNumber} fontSize="sm" width={'100%'}>Contactez nous via : {numero}</Text>
                    <PrimaryButton
                        style={styles.btn}
                        title="WhatApps"
                        isLoadingText="En Cours..."
                        color={colors.primaryColor}
                        mb={5}
                    />
                    <PrimaryButton
                        style={styles.btn}
                        title="Appel"
                        isLoadingText="En Cours..."
                        color={colors.primaryColor}

                        onPress={() => navigation.navigate(SCREENS.SIGNUP)}
                    />
                </Box>
            </Center>
        </Box>

    );
};
export default ResetPassWord;
