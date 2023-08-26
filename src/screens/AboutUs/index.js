import { ScrollView, View } from "native-base";
import React from "react";
import { TouchableOpacity, Image, Platform, Linking, Share } from "react-native";
import Header from "../../components/Header";
import styles from "./styles";
import * as SCREENS from "../../constants/screens";
import { useNavigation } from "@react-navigation/native";
import {  Entypo, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import ItemAboutUs from "../../components/ItemAboutUs";
import logo from "../../assets/img/hospi-rdv__9_-removebg-preview.png"

function AboutUs() {
  const translate = useTranslation().t;
  const navigation = useNavigation();


  const openAppStoreOrPlayStore = () => {
    const storeURL = Platform.OS === "ios"
      ? "https://apps.apple.com/us/app/facebook/id284882215"
      : "https://play.google.com/store/apps/details?id=com.facebook.katana&hl=en&gl=US";
      
    Linking.openURL(storeURL);
  };

  const shareApp = () => {
    Share.share({
      message: "Découvrez cette superbe application de prise de rendez-vous médical!",
      url: "https://link-to-your-app",
      title: "GatewaysDoc Healty",
    });
  };

  const openTelegram = () => {
    Linking.openURL("https://t.me/+N2wclwqKJTZIOGY0");
  };
  return (
    <View style={{ ...styles.contenair }}>
      <Header title={"A Propos"} />
      <ScrollView height={'100%'}>
      <View style={{ ...styles.section1 }}>
        <View alignItems={"center"} justifyItems={'center'} justifyContent={'center'} width={'100%'}>
         {<Image style={{height:150, width:150}} source={logo}/>} 
        </View>
      </View>
      <View mb={3} style={styles.section2}>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.RDV)}
          style={styles.item}
        >
          <ItemAboutUs
            icon={<Entypo name="text-document" />}
            tilte={translate("TEXT_APP_NAME")}
            description={
              "Prenez votre rendez-vous, à tout moment et en tout lieu, en toute simplicité"
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={openAppStoreOrPlayStore}
        >
          <ItemAboutUs
            icon={<AntDesign name="star" />}
            tilte={translate("TEXT_RATING")}
            description={"Vous aimez cette application ? dites-nous sur PlayStore ou AppStore comment nous pouvons l'améliorer"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={shareApp}
        >
          <ItemAboutUs
            icon={<Entypo name="share" />}
            tilte={translate("TEXT_SHARE")}
            description={"Partager application avec vos amis et votre famille"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={openTelegram}
        >
          <ItemAboutUs
            icon={<FontAwesome5 name="users" />}
            tilte={translate("TEXT_CREW")}
            description={"Chattez avec notre équipe en rejoignant le canal télégram"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.CGU)}
          style={styles.item}
        >
          <ItemAboutUs
            icon={<Entypo name="text-document" />}
            tilte={translate("TEXT.CGU")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.POLICY)}
          style={styles.item}
        >
          <ItemAboutUs
            icon={<Entypo name="text-document" />}
            tilte={translate("TEXT.CONFIDENTIAL_TEXT")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.LICENSES)}
          style={styles.item}
        >
          <ItemAboutUs
            icon={<Entypo name="text-document" />}
            tilte={translate("Licenses et remerciements")}
          />
          </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
}

export default AboutUs;
