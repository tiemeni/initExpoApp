import { View, Text, Button, VStack, Icon, HStack, Divider, ScrollView } from "native-base";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import * as SCREENS from "../../constants/screens";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../constants/colours";
import { useSelector } from "react-redux";

function Success({ route }) {
  const navigation = useNavigation();
  const [recapRdv, setRecapRDV] = useState({})
  const rdvs = useSelector(state => state.RdvForm.myRdv)
  const id = route.params.id
  console.log("------------------------------------------", id)
  useEffect(() => {
    for (let i = 0; i < rdvs?.length; i++) {
      if (rdvs[i]?._id == id) {
        setRecapRDV(rdvs[i]);
        console.log("-------------", rdvs[i])
        break;
      }
    }
  }, [])

  return (
    <ScrollView style={{ ...styles.contenair }}>
      <VStack space={5} style={styles.box1}>
        <View rounded={50} justifyContent={'center'} alignItems={'center'} height={100} backgroundColor={colors.white} width={100}>
          <AntDesign name="check" size={50} color={colors.primary} />
        </View>
        <Text style={styles.texte1}>Rendez-vous pris avec success</Text>
        <Text style={styles.texte2}>
          la confirmation du rendez-vous a été envoyée à votre adresse e-mail
        </Text>
      </VStack>
      <VStack space={5} style={styles.box2}>
        <HStack style={styles.box3}>
          <Text style={styles.texte3}>Docteur</Text>
          <Text style={styles.texte3}>{recapRdv?.name + " " + recapRdv?.surname}</Text>
        </HStack>
        <Divider />
        <HStack style={styles.box3}>
          <Text style={styles.texte3}>Spécialité</Text>
          <Text style={styles.texte3}>{""}</Text>
        </HStack>
        <Divider />
        <HStack style={styles.box3}>
          <Text style={styles.texte3}>Motif</Text>
          <Text style={styles.texte3}>{recapRdv?.motif}</Text>
        </HStack>
        <Divider />
        <HStack style={styles.box3}>
          <Text style={styles.texte3}>Date heure</Text>
          <Text style={styles.texte3}>{recapRdv?.displayedDate}</Text>
        </HStack>
        <Divider />
        <HStack style={styles.box3}>
          <Text style={styles.texte3}>Montant</Text>
          <Text style={styles.texte3}>5000 XAF</Text>
        </HStack>
      </VStack>
      <Button
        _text={{ color: colors.primary, fontSize: 15 }}
        style={{ backgroundColor: colors.white, borderRadius: 10, marginBottom: 10 }}
        onPress={() => navigation.navigate(SCREENS.RDV)}
      >
        Voir mes rendez-vous
      </Button>
    </ScrollView>

  );
}

export default Success;
