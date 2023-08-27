import { VStack, View } from 'native-base'
import React, { useState } from 'react'
import { Text, TouchableOpacity, Alert } from 'react-native'
import Header from '../../components/Header'
import ParameterList from '../../components/parameterList/'
import UserAvatar from '../../components/UserAvatar'
import styles from "./styles"
import * as SCREENS from '../../constants/screens'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../../redux/User/action'
import { useTranslation } from 'react-i18next'
import { User, Setting2, TableDocument, Messages3, InfoCircle, Logout } from 'iconsax-react-native'

function Profile() {
  const [tryLogout, setTryLogout] = useState()
  const translate = useTranslation().t
  const user = useSelector(state => state.UserReducer.userInfos)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  if (tryLogout) {
    Alert.alert(
      translate("TEXT_LOGOUT_TITLE"),
      translate("TEXT_TRYNG_LOGOUT"),
      [
        {
          text: translate("TEXT_CONTINUE"), 
          style: "destructive",
          onPress: () => {
            dispatch(userLogout())
            setTryLogout(false);
          }
        },
        { text: translate("TEXT_ABORT"), onPress: () => setTryLogout(false) }
      ]
    )
  }


  return (
    <View style={{ ...styles.contenair }}>
      <Header title={"A propos de votre compte"} />
      <View style={{ ...styles.section1 }}>
        <View style={{ ...styles.section2of1, }}>
          <UserAvatar
            uri={user?.user?.photo}
            name={user?.user?.name ?? ""}
            email={user?.user?.email ?? ""}
          />
        </View>
      </View>
      <VStack style={styles.section2} space={2}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(SCREENS.MON_PROFILE)}>
          <ParameterList icon={<User />} label={translate("TEXT.MY_PROFILE")} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.SETTINGS)}
          style={styles.item}>
          <ParameterList icon={<Setting2 name='settings' />} label={"Parametres"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(SCREENS.TrANSACTION)}>
          <ParameterList icon={<TableDocument />} label={"Historique de transaction"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate(SCREENS.FAQ_SCREEN)}>
          <ParameterList icon={<Messages3 />} label={"FAQ et Assistance"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(SCREENS.ABOUT_US)} style={styles.item}>
          <ParameterList icon={<InfoCircle />} label={"A propos"} />
        </TouchableOpacity>
      </VStack>
      <View style={styles.section3}>
        <TouchableOpacity onPress={() => setTryLogout(true)} style={{ ...styles.item, height: "50%" }}>
          <ParameterList icon={<Logout />} label={"Se Déconnecter"} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profile