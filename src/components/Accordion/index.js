import { HStack, Icon, Text, Box, VStack, Divider } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import styles from './style';
import colors from '../../constants/colours';

const Accordion = () => {
    const [reveal, setReveal] = React.useState(false);
    let boxStyle = styles.contentBox

    const handleReveal = () => {
        setReveal(!reveal);
    }

    return (
        <Box mb={5} style={styles.container}>
            <HStack px={3} style={styles.header}>
                <Text fontWeight={'bold'}>Comment changer mon mot de passe?</Text>
                <Icon
                    as={MaterialIcons}
                    name={reveal ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    color={colors.black}
                    size='lg'
                    onPress={handleReveal}
                />
            </HStack>
            {reveal && <Divider mb={3} />}
            {reveal &&
                <Box px={3} mb={3} style={styles.contentBox}>
                    Pour changer votre mot de passe, allez dans le menu et sélectionnez un profil. Retapez ensuite votre mot de passe actuel et confirmez.
                </Box>
            }
        </Box>
    )
}

export default Accordion;