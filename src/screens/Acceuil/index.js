import { View, Text } from 'react-native'
import React from 'react'
import { CustomHeader } from '../MesRdv'

const Acceuil = ({ navigation }) => {
  return (
    <View>
      <CustomHeader navigation={navigation} />
      <Text>Acceuil</Text>
    </View>
  )
}

export default Acceuil