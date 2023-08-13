import React, { useEffect, useState } from 'react'
import { PROFILE } from '../../constants/screens'
import { Box, Input, ScrollView, View, HStack, Text, VStack, Icon } from 'native-base'
import styles from './style';
import MedCard from '../../components/MedCard';
import { specialites, practiciens } from '../../utils/helper';
import CarouselAstuce from '../../components/MeAstuce';
import CarouselPub from '../../components/MePub';
import { MaterialIcons, Ionicons, FontAwesome } from "@expo/vector-icons";
import colors from '../../constants/colours';
import { useDispatch } from 'react-redux';
import { getProfession } from '../../redux/professions/actions';
import { clearCache, getMotifs } from '../../redux/RDV/actions';
import { connect } from 'react-redux';
import CustomHeader from '../../components/CustomHeader';

const Acceuil = ({ navigation }) => {
  const healthTips = [
    "Astuce 1: Boire beaucoup d'eau chaque jour.",
    "Astuce 2: Manger des fruits et légumes frais.",
    "Astuce 3: Faire de l'exercice régulièrement.",
    "Astuce 4: Dormir suffisamment chaque nuit.",
  ];
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch()

  const handleSearch = () => {
    const filteredSpecialites = specialites.filter(specialite => specialite.value.includes(searchText));
    const filteredPraticiens = practiciens.filter(praticien => praticien.name.includes(searchText));
    const results = [...filteredSpecialites, ...filteredPraticiens];
    setSearchResults(results);
  };

  useEffect(() => {
    dispatch(getProfession())
    dispatch(clearCache())
  }, [])

  return (
    <View flex={1}>
      <CustomHeader navigation={navigation} screen={PROFILE} />
      <ScrollView showsVerticalScrollIndicator={false} padding={3}>
        <Box>
          <Input
            h={38}
            rounded={12}
            borderWidth={0}
            fontSize={14}
            bg={colors.white}
            placeholder='Rechercher un praticien ou une spécialité'
            InputLeftElement={
              <Icon
                as={<Ionicons name="search" />}
                size={5}
                ml="4"
                color={colors.primary}
              />}
            onChangeText={text => setSearchText(text)}
            onSubmitEditing={handleSearch}
          />
        </Box>
        <CarouselPub />
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
        <VStack>
          <VStack mb={4} justifyContent={'space-between'}>
            <Text style={styles.sectionTitle}>Astuces de santé</Text>
            <CarouselAstuce />
          </VStack>
        </VStack>
      </ScrollView>
    </View>
  )
}

export default Acceuil