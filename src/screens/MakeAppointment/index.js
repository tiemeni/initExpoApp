import React, { useEffect, useState } from 'react';
import styles from './style'
import { Dimensions } from 'react-native';
import { View, Text, VStack, HStack, Box, Select, Icon, ScrollView, Button, PresenceTransition } from 'native-base';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import colors from '../../constants/colours';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import MedItem from '../../components/MedItem';
import { practiciens, disponibilites, appointmentDate, motifs } from '../../utils/helper';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { MAKE_APPOINTMENT_SCREEN } from '../../constants/screens';
import * as SCREENS from '../../constants/screens';
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'
import { Dialog, RadioButton } from 'react-native-paper';
import ModaleChoixProfession from '../../components/ModaleChoixSpecialite';
import { useDispatch, useSelector } from 'react-redux';
import { setProfessionForRdv, setShouldSeeBehind } from '../../redux/commons/action';
import { getClinique, getDispo, getMotifs, getPraticiens, setRDVForm } from '../../redux/RDV/actions';


const HeaderBox = ({ number, title, hintText }) => {
    return (
        <VStack>
            <HStack mb={2} style={styles.titleBox}>
                <Box mr={2} style={styles.number}>
                    <Text style={styles.numberLabel}>{number}</Text>
                </Box>
                <Text style={styles.title}>
                    {title}
                </Text>
            </HStack>
            <Text mb={2} style={styles.hintText}>
                {hintText}
            </Text>
        </VStack>
    )
}

const MakeAppointment = ({ navigation, route }) => {
    const isProfession = useSelector(state => state.Common.isProfession)
    const idCentre = useSelector(state => state.Common.idc)
    const [actualDayCreneaux, setActualDayCreneau] = useState([])
    const RDVForm = useSelector(state => state.RdvForm.rdvForm)
    const dispo = useSelector(state => state.RdvForm.dispo)
    const motifs = useSelector(state => state.RdvForm.motifs)
    const specialities = useSelector(state => state.RdvForm.specialities)
    const cliniques = useSelector(state => state.RdvForm.cliniques)
    const praticiens = useSelector(state => state.RdvForm.praticiens)
    console.log('praticiens--', praticiens)
    // const selectedProfession = isProfession ? professions.
    console.log("prof", isProfession)
    const shouldSeeBehind = useSelector(state => state.Common.shouldSeeBehind)
    const screenWidth = Dimensions.get('screen').width;
    const dispatch = useDispatch()
    console.log("-----", shouldSeeBehind)
    const [formData, setFormData] = React.useState({
        motif: null,
        praticien: null,
        profession: true,
        period: {
            day: null,
            time: null
        }
    });

    const handleStepNumber = (n) => {
        if (isProfession === false) {
            return n - 1
        } else {
            return n
        }
    }

    const handleChange = (trigger, value) => {
        switch (trigger) {
            case 'motif':
                setFormData({
                    ...formData,
                    motif: value,
                    praticien: null,
                    period: {
                        day: null,
                        time: null
                    }
                });
                dispatch(setRDVForm({
                    ...RDVForm,
                    motif: value,
                }))
                dispatch(getClinique(value))
                break;
            case 'praticien':
                setFormData({
                    ...formData,
                    praticien: value,
                    period: {
                        day: null,
                        time: null
                    }
                });
                dispatch(setRDVForm({
                    ...RDVForm,
                    praticien: value,
                    idCentre: idCentre
                }))
                dispatch(getDispo({ idCentre: idCentre, idp: value }))
                break;
            case 'profession':
                setFormData({
                    ...formData,
                    profession: value,
                });
                dispatch(setRDVForm({
                    ...RDVForm,
                    profession: value,
                }))
                break;
            case 'speciality':
                setFormData({
                    ...formData,
                    speciality: value,
                });
                dispatch(setRDVForm({
                    ...RDVForm,
                    specialities: value,
                }))
                dispatch(getMotifs({ id: value, forSpec: true }))
                break;
            case 'lieu':
                setFormData({
                    ...formData,
                    lieu: value,
                });
                dispatch(setRDVForm({
                    ...RDVForm,
                    lieu: value,
                }))
                dispatch(getPraticiens({ id: value, ids: RDVForm.specialities }))
                break;
            case 'day':
                setFormData({
                    ...formData,
                    period: { time: null, day: value }
                });
                dispatch(setRDVForm({
                    ...RDVForm,
                    period: { time: null, day: value }
                }))
                setActualDayCreneau(generateValuesTab(value))
                break;
            case 'time':
                setFormData({ ...formData, period: { ...formData.period, time: value } });
                dispatch(setRDVForm({
                    ...RDVForm,
                    period: { ...formData.period, time: value }
                }))
                break;
            default:
                break;
        }
        console.log(formData)
    }

    const handlePress = () => {
        console.log(RDVForm)
        navigation.navigate(SCREENS.PAYMENT)
    }

    useEffect(() => {
        return () => {
            console.log('out')
            dispatch(setShouldSeeBehind(false))
        }
    }, [])

    const generateKeyTab = tab => {
        let keyTab = []
        tab.forEach((e) => {
            keyTab.push(e.key)
        })
        console.log(keyTab)
        return keyTab
    }

    const generateValuesTab = key => {
        let valuesTab = []
        dispo.forEach((e) => {
            if (e.key === key) {
                valuesTab = e.values
            }
        })
        return valuesTab
    }

    return (
        <View bgColor={colors.white} flex={1} style={styles.container}>
            {/* Header */}
            <HStack style={styles.header}>
                <Text style={styles.headerTitle}>Nouveau rendez-vous</Text>
                <Box style={styles.closeBtn}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Icon
                            as={AntDesign}
                            name='close'
                            size={'sm'}
                            color={colors.black}
                        />
                    </Pressable>
                </Box>
            </HStack>
            <ScrollView showsVerticalScrollIndicator={false} height={"80%"} borderColor={'red'} mb={2}>
                {shouldSeeBehind && isProfession === true && <VStack mt={5} style={styles.card}>
                    <HeaderBox
                        number={1}
                        title={'Spécialité du rendez-vous'}
                        hintText={'Sélectionnez une specialité pour votre rendez-vous'} />
                    <VStack style={styles.inputBox}>
                        <Box>
                            <SelectList
                                setSelected={(val) => {
                                    console.log("val--", val)
                                    handleChange('speciality', val)
                                }}
                                data={specialities?.map((e) => {
                                    return { key: e._id, value: e.label }
                                })}
                                save="key"
                                boxStyles={{ borderRadius: 5 }}
                                dropdownStyles={{
                                    borderRadius: 5,
                                    marginTop: 0,
                                }}
                                notFoundText={"Aucune specialité trouvée"}
                                searchPlaceholder={'Recherche'}
                                searchicon={<Icon
                                    as={MaterialIcons}
                                    name='search'
                                    mr={2}
                                    size={'lg'} />}
                            />
                        </Box>
                    </VStack>
                </VStack>}
                {shouldSeeBehind && ((isProfession === true && formData.speciality) || (isProfession === false)) && <VStack mt={5} style={styles.card}>
                    <HeaderBox
                        number={handleStepNumber(2)}
                        title={'Motif du rendez-vous'}
                        hintText={'Sélectionnez un motif pour votre rendez-vous'} />
                    <VStack style={styles.inputBox}>
                        <Box>
                            <SelectList
                                setSelected={(val) => {
                                    console.log(val)
                                    handleChange('motif', val)
                                }}
                                data={motifs.map((e) => {
                                    return { key: e._id, value: e.label }
                                })}
                                save="key"
                                boxStyles={{ borderRadius: 5 }}
                                dropdownStyles={{
                                    borderRadius: 5,
                                    marginTop: 0,
                                }}
                                notFoundText={"Aucun motif trouvé"}
                                searchPlaceholder={'Recherche'}
                                searchicon={<Icon
                                    as={MaterialIcons}
                                    name='search'
                                    mr={2}
                                    size={'lg'} />}
                            />
                        </Box>
                    </VStack>
                </VStack>}

                {/*Medecin traitant*/}
                {<PresenceTransition
                    visible={(isProfession === true && formData.motif) || (isProfession === false && formData.motif)}
                    initial={{
                        opacity: 0
                    }} animate={{
                        opacity: 1,
                        transition: {
                            duration: 250
                        }
                    }}>
                    <VStack mt={5} style={styles.card}>
                        <HeaderBox
                            number={handleStepNumber(3)}
                            title={'Choix clinique'}
                            hintText={'Sélectionner une clinique pour votre rendez-vous'} />
                        <VStack style={styles.inputBox}>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                                {cliniques.map((p, index) => {
                                    console.log('rended praticiens 2')
                                    return <MedItem
                                        key={p._id}
                                        value={p?._id}
                                        trigger={'lieu'}
                                        handleChange={handleChange}
                                        infosPraticien={null}
                                        infosClinique={p}
                                        index={index}
                                    />
                                })}
                            </ScrollView>
                        </VStack>
                    </VStack>
                </PresenceTransition>}

                {<PresenceTransition
                    visible={(isProfession === true && formData.lieu) || (isProfession === false && formData.lieu)}
                    initial={{
                        opacity: 0
                    }} animate={{
                        opacity: 1,
                        transition: {
                            duration: 250
                        }
                    }}>
                    <VStack mt={5} style={styles.card}>
                        <HeaderBox
                            number={handleStepNumber(4)}
                            title={'Médecin traitant'}
                            hintText={'Sélectionner un praticien pour votre rendez-vous'} />
                        <VStack style={styles.inputBox}>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                                {praticiens.map((p, index) => {
                                    console.log('rended praticiens 2')
                                    return <MedItem
                                        key={p._id}
                                        value={p._id}
                                        trigger={'praticien'}
                                        handleChange={handleChange}
                                        infosPraticien={p}
                                        index={index}
                                    />
                                })}
                            </ScrollView>
                        </VStack>
                    </VStack>
                </PresenceTransition>}

                {/*Periode du rendez-vous*/}
                {<PresenceTransition
                    visible={formData.praticien}
                    initial={{
                        opacity: 0
                    }} animate={{
                        opacity: 1,
                        transition: {
                            duration: 250
                        }
                    }}>
                    <VStack mt={5} style={styles.card}>
                        <HeaderBox
                            number={handleStepNumber(5)}
                            title={'Période du rendez-vous'}
                            hintText={'Sélectionner une période pour votre rendez-vous'} />
                        <VStack style={styles.inputBox}>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                                {generateKeyTab(dispo).map((d, index) =>
                                    <Pressable onPress={() => handleChange('day', d)} key={d}>
                                        <Box
                                            ml={index !== 0 ? 2 : 0}
                                            style={{
                                                ...styles.period,
                                                borderColor: formData.period.day === d ? colors.trans_primary : colors.text_grey_hint,
                                                backgroundColor: formData.period.day === d ? colors.trans_primary : 'transparent',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    ...styles.periodText,
                                                    color: formData.period.day === d?.id ? colors.primary : colors.black,
                                                }}
                                            >
                                                {d}
                                            </Text>
                                        </Box>
                                    </Pressable>
                                )}
                            </ScrollView>

                            <PresenceTransition
                                visible={formData.period.day}
                                initial={{
                                    opacity: 0
                                }} animate={{
                                    opacity: 1,
                                    transition: {
                                        duration: 250
                                    }
                                }}>
                                <HStack mt={5} justifyContent={'space-between'} alignItems={'center'}>
                                    <Box mr={1.5} style={styles.prev}>
                                        <Icon
                                            as={MaterialIcons}
                                            name='keyboard-arrow-left'
                                            size={'lg'}
                                        />
                                    </Box>
                                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                                        <HStack alignItems={'center'}>
                                            {actualDayCreneaux.map((d, index) =>
                                                <Pressable onPress={() => handleChange('time', d.start)} key={d.start}>
                                                    <Box
                                                        ml={index !== 0 ? 2 : 0}
                                                        style={{
                                                            ...styles.period,
                                                            borderColor: formData.period.time === d.start ? colors.trans_primary : colors.text_grey_hint,
                                                            backgroundColor: formData.period.time === d.start ? colors.trans_primary : 'transparent',
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                ...styles.periodText,
                                                                color: formData.period.time === d.start ? colors.primary : colors.black,
                                                            }}
                                                        >
                                                            {d.start}
                                                        </Text>
                                                    </Box>
                                                </Pressable>
                                            )}
                                        </HStack>
                                    </ScrollView>
                                    <Box ml={1.5} style={styles.prev}>
                                        <Icon
                                            as={MaterialIcons}
                                            name='keyboard-arrow-right'
                                            size={'lg'}
                                        />
                                    </Box>
                                </HStack>
                            </PresenceTransition>
                        </VStack>
                    </VStack>
                </PresenceTransition>}
            </ScrollView>
            <VStack width={screenWidth} flex={1} style={styles.btnBox}>
                <Button isDisabled={!formData.period.time} style={styles.btn} onPress={handlePress}>
                    <Text color={colors.white} style={styles.btnLabel}>Valider</Text>
                </Button>
            </VStack>
            <ModaleChoixProfession navigation={navigation} />
        </View >
    )
}

export default MakeAppointment;