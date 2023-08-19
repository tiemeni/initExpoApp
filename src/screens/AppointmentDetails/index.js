import React from "react";
import CustomHeader from "../../components/CustomHeader";
import * as SCREENS from "../../constants/screens";
import { Box, Button, HStack, Icon, ScrollView, Text, VStack, View } from "native-base";
import styles from "./style";
import colors from "../../constants/colours";
import { Ionicons } from '@expo/vector-icons';
import CardInfo from "../../components/CardInfo";
import { useRoute } from "@react-navigation/native"
import { connect } from "react-redux";



const AppointmentDetails = ({ navigation, appointments }) => {
  const route = useRoute()
  const { _id } = route.params
  const [appointment, setAppointment] = React.useState({})

  React.useEffect(() => {
    const apt = appointments.find(apt => apt._id === _id);
    setAppointment(apt);
  }, [])


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
                <Text style={styles.medName}>Dr {appointment?.name} {appointment?.surname}</Text>
                <Text style={styles.label}>{appointment?.profession}</Text>
                <Text style={styles.label}>4,5/5 (388 avis)</Text>
              </VStack>
            </HStack>
            <HStack space={4} mt={2}>
              <Button style={styles.button} backgroundColor={colors.transp_danger}>
                <Text color={colors.danger} fontWeight={500}>Annuler</Text>
              </Button>
              <Button style={styles.button} onPress={() => navigation.navigate(SCREENS.APPOINTMENT_REPORT_SCREEN, { navigation: navigation, appointment: appointment })} backgroundColor={colors.trans_primary}>
                <Text color={colors.primary} fontWeight={500}>Reporter</Text>
              </Button>
            </HStack>
          </VStack>

          <CardInfo
            lieu={'Clinique FOUDA'}
            patient={appointment?.patient?.name + " " + appointment?.patient?.surname}
            motif={appointment?.motif}
            infos={"23 ans, 85Kg, Homme"}
            status={appointment?.status}
            date={appointment?.displayedDate}
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

const mapStateToProps = ({ RdvForm }) => ({
  appointments: RdvForm.myRdv
})

export default connect(mapStateToProps)(AppointmentDetails);
