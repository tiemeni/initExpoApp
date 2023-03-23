import React, { useEffect } from 'react';
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
    const screenWidth = Dimensions.get('screen').width;
    const [formData, setFormData] = React.useState({
        motif: null,
        praticien: null,
        period: {
            day: null,
            time: null
        }
    });

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
        navigation.navigate(SCREENS.PAYMENT)
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

            <VStack mt={5} style={styles.card}>
                <HeaderBox
                    number={1}
                    title={'Motif du rendez-vous'}
                    hintText={'Sélectionnez un motif pour votre rendez-vous'} />
                <VStack style={styles.inputBox}>
                    <Box>
                        <Select
                            selectedValue={formData.motif}
                            onValueChange={(v) => handleChange('motif', v)}
                            placeholder='Choix du motif'
                            height={10}
                            borderRadius={10}
                            dropdownIcon={
                                <Icon
                                    as={MaterialIcons}
                                    name='keyboard-arrow-down'
                                    mr={2}
                                    size={'lg'} />
                            }
                            size={7}>
                            {motifs.map(motif =>
                                <Select.Item key={motif.id} label={motif.label} value={motif.value} />
                            )}
                        </Select>
                    </Box>
                </VStack>
            </VStack>

            {/*Medecin traitant*/}
            <PresenceTransition
                visible={formData.motif}
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
                        number={2}
                        title={'Médecin traitant'}
                        hintText={'Sélectionner un praticien pour votre rendez-vous'} />
                    <VStack style={styles.inputBox}>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            {practiciens.map((p, index) =>
                                <MedItem
                                    key={p.id}
                                    value={formData.praticien}
                                    handleChange={handleChange}
                                    infosPraticien={p}
                                    index={index}
                                />
                            )}
                        </ScrollView>
                    </VStack>
                </VStack>
            </PresenceTransition>

            {/*Periode du rendez-vous*/}
            <PresenceTransition
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
                        number={3}
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
            </PresenceTransition>


            <VStack width={screenWidth} flex={1} style={styles.btnBox}>
                <Button isDisabled={!formData.period.time} style={styles.btn} onPress={handlePress}>
                    <Text color={colors.white} style={styles.btnLabel}>Valider</Text>
                </Button>
            </VStack>
        </View>
    )
}

export default MakeAppointment;