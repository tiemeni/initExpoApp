import { useNavigation } from '@react-navigation/native'
import { View , Icon} from 'native-base'
import React from 'react'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styles } from './style'
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../../constants/colours'

export default function Header({ title, bg }) {
    const navigation = useNavigation();
    return (
        <View style={{ ...styles.constainer, backgroundColor: bg ?? colors.white }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon color={colors.black} size={8} as={<MaterialIcons name="keyboard-backspace"/>} style={styles.image} />
            </TouchableOpacity>
            <View justifyContent={'center'} alignItems={'center'} alignContent={'center'} width={'80%'}>
            <Text style={styles.title}>{title}</Text>
            </View>
        </View>
    )
}