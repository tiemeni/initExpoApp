import { Divider, View } from 'native-base'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Header from '../../components/Header'
import ParameterList from '../../components/parameterList/'
import UserAvatar from '../../components/UserAvatar'
import styles from "./styles"

function Profile() {
  return (
    <View style={{ ...styles.contenair }}>
      <View style={styles.section1}>
        <View style={styles.section1of1}>
          <Header title={'Configuration de compte'} />
        </View>
        <View style={{ ...styles.section2of1, paddingLeft: 15 }}>
          <UserAvatar
            uri={"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"}
            name={'Tiemeni Hapi'}
            email={"tiemanirocket@gmail.com"}
          />
        </View>
      </View>
      <View style={styles.section2}>
        <TouchableOpacity style={styles.item}>
          <ParameterList label={"Mon Profile"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <ParameterList label={"Parametres"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <ParameterList label={"Historique de transaction"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <ParameterList label={"FAQ et Assistance"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <ParameterList label={"A propos"} />
        </TouchableOpacity>
      </View>
      <View style={styles.section3}>
        <TouchableOpacity style={{ ...styles.item, height: "50%" }}>
          <ParameterList label={"Deconnexion"} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profile