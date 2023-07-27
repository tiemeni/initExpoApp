import { Divider, View } from 'native-base'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Header from '../../components/Header'
import UserAvatar from '../../components/UserAvatar'
import styles from "./styles"
import * as SCREENS from '../../constants/screens'
import { useNavigation } from '@react-navigation/native'
import settingIcon from "../../assets/img/settings.png"
import user from "../../assets/img/user.png"
import file from "../../assets/img/file.png"
import faq from "../../assets/img/faq.png"
import about from "../../assets/img/about.png"
import logout from "../../assets/img/logout.png"
import Settings from '../../components/settings'

const Parametres =()=> {
  const navigation = useNavigation()
  return (
    <View style={{ ...styles.contenair }}>
      <Header title={"Paramètres"} />
      <View style={{ ...styles.section1 }}>
        {/* <View style={styles.section1of1}>
          
        </View> */}
        <View style={{ ...styles.section2of1, }}>
          <UserAvatar
            uri={"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"}
            name={'Tiemeni Hapi'}
            email={"tiemanirocket@gmail.com"}
          />
        </View>
      </View>
      <View style={styles.section2}>
          <Settings label={"Choix de la langue"} />
          <Settings label={"Recevoir les rappels de rendez-vous"} icon={settingIcon} />
          <Settings icon={file} label={"Recevoir les newsletters"} />
          <Settings icon={faq} label={"Partager mes informations entre mes centres"} />
          <Settings icon={about} label={"Recevoir des notifications des tiers partenaires des centres"}/>
      </View>
    </View>
  )
}

export default Parametres