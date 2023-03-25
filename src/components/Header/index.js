import { useNavigation } from '@react-navigation/native'
import { View } from 'native-base'
import React from 'react'
import { Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import back from "../../assets/img/back.png"
import { styles } from './style'

export default function Header({ title, bg }) {
    const navigation = useNavigation();
    return (
        <View style={{ ...styles.constainer, backgroundColor: bg ?? null }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={back} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}
