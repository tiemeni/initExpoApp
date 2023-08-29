import { View, Icon, HStack } from 'native-base'
import React from 'react'
import {Text} from 'react-native'
import { styles } from './style'
import colors from '../../constants/colours'
import {ArrowRight2} from 'iconsax-react-native'


export default function ParameterList({ label, icon }) {
    return (
        <View style={styles.container}>
            <HStack space={3} style={styles.subContainer}>
                <Icon as={icon} color={colors.black} size={6}/>
                <Text style={styles.label}>{label}</Text>
            </HStack>
            <View>
             <Icon as={<ArrowRight2 />} color={colors.black} size={4}/>
            </View>
        </View>
    )
}
