import { View } from 'native-base'
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import Header from '../../components/Header'
import ParameterList from '../../components/parameterList/'
import UserAvatar from '../../components/UserAvatar'
import styles from "./styles"
import * as SCREENS from '../../constants/screens'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../../redux/User/action'
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next'

function Profile() {

  const translate = useTranslation().t
  const user = useSelector(state => state.UserReducer.userInfos)
  const navigation = useNavigation()
  const dispatch = useDispatch()


  return (
    <View style={{ ...styles.contenair }}>
      <Header title={"A propos de votre compte"} />
      <View style={{ ...styles.section1 }}>
        {/* <View style={styles.section1of1}>
          
        </View> */}
        <View style={{ ...styles.section2of1, }}>
          <UserAvatar
            uri={user?.user?.photo}
            name={user?.user?.name ?? ""}
            email={user?.user?.email ?? ""}
          />
        </View>
      </View>
      <View style={styles.section2}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(SCREENS.MON_PROFILE)}>
          <ParameterList icon={<Ionicons name='person' />} label={translate("TEXT.MY_PROFILE")} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.SETTINGS)}
          style={styles.item}>
          <ParameterList icon={<Ionicons name='settings' />} label={"Parametres"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(SCREENS.TrANSACTION)}>
          <ParameterList icon={<Ionicons name='ios-document-text' />} label={"Historique de transaction"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(SCREENS.FAQ_SCREEN)}>
          <ParameterList icon={<Entypo name='chat' />} label={"FAQ et Assistance"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.ABOUT_US)} style={styles.item}>
          <ParameterList icon={<Ionicons name='information-circle' />} label={"A propos"} />
        </TouchableOpacity>
      </View>
      <View style={styles.section3}>
        <TouchableOpacity onPress={() => dispatch(userLogout())} style={{ ...styles.item, height: "50%" }}>
          <ParameterList icon={<MaterialCommunityIcons name='logout' />} label={"Deconnexion"} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profile