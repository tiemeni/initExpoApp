import React, { useState } from "react";
import {
  Box,
  Center,
  HStack,
  View,
  VStack,
  Actionsheet,
  Text,
  useDisclose,
} from "native-base";
import Rdv from "../../components/Rdv";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Skelette } from "./squelette";
import { useDispatch, useSelector } from "react-redux";
import { clearCache, getMyRDV } from "../../redux/RDV/actions";
import { FolderOpen, Sort } from "iconsax-react-native";
import styles from "./style";
import colors from "../../constants/colours";
import { FlatList } from "react-native";

export default function MesRdv({ navigation }) {
  const rdvs = useSelector(state => state.RdvForm.myRdv)
  const [globalState, setGlobalState] = useState({
    actualState: 1,
    loading: false,
    filterBy: 'create_at',
    status: 'Planifié',
    showSkeleton: false,
    sortOrder: 'asc',
    appointments: rdvs
  })

  const dispatch = useDispatch()
  const loadingRDV = useSelector(state => state.RdvForm.rdvLoading)
  const user = useSelector(state => state.UserReducer.userInfos)
  const { isOpen, onOpen, onClose } = useDisclose();

  const compareFunction = (a, b) => {
    const aValue = globalState.filterBy === "created_at" ? a.created_at : a.date;
    const bValue = globalState.filterBy === "created_at" ? b.created_at : b.date;

    if (globalState.sortOrder === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  };

  const getRdvs = () => {
    dispatch(clearCache())
    if (rdvs.length <= 0) {
      dispatch(getMyRDV(user?.user?._id))
      setGlobalState({ ...globalState, showSkeleton: true })
    }
  }
  React.useLayoutEffect(() => {
    getRdvs()
  }, []);

  React.useEffect(() => {
    const filteredRdvs = rdvs.filter((rdv) => rdv.status == globalState.status)
    setGlobalState({ ...globalState, appointments: filteredRdvs, showSkeleton: false, loading: false });
  }, [globalState.actualState, rdvs])

  React.useEffect(() => {
    const copy = [...globalState.appointments]
    copy.sort(compareFunction);

    setGlobalState({ ...globalState, appointments: copy });
  }, [globalState.filterBy, globalState.sortOrder]);

  const handleStateChange = (newState) => {
    if(globalState.actualState === newState) return

    const val = newState === 1 ? "Planifié" : "Terminé";
    setGlobalState({
      ...globalState,
      actualState: newState,
      loading: true,
      status: newState !== 3 ? val : "Annulé",
      showSkeleton: true
    });
  };

  return (
    <View flex={1} paddingTop={2}>
      <HStack mx={3} my={2} justifyContent={'space-between'} alignItems={'center'}>
        <Text fontWeight={600} fontSize={18}>
          Rendez-vous
          <Text fontSize={14}> ({globalState.appointments.length})</Text>
        </Text>
        <Pressable onPress={onOpen}>
          <HStack alignItems={'center'}>
            <Sort color={colors.black} />
            <Text>Trier</Text>
          </HStack>
        </Pressable>
      </HStack>
      <Box
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        height={45}
        mb={3}
      >
        <HStack
          width={"95%"}
          alignItems={"center"}
          height={"100%"}
          backgroundColor={"#EEEFF3"}
          borderRadius={10}
        >
          <View
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            borderRightWidth={1}
            borderRightColor={"#DADADA"}
            height={"90%"}
            width={"33%"}
          >
            <Pressable
              onPress={() => { handleStateChange(1) }}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              backgroundColor={globalState.actualState === 1 ? "#04B7C9" : "#EEEFF3"}
              height={"100%"}
              width={"90%"}
              borderRadius={10}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    color: globalState.actualState === 1 ? "white" : "#909090",
                  }}
                >
                  A venir
                </Text>
              </TouchableOpacity>
            </Pressable>
          </View>
          <View
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            borderRightWidth={1}
            borderRightColor={"#DADADA"}
            height={"90%"}
            width={"34%"}
          >
            <Pressable
              onPress={() => { handleStateChange(2) }}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              backgroundColor={globalState.actualState === 2 ? "#04B7C9" : "#EEEFF3"}
              height={"100%"}
              width={"90%"}
              borderRadius={10}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    color: globalState.actualState === 2 ? "white" : "#909090",
                  }}
                >
                  Terminé
                </Text>
              </TouchableOpacity>
            </Pressable>
          </View>
          <View
            height={"90%"}
            width={"33%"}
            display={"flex"}
            flexDirection={"row"}
            borderRightColor={"#DADADA"}
            justifyContent={"center"}
          >
            <Pressable
              onPress={() => { handleStateChange(3) }}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              backgroundColor={globalState.actualState === 3 ? "#04B7C9" : "#EEEFF3"}
              height={"100%"}
              width={"90%"}
              borderRadius={10}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    color: globalState.actualState === 3 ? "white" : "#909090",
                  }}
                >
                  Annulé
                </Text>
              </TouchableOpacity>
            </Pressable>
          </View>
        </HStack>
      </Box>
      {globalState.appointments.length !== 0 && !loadingRDV && !globalState.loading && !globalState.showSkeleton && (
        <FlatList
          onRefresh={getRdvs}
          refreshing={globalState.showSkeleton || loadingRDV}
          style={styles.flatList}
          data={globalState.appointments}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          windowSize={1}
          renderItem={({ item }) => (
            <View
              key={item._id}
              height={195}
              width={"100%"}
              borderRadius={10}
              padding={3}
              mb={4}
              backgroundColor={"white"}
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.1,
                shadowRadius: 3.84,
                elevation: 1,
              }}
            >
              <Rdv _id={item._id} localisation={item?.lieu?.location} navigation={navigation} praticien={item?.name + " " + item.surname} date={item?.date} status={item?.status} startTime={item?.displayedDate} motif={item?.motif} />
            </View>
          )}
        />
      )}

      {loadingRDV || globalState.showSkeleton &&
        <VStack padding={4} space={1}>
          <VStack>
            <Skelette />
          </VStack>
          <VStack>
            <Skelette />
          </VStack>
          <VStack>
            <Skelette last={true} />
          </VStack>
        </VStack>
      }

      {(globalState.appointments.length === 0 && !globalState.showSkeleton) &&
        <Center flex={1}>
          <FolderOpen variant="Outline" size={80} color="#a7a7a7" />
          <Text style={styles.empty}>Vous n'avez aucun rendez-vous {globalState.status.toLowerCase()}</Text>
        </Center>
      }

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item>
            <Text mb={2} fontSize={16} fontWeight={600}>Options de tri</Text>
            <HStack justifyContent={'center'} style={styles.btnItem}>
              <Pressable
                style={[styles.filterBtn, styles.btnLeftItem, {
                  backgroundColor: globalState.filterBy === 'created_at' ? colors.trans_primary : "transparent",
                  borderColor: globalState.filterBy === 'created_at' ? colors.primary : "#c2c2c2",
                  borderRightWidth: globalState.filterBy === 'created_at' ? 1 : 0,
                }]}
                onPress={() => { setGlobalState({ ...globalState, filterBy: 'created_at' }) }}
              >
                <Text
                  color={globalState.filterBy === 'created_at' ? 'primary.500' : colors.text_grey_hint}
                  textAlign={'center'}>
                  Date de création
                </Text>
              </Pressable>
              <Pressable
                style={[styles.filterBtn, styles.btnRightItem, {
                  backgroundColor: globalState.filterBy === 'rdv_date' ? colors.trans_primary : "transparent",
                  borderColor: globalState.filterBy === 'rdv_date' ? colors.primary : "#c2c2c2",
                  borderLeftWidth: globalState.filterBy === 'rdv_date' ? 1 : 0,
                }]}
                onPress={() => { setGlobalState({ ...globalState, filterBy: 'rdv_date' }) }}
              >
                <Text
                  color={globalState.filterBy === 'rdv_date' ? 'primary.500' : colors.text_grey_hint}
                  textAlign={'center'}
                >
                  Date du rendez-vous
                </Text>
              </Pressable>
            </HStack>
          </Actionsheet.Item>
          <Actionsheet.Item>
            <Text mb={2} fontSize={16} fontWeight={600}>Ordre</Text>
            <HStack justifyContent={'center'} style={styles.btnItem}>
              <Pressable style={[styles.sortBtn, styles.btnLeftItem, {
                backgroundColor: globalState.sortOrder === 'asc' ? colors.trans_primary : "transparent",
                borderColor: globalState.sortOrder === 'asc' ? colors.primary : "#c2c2c2",
                borderRightWidth: globalState.sortOrder === 'asc' ? 1 : 0,
              }]} onPress={() => { setGlobalState({ ...globalState, sortOrder: 'asc' }) }}>
                <Text
                  color={globalState.sortOrder === 'asc' ? 'primary.500' : colors.text_grey_hint}
                  textAlign={'center'}>
                  Ascendant
                </Text>
              </Pressable>
              <Pressable style={[styles.sortBtn, styles.btnRightItem, {
                backgroundColor: globalState.sortOrder === 'desc' ? colors.trans_primary : "transparent",
                borderColor: globalState.sortOrder === 'desc' ? colors.primary : "#c2c2c2",
                borderLeftWidth: globalState.sortOrder === 'desc' ? 1 : 0,
              }]} onPress={() => { setGlobalState({ ...globalState, sortOrder: 'desc' }) }}>
                <Text
                  textAlign={'center'}
                  color={globalState.sortOrder === 'desc' ? 'primary.500' : colors.text_grey_hint}
                >
                  Descendant
                </Text>
              </Pressable>
            </HStack>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
}
