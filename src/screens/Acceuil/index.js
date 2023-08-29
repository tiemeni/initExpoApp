import React, { useEffect, useState } from 'react'
import { Box, Input, ScrollView, View, HStack, Text, VStack, Icon, Pressable, FlatList, IconButton } from 'native-base'
import styles from './style';
import { specialites, practiciens } from '../../utils/helper';
import colors from '../../constants/colours';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getProfession } from '../../redux/professions/actions';
import { clearCache, getMotifs } from '../../redux/RDV/actions';
import * as Notifications from 'expo-notifications'
import { sendExpoToken } from '../../redux/User/action';
import * as SCREENS from "../../constants/screens";
import { SharedElement } from 'react-navigation-shared-element';
import { getAllPrats } from '../../redux/Praticiens/actions';
import { Calendar, Clock, DocumentText, Hospital, Location, Map1, SearchNormal1 } from 'iconsax-react-native';
import { useTranslation } from 'react-i18next'

const _spacing = 3
const datas = [{ key: 1, value: "Tout" }, { key: 2, value: "Meilleurs notes" }, { key: 3, value: "Populaires" }]

const NextAppointment = () => {
  return (
    <VStack mx={_spacing} bg="primary.500" p={_spacing} borderRadius={10} space={_spacing}>
      <HStack space={_spacing}>
        <Box style={styles.medPic}></Box>
        <HStack flex={1} justifyContent={'space-between'}>
          <VStack>
            <Text fontSize={16} color="white" fontWeight="600">Dr Shana Khan</Text>
            <Text color="white">Cardiologue</Text>
          </VStack>
          <IconButton
            borderRadius={50}
            h={8}
            w={8}
            bg="white"
            icon={<Map1 color={colors.primary} />}
            onPress={() => { }}
            color="primary.500"
            size="xs"
          />
        </HStack>
      </HStack>
      <VStack borderRadius={10} bg="#00A3B4" p={_spacing} space={_spacing}>
        <HStack justifyContent={'space-between'}>
          <HStack w={"60%"} alignItems={'center'} space={_spacing * .5}>
            <Icon
              as={<DocumentText />}
              color="white"
            />
            <Text fontSize={12} color="white">Consultation ophta</Text>
          </HStack>
          <HStack w={"40%"} alignItems={'center'} space={_spacing * .5}>
            <Icon
              as={<Hospital />}
              color="white"
            />
            <Text fontSize={12} color="white">Centre pasteur</Text>
          </HStack>
        </HStack>
        <HStack justifyContent={'space-between'}>
          <HStack w={"60%"} alignItems={'center'} space={_spacing * .5}>
            <Icon
              as={<Calendar />}
              color="white"
            />
            <Text fontSize={12} color="white">Lun, 28 aout 2023</Text>
          </HStack>
          <HStack w={"40%"} alignItems={'center'} space={_spacing * .5}>
            <Icon
              as={<Clock />}
              color="white"
            />
            <Text fontSize={12} color="white">14:30</Text>
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  )
}

const Acceuil = ({ navigation, userInfos = {} }) => {
  const [itemSelected, setItemSelect] = React.useState(0)
  const translate = useTranslation().t
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
    dispatch(getAllPrats())
  }, [])

  useEffect(() => {
    const { user } = userInfos
    const requestPermissions = async () => {
      try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status
        }
        if (finalStatus !== 'granted') {
          console.log('Permission de notification non accordée');
          return;
        }
        const expoPushToken = await Notifications.getExpoPushTokenAsync();
        dispatch(sendExpoToken({ _id: user?._id, token: expoPushToken.data }));
      } catch (error) {
        console.error('Erreur lors de la demande de permission de notification:', error);
      }
    };

    requestPermissions();
  }, [])

  return (
    <View flex={1}>
      <ScrollView
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        paddingBottom={_spacing}
        keyboardShouldPersistTaps="never">
        <VStack bg="white" space={_spacing}>
          <HStack mx={_spacing} py={_spacing} space={1} alignItems={'baseline'}>
            <Icon
              as={<Location />}
              color="primary.500" />
            <VStack>
              <Text color={colors.text_grey_hint}>{translate("TEXT_EMPLACEMENT")}</Text>
              <Text fontWeight="600">Poste Centrale, Yde, CAM</Text>
            </VStack>
          </HStack>
        </VStack>

        <VStack bg="white" py={_spacing}>
          <SharedElement>
            <Input
              mx={_spacing}
              showSoftInputOnFocus={false}
              h={45}
              rounded={22}
              borderWidth={0}
              fontSize={14}
              bg={colors.bg_grey}
              placeholder={translate("TEXT_SEARCH_PLACEHOLDER")}
              InputLeftElement={<SearchNormal1 style={{ marginLeft: 10 }} size={20} color={colors.text_grey_hint} />}
              onPressIn={() => navigation.navigate(SCREENS.GLOBAL_SEARCH)}
              onChangeText={text => setSearchText(text)}
              onSubmitEditing={handleSearch}
            />
          </SharedElement>
        </VStack>
        {/* Prochain rendez-vous */}
        <VStack bg="white" borderBottomRadius={_spacing * 6} py={_spacing} flex={1} space={_spacing}>
          <HStack mx={_spacing} justifyContent={'space-between'}>
            <Text fontWeight={600}>{translate("TEXT_NEXT_APPOINTMENT")}</Text>
            <Pressable onPress={() => { navigation.navigate(SCREENS.RDV_CONTAINER) }}>
              <Text color="primary.500">
                {translate("TEXT.SEE_ALL")}
              </Text>
            </Pressable>
          </HStack>

          <VStack flex={1}>
            <NextAppointment />
          </VStack>
        </VStack>

        <VStack mt={_spacing}>
          <HStack mx={_spacing} justifyContent={'space-between'}>
            <Text fontWeight={600}>{translate("TEXT_FIND_DOCTOR")}</Text>
            <Pressable onPress={() => { }}>
              <Text color="primary.500">{translate("TEXT.SEE_ALL")}</Text>
            </Pressable>
          </HStack>
          <FlatList
            data={datas}
            keyExtractor={({ value, key }) => key.toString()}
            horizontal
            scrollEnabled={false}
            renderItem={({ item, index }) => {
              return (
                <Pressable py={_spacing} ml={_spacing-1} onPress={() => { setItemSelect(index) }}>
                  <View
                    bg={itemSelected === index ? "primary.500" : "white"}
                    style={[styles.filter, styles.shadow]}>
                    <Text color={itemSelected === index ? "white" : colors.text_grey_hint}>
                      {item.value}
                    </Text>
                  </View>
                </Pressable>
              )
            }}
          />
        </VStack>

      </ScrollView>
    </View >
  )
}

const mapStateToProps = ({ UserReducer }) => ({
  userInfos: UserReducer.userInfos
})

export default connect(mapStateToProps)(Acceuil)