import React, { useState } from "react";
import {
  Box,
  Center,
  FlatList,
  HStack,
  ScrollView,
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

export default function MesRdv({ navigation }) {
  const [actualState, setActualState] = useState(1);
  const dispatch = useDispatch()
  const loadingRDV = useSelector(state => state.RdvForm.rdvLoading)
  const rdvs = useSelector(state => state.RdvForm.myRdv)
  const user = useSelector(state => state.UserReducer.userInfos)
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('Planifié')
  const [appointments, setAppointment] = useState(rdvs)
  const [showSkeleton, setShowSkeleton] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclose();

  const getRdvs = () => {
    dispatch(clearCache())
    if (rdvs.length <= 0) {
      dispatch(getMyRDV(user?.user?._id))
      setShowSkeleton(true)
    }
  }
  React.useLayoutEffect(() => {
    getRdvs()
  }, []);

  React.useEffect(() => {
    const filteredRdvs = rdvs.filter((rdv) => rdv.status == status)
    setAppointment(filteredRdvs);
    setTimeout(() => {
      setShowSkeleton(false)
    }, 1000);
  }, [actualState, rdvs])

  return (
    <View flex={1} paddingTop={2}>
      <HStack mx={3} my={2} justifyContent={'space-between'} alignItems={'center'}>
        <Text fontWeight={600} fontSize={18}>
          Rendez-vous
          <Text fontSize={14}> ({appointments.length})</Text>
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
              onPress={() => {
                setActualState(1);
                setStatus("Planifié")
                setShowSkeleton(true)
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 1000);
              }}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              backgroundColor={actualState === 1 ? "#04B7C9" : "#EEEFF3"}
              height={"100%"}
              width={"90%"}
              borderRadius={10}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    color: actualState === 1 ? "white" : "#909090",
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
              onPress={() => {
                setActualState(2);
                setStatus("Terminé")
                setShowSkeleton(true)
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 1000);
              }}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              backgroundColor={actualState === 2 ? "#04B7C9" : "#EEEFF3"}
              height={"100%"}
              width={"90%"}
              borderRadius={10}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    color: actualState === 2 ? "white" : "#909090",
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
              onPress={() => {
                setActualState(3)
                setStatus("Annulé")
                setShowSkeleton(true)
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 1000);
              }}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              backgroundColor={actualState === 3 ? "#04B7C9" : "#EEEFF3"}
              height={"100%"}
              width={"90%"}
              borderRadius={10}
            >
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 16,
                    color: actualState === 3 ? "white" : "#909090",
                  }}
                >
                  Annulé
                </Text>
              </TouchableOpacity>
            </Pressable>
          </View>
        </HStack>
      </Box>
      {appointments.length !== 0 && !loadingRDV && !loading && !showSkeleton && (
        <FlatList
          onRefresh={getRdvs}
          refreshing={showSkeleton || loadingRDV}
          style={styles.flatList}
          data={appointments}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
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
          } />
      )}

      {loadingRDV || showSkeleton &&
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

      {(appointments.length === 0 && !showSkeleton) &&
        <Center flex={1}>
          <FolderOpen variant="Outline" size={80} color="#a7a7a7" />
          <Text style={styles.empty}>Vous n'avez aucun rendez-vous {status.toLowerCase()}</Text>
        </Center>
      }

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item>Option 1</Actionsheet.Item>
          <Actionsheet.Item>Option 2</Actionsheet.Item>
          <Actionsheet.Item>Option 3</Actionsheet.Item>
          <Actionsheet.Item color="red.500">Delete</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
}
