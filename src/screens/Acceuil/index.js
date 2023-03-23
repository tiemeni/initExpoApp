import { View, Text } from 'react-native'
import React from 'react'
import { CustomHeader } from '../MesRdv'
import { ACCEUIL, PROFILE } from '../../constants/screens'

const Acceuil = ({ navigation }) => {
  return (
    <View>
      <CustomHeader navigation={navigation} screen={PROFILE} />
      <Text>Acceuil</Text>
    </View>
  )
}

export default Acceuil