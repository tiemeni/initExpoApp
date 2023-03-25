import { Text, Image } from 'react-native'
import React from 'react'
import { CustomHeader } from '../MesRdv'
import { PROFILE } from '../../constants/screens'
import heartBit from "../../assets/img/heart-beat.png"
import { View, VStack } from 'native-base'

const Acceuil = ({ navigation }) => {

  return (
    <View flex={1}>
      <CustomHeader navigation={navigation} screen={PROFILE} />
      <VStack justifyContent={'center'} flex={2}>
        <VStack alignItems={'center'}>
          <Image source={heartBit} style={{ height: 70, width: 70 }} />
          <Text style={{ color: "#999999" }}>Aucune donnée</Text>
        </VStack>
      </VStack>
    </View>
  )
}

export default Acceuil