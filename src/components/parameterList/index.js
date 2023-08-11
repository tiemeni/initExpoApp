import { View, Icon, HStack } from 'native-base'
import React from 'react'
import {Text} from 'react-native'
import { styles } from './style'
import colors from '../../constants/colours'
import { AntDesign } from '@expo/vector-icons';

export default function ParameterList({ label, icon }) {
    return (
        <View style={styles.container}>
            <HStack space={3} style={styles.subContainer}>
                <Icon as={icon} color={colors.primary} size={6}/>
                <Text style={styles.label}>{label}</Text>
            </HStack>
            <View>
             <Icon as={<AntDesign name='right'/>} color={colors.black} size={4}/>
            </View>
        </View>
    )
}
