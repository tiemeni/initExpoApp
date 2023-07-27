import { Divider, View } from 'native-base'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Header from '../../components/Header'
import ParameterList from '../../components/parameterList/'
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

function Profile() {
  const navigation = useNavigation()
  return (
    <View style={{ ...styles.contenair }}>
      <Header title={"A propos de votre compte"} />
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
        <TouchableOpacity style={styles.item} icon={user} onPress={() => navigation.navigate(SCREENS.MON_PROFILE)}>
          <ParameterList label={"Mon Profile"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>navigation.navigate(SCREENS.SETTINGS)}
          style={styles.item}>
          <ParameterList label={"Parametres"} icon={settingIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(SCREENS.TrANSACTION)}>
          <ParameterList icon={file} label={"Historique de transaction"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(SCREENS.FAQ_SCREEN)}>
          <ParameterList icon={faq} label={"FAQ et Assistance"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <ParameterList icon={about} label={"A propos"} />
        </TouchableOpacity>
      </View>
      <View style={styles.section3}>
        <TouchableOpacity onPress={()=>navigation.navigate(SCREENS.LOGIN)} style={{ ...styles.item, height: "50%" }}>
          <ParameterList icon={logout} label={"Deconnexion"} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profile