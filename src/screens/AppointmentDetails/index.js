import React from "react";
import CustomHeader from "../../components/CustomHeader";
import * as SCREENS from "../../constants/screens";
import { Box, Button, Center, HStack, Icon, ScrollView, Text, VStack, View } from "native-base";
import styles from "./style";
import colors from "../../constants/colours";
import { Ionicons } from '@expo/vector-icons';
import CardInfo from "../../components/CardInfo";


const AppointmentDetails = ({ navigation }) => {
  return (
    <View flex={1}>
      <CustomHeader navigation={navigation} mb={5} screen={SCREENS.PROFILE} />
      <ScrollView px={4} showsVerticalScrollIndicator={false} overScrollMode='never'>
        <VStack space={5}>
          <VStack space={2}>
            <Text style={styles.sectionTitle}>Le medecin</Text>
            <HStack alignItems={'center'} space={4} style={styles.medCard}>
              <Box style={styles.profile}></Box>
              <VStack>
                <Text style={styles.medName}>Dr Genseric John Doe</Text>
                <Text style={styles.label}>Chirurgien oncologue</Text>
                <Text style={styles.label}>4,5/5 (388 avis)</Text>
              </VStack>
            </HStack>
            <HStack space={4} mt={2}>
              <Button style={styles.button} backgroundColor={colors.transp_danger}>
                <Text color={colors.danger} fontWeight={500}>Annuler</Text>
              </Button>
              <Button style={styles.button} backgroundColor={colors.trans_primary}>
                <Text color={colors.primary} fontWeight={500}>Reporter</Text>
              </Button>
            </HStack>
          </VStack>

          <CardInfo
            lieu={'Clinique FOUDA'}
            patient={"Mr. TIEMENI Christian"}
            motif={"Lorem ipsum dolor sit amet"}
            infos={"23 ans, 85Kg, Homme"}
            status={"Planifié"}
            date={"9 Juillet 2012"}
            heure={"10h00"}
          />

          <VStack space={2}>
            <Text style={styles.sectionTitle}>Informations sur le paiement</Text>

            <HStack space={2} style={styles.alert}>
              <Icon as={<Ionicons />} name="ios-warning" size={"md"} color={colors.warning} />
              <Text color={colors.warning} fontWeight={500}>Votre paiement est incomplet.</Text>
            </HStack>

            <VStack space={2} style={styles.appoinmentsBox} mb={5}>
              <HStack justifyContent={'space-between'}>
                <Text style={styles.label}>Honoraires du medecin</Text>
                <Text>XAF 10.000,00</Text>
              </HStack>
              <HStack justifyContent={'space-between'}>
                <Text style={styles.label}>Frais système</Text>
                <Text>XAF 10.000,00</Text>
              </HStack>
              <HStack justifyContent={'space-between'}>
                <Text style={styles.label}>Remise</Text>
                <Text>XAF 10.000,00</Text>
              </HStack>
              <HStack justifyContent={'space-between'}>
                <Text style={styles.label}>Total à payer</Text>
                <Text>XAF 10.000,00</Text>
              </HStack>
              <HStack justifyContent={'space-between'}>
                <Text style={styles.label}>Total payé</Text>
                <Text>XAF 10.000,00</Text>
              </HStack>
              <HStack justifyContent={'space-between'}>
                <Text style={styles.label}>Paiement dû</Text>
                <Text>XAF 10.000,00</Text>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </View>
  );
};

export default AppointmentDetails;
