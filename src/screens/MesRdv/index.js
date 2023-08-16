import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  ScrollView,
  View,
  VStack,
} from "native-base";
import { Text } from "react-native";
import Rdv from "../../components/Rdv";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SCREENS from "../../constants/screens";
import { Skelette } from "./squelette";
import CustomHeader from '../../components/CustomHeader';
import { useDispatch, useSelector } from "react-redux";
import { clearCache, getMyRDV } from "../../redux/RDV/actions";
import { Ionicons } from '@expo/vector-icons';

export default function MesRdv({ navigation }) {
  const [actualState, setActualState] = useState(1);
  const dispatch = useDispatch()
  const loadingRDV = useSelector(state => state.RdvForm.rdvLoading)

  const rdvs = useSelector(state => state.RdvForm.myRdv)
  const user = useSelector(state => state.UserReducer.userInfos)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(clearCache())
    dispatch(getMyRDV(user?.user?._id))
    !loadingRDV && setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, []);

  return (
    <View flex={1}>
      <CustomHeader navigation={navigation} mb={5} screen={SCREENS.PROFILE} />
      <Box
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        height={45}
        mb={5}
      >
        <HStack
          width={"95%"}
          alignItems={"center"}
          height={"95%"}
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
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
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
              onPress={() => setActualState(3)}
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
      <ScrollView overScrollMode="never">
        {actualState === 1 && (!loadingRDV && !loading) ? (
          <VStack justifyContent={"center"} alignItems={"center"}>
            {rdvs?.map((_e, i) => (
              <View
                key={_e._id}
                height={182}
                width={340}
                borderRadius={10}
                padding={3}
                mb={2}
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
                <Rdv _id={_e._id} navigation={navigation} praticien={_e?.name + " " + _e.surname} date={_e?.date} status={_e?.status} startTime={_e?.displayedDate} duration={_e?.motif} />
              </View>
            ))}
          </VStack>
        ) : actualState !== 1 && !loadingRDV ? (
          <VStack></VStack>
        ) : (
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
        )}
      </ScrollView>
    </View>
  );
}
