import { View } from 'native-base'
import React from 'react'
import { Image, Text } from 'react-native'
import user from "../../assets/img/account.png"
import { styles } from './style'

export default function ParameterList({ image, label }) {
    return (
        <View style={styles.container}>
            <Image source={user} style={styles.image} />
            <Text style={styles.label}>{label}</Text>
        </View>
    )
}
