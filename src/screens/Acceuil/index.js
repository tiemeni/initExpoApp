import React, { useEffect, useState } from 'react'
import { PROFILE } from '../../constants/screens'
import { Box, Input, ScrollView, View, HStack, Text, VStack, Icon } from 'native-base'
import styles from './style';
import MedCard from '../../components/MedCard';
import { specialites, practiciens } from '../../utils/helper';
import CarouselAstuce from '../../components/MeAstuce';
import CarouselPub from '../../components/MePub';
import { Ionicons } from "@expo/vector-icons";
import colors from '../../constants/colours';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getProfession } from '../../redux/professions/actions';
import { clearCache, getMotifs } from '../../redux/RDV/actions';
import CustomHeader from '../../components/CustomHeader';
import * as Notifications from 'expo-notifications'
import { sendExpoToken } from '../../redux/User/action';
import * as SCREENS from "../../constants/screens";
import { SharedElement } from 'react-navigation-shared-element';



const Acceuil = ({ navigation, userInfos }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch()
  const praticiens = useSelector(state => state.Praticiens.praticiens)
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

  useEffect(() => {
    const { user } = userInfos
    const requestPermissions = async () => {
      try {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission de notification non accordée');
          return;
        }
        const expoPushToken = await Notifications.getExpoPushTokenAsync();
        dispatch(sendExpoToken({ _id: user._id, token: expoPushToken.data }));
      } catch (error) {
        console.error('Erreur lors de la demande de permission de notification:', error);
      }
    };

    requestPermissions();
  }, [])

  return (
    <View flex={1}>
      <CustomHeader navigation={navigation} screen={PROFILE} />
      <ScrollView showsVerticalScrollIndicator={false} padding={3} keyboardShouldPersistTaps="never">
        <Box>
          <SharedElement>
            <Input
              showSoftInputOnFocus={false}
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
              onPressIn={() => navigation.navigate(SCREENS.GLOBAL_SEARCH)}
              onChangeText={text => setSearchText(text)}
              onSubmitEditing={handleSearch}
            />
          </SharedElement>
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
              {praticiens.map((praticien) => <MedCard key={praticien?._id} praticien={praticien} />)}
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

const mapStateToProps = ({ UserReducer }) => ({
  userInfos: UserReducer.userInfos
})

export default connect(mapStateToProps)(Acceuil)