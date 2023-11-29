import {
  Center,
  Input,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import colors from "../../constants/colours";
import { Feather } from "@expo/vector-icons";
import { ArrowLeft } from "iconsax-react-native";
import { useDispatch, useSelector } from "react-redux";
import { searchPratByKey } from "../../redux/Praticiens/actions";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as SCREENS from "../../constants/screens";
import DoctorCard from "../../components/DoctorCard/DoctorCard";
import { getDispo, getMotifs } from "../../redux/RDV/actions";
import { ScrollView, View } from "react-native";
import { Text, TextInput } from "react-native-paper";

export const GlobalSearch = ({ navigation }) => {
  const dispatch = useDispatch();
  const searchedPrats = useSelector((state) => state.Praticiens.searchedPrats);
  const motifsLoading = useSelector((state) => state.RdvForm.motifsLoading);
  const loadingSearch = useSelector(
    (state) => state.Praticiens.loadingSearchPrats
  );
  const InputRef = useRef();
  const handleSearch = (key) => {
    dispatch(searchPratByKey(key));
  };

  useEffect(() => {
    setTimeout(() => InputRef.current.focus(), 100);
  }, []);

  return (
    <View flex={1} style={{paddingVertical:6, backgroundColor: colors.white }}>
      <View style={{display:'flex', flexDirection:'row', alignItems:"center", padding:10, gap:10 }}>
          <ArrowLeft
            onPress={() => navigation.goBack()}
            size={24}
            color={colors.primary}
          />
        <TextInput
          ref={InputRef}
          onChangeText={(text) => handleSearch(text)}
          placeholder="Rechercher un spécialiste"
          style={{width:"90%", height:45}}
          selectionColor={colors.primary}
          mode="outlined"
        />
      </View>
      <ScrollView>
        <View space={3}>
          {!loadingSearch && searchedPrats?.length > 0 ? (
            searchedPrats?.map((p, i) => {
              return (
                p?.affectation?.length > 0 &&
                p?.job?._id && (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      dispatch(
                        getDispo({
                          idCentre: p?.idCentre,
                          idp: p?._id,
                        })
                      );
                      dispatch(getMotifs({ id: p?.job?._id, forSpec: true }));
                      navigation.navigate(SCREENS.DETAILS_PRATICIEN, {
                        praticien: p,
                      });
                    }}
                  >
                    <DoctorCard
                      nom_complet={p?.name + " " + p?.surname}
                      clinique={
                        p?.affectation.length !== 0
                          ? p?.affectation[0].label
                          : ""
                      }
                      speciality={p?.job?.label}
                    />
                  </TouchableOpacity>
                )
              );
            })
          ) : !loadingSearch && searchedPrats?.length == 0 ? (
            <View
              style={{
                height: 100,
                alignItems: 'center',
                justifyContent: "center"
              }}
            >
              <Text style={{color: colors.text_grey_hint}}>Aucune données </Text>
            </View>
          ) : (
            <View>
              <DoctorCard isEmpty={true} />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
