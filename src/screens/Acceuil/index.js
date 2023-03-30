import React from 'react'
import { CustomHeader } from '../MesRdv'
import { PROFILE } from '../../constants/screens'
import { Box, Input, ScrollView, View, HStack, Text, VStack } from 'native-base'
import MedCard from '../../components/MedCard';
import styles from './style';
import { specialites, practiciens} from '../../utils/helper';

const Acceuil = ({ navigation }) => {

  return (
    <View flex={1}>
      <CustomHeader navigation={navigation} screen={PROFILE} />
      <ScrollView showsVerticalScrollIndicator={false} padding={5}>
        <Box>
          <Input
            variant={"unstyled"}
            onChangeText={(v) => handleChange('securityCode', v)}
            style={styles.input}
            size={'md'}
            placeholder="Rechercher un docteur ou une spécialité" />
        </Box>
        <Box mb={7} style={styles.tipBox}></Box>

        <VStack mb={7}>
          <HStack mb={2} justifyContent={'space-between'}>
            <Text style={styles.sectionTitle}>Nos spécialités</Text>
            <Text style={styles.seeAll}>Tout voir</Text>
          </HStack>
          <HStack style={styles.specialityBox}>
            {specialites.map((specialite) => (
              <Box key={specialite.id} style={styles.speciality}>
                <Text style={styles.specialityText}>{specialite.value}</Text>
              </Box>
            ))}
          </HStack>
        </VStack>

        <VStack>
          <HStack mb={4} justifyContent={'space-between'}>
            <Text style={styles.sectionTitle}>Médecins populaires</Text>
            <Text style={styles.seeAll}>Tout voir</Text>
          </HStack>
          <VStack flex={1} mb={10}>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
              {practiciens.map((praticien) => <MedCard key={praticien.id} praticien={praticien} />)}
            </ScrollView>
          </VStack>
        </VStack>
      </ScrollView>
    </View>
  )
}

export default Acceuil