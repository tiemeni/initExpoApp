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
    const shouldSeeBehind = useSelector(state => state.Common.shouldSeeBehind)
    const screenWidth = Dimensions.get('screen').width;
    const dispatch = useDispatch()
    console.log("-----", shouldSeeBehind)
    const [wait, setWait] = useState(true)
    const [formData, setFormData] = React.useState({
        motif: null,
        praticien: null,
        profession: isProfession,
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
                break;
            case 'profession':
                setFormData({
                    ...formData,
                    profession: value,
                });
                break;
            case 'speciality':
                setFormData({
                    ...formData,
                    speciality: value,
                });
                break;
            case 'lieu':
                setFormData({
                    ...formData,
                    lieu: value,
                });
                break;
            case 'day':
                setFormData({
                    ...formData,
                    period: { time: null, day: value }
                });
                break;
            case 'time':
                setFormData({ ...formData, period: { ...formData.period, time: value } });
                break;
            default:
                break;
        }
    }

    const handlePress = () => {
        console.log(formData)
        navigation.navigate(SCREENS.PAYMENT)
    }

    useEffect(() => {
        // setTimeout(() => {
        //     setWait(false)
        // }, 2000)
    })

    useEffect(() => {
        return () => {
            console.log('out')
            dispatch(setShouldSeeBehind(false))
        }
    }, [])

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
            <ScrollView showsVerticalScrollIndicator={false} height={"80%"} borderColor={'red'}>
                {shouldSeeBehind && isProfession === true && <VStack mt={5} style={styles.card}>
                    <HeaderBox
                        number={1}
                        title={'Spécialité du rendez-vous'}
                        hintText={'Sélectionnez une specialité pour votre rendez-vous'} />
                    <VStack style={styles.inputBox}>
                        <Box>
                            <SelectList
                                setSelected={(val) => {
                                    console.log(val)
                                    handleChange('speciality', val)
                                }}
                                data={motifs.map((e) => {
                                    return { key: e.id, value: e.label }
                                })}
                                save="value"
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
                                    return { key: e.id, value: e.label }
                                })}
                                save="value"
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
                                {practiciens.map((p, index) => {
                                    console.log('rended praticiens 2')
                                    return <MedItem
                                        key={p.id}
                                        value={formData.lieu}
                                        trigger={'lieu'}
                                        handleChange={handleChange}
                                        infosPraticien={p}
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
                                {practiciens.map((p, index) => {
                                    console.log('rended praticiens 2')
                                    return <MedItem
                                        key={p.id}
                                        value={formData.praticien}
                                        handleChange={() => handleChange("praticien", p?.id)}
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
                                {appointmentDate.map((d, index) =>
                                    <Pressable onPress={() => handleChange('day', d.id)} key={d.id}>
                                        <Box
                                            ml={index !== 0 ? 2 : 0}
                                            style={{
                                                ...styles.period,
                                                borderColor: formData.period.day === d.id ? colors.trans_primary : colors.text_grey_hint,
                                                backgroundColor: formData.period.day === d.id ? colors.trans_primary : 'transparent',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    ...styles.periodText,
                                                    color: formData.period.day === d.id ? colors.primary : colors.black,
                                                }}
                                            >
                                                {d.date}
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
                                            {disponibilites.map((d, index) =>
                                                <Pressable onPress={() => handleChange('time', d.id)} key={d.id}>
                                                    <Box
                                                        ml={index !== 0 ? 2 : 0}
                                                        style={{
                                                            ...styles.period,
                                                            borderColor: formData.period.time === d.id ? colors.trans_primary : colors.text_grey_hint,
                                                            backgroundColor: formData.period.time === d.id ? colors.trans_primary : 'transparent',
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                ...styles.periodText,
                                                                color: formData.period.time === d.id ? colors.primary : colors.black,
                                                            }}
                                                        >
                                                            {d.period}
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