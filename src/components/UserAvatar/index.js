import { Avatar } from 'native-base'
import React from 'react'
import { Text, View } from 'react-native'
import colors from '../../constants/colours'
import { styles } from './style'

export default function UserAvatar({ uri, name, email }) {
    return (
        <View style={styles.container}>
            <Avatar bg={colors.primary}
                width={60}
                height={60}
                source={{
                    uri: uri
                }}></Avatar>
            <View style={styles.info}>
                <Text style={styles.nameText}>{name}</Text>
                <Text style={styles.emailText}>{email}</Text>
            </View>
        </View>
    )
}
