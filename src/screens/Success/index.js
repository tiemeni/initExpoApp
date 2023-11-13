import React, { useEffect} from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import * as SCREENS from "../../constants/screens";
import colors from "../../constants/colours";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { BackHandler} from "react-native";
import { TickCircle } from "iconsax-react-native";
import { View } from "react-native";
import { Divider, Button, Text } from "react-native-paper";

function Success({ route }) {
  const navigation = useNavigation();
  const rdv = useSelector((state) => state.RdvForm.recapRDVId);

  useEffect(() => {
    const goBackAction = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      goBackAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <LinearGradient
      colors={["#04C96A", "#00C78E", "#00C3AB", "#00BEBF", "#04B7C9"]}
      start={[0, 0]}
      end={[1, 1]}
      style={{ flex: 1 }}
    >
      <View style={{ ...styles.contenair }}>
        <View  style={styles.box1}>
          <TickCircle size="130" color={colors.white} variant="Bold"/>
          <Text style={styles.texte1}>Rendez-vous pris avec success</Text>
          <Text style={styles.texte2}>
            la confirmation du rendez-vous a été envoyée à votre adresse e-mail
          </Text>
        </View>
        <View style={styles.box2}>
          <View style={styles.box3}>
            <Text style={styles.texte3}>Docteur</Text>
            <Text style={{ ...styles.texte3, fontWeight: 500 }}>
              {rdv?.practitioner?.name + " " + rdv?.practitioner?.surname}
            </Text>
          </View>
          <Divider style={{borderWidth:0.2, borderColor:colors.white }} />
          <View style={styles.box3}>
            <Text style={styles.texte3}>Spécialité</Text>
            <Text style={{ ...styles.texte3, fontWeight: 500 }}>
              {rdv?.practitioner?.job?.title}
            </Text>
          </View>
          <Divider style={{borderWidth:0.2, borderColor:colors.white }} />
          <View style={styles.box3}>
            <Text style={styles.texte3} flex={1}>
              Motif
            </Text>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              flex={1}
              style={{ ...styles.texte3, fontWeight: 500 }}
            >
              {rdv?.motif?.label}
            </Text>
          </View>
          <Divider style={{borderWidth:0.2, borderColor:colors.white }} />
          <View style={styles.box3}>
            <Text flex={1} style={styles.texte3}>
              Date heure
            </Text>
            <Text
              flex={1}
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ ...styles.texte3, fontWeight: 500 }}
            >
              {rdv?.date_long}
            </Text>
          </View>
          <Divider style={{borderWidth:0.2, borderColor:colors.white }} />
          <View style={styles.box3}>
            <Text style={styles.texte3}>Montant</Text>
            <Text style={{ ...styles.texte3, fontWeight: 500 }}>5000 XAF</Text>
          </View>
        </View>
        <Button
          style={styles.btn}
          textColor={colors.primary}
          onPress={() => navigation.navigate(SCREENS.RDV_CONTAINER)}
        >
          Voir mes rendez-vous
        </Button>
      </View>
    </LinearGradient>
  );
}

export default Success;
