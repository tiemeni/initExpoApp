import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, Box, View, VStack, ScrollView, Stack, HStack, Image, Select, CheckIcon, Pressable, Divider, Icon, Button, } from "native-base";
import * as SCREENS from "../../constants/screens";
import CustomHeader from "../../components/CustomHeader";
import colors from "../../constants/colours";
import CardInfo from "../../components/CardInfo";
import filter from "../../assets/img/filter.png"
import moment from "moment"
import arrowDown from "../../assets/img/down-arrow.png"
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import styles from "./style"
import { creneauxOfDay, dayOfWeek, generateKeyTab, generateValuesTab, goFromDayToNumber } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { getDispo } from "../../redux/RDV/actions";




export const ReportRDV = ({ route }) => {
    const [showDate, setShowDate] = useState(false)
    const dispos = useSelector(state => state.RdvForm.dispo)
    const [selectedDay, setSelectedDay] = useState("")
    const [selectedHour, setSelectedHour] = useState("")
    const [selectedHours, setSelectedHours] = useState(generateValuesTab(generateKeyTab(dispos)[0], dispos))
    const [selectedTosearchDay, setSelectedToSearchDay] = useState('')

    const dispatch = useDispatch()
    const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"))
    const [day, setDay] = useState(goFromDayToNumber("lundi"))
    const [creneau, setCreneau] = useState('08:00-17:00')
    const { params } = route
    const { appointment } = params
    const { navigation } = params
    const { patient } = appointment
    const handleSelectDay = (day) => {
        setSelectedDay(day)
        setSelectedHours(generateValuesTab(day, dispos))
    }
    const handleOpenDatePicker = () => {
        setShowDate(true)
    }

    useEffect(() => {
        setSelectedDay('')
        setSelectedHour('')
        setSelectedHours([])
        dispatch(getDispo({ idCentre: appointment?.patient?.idCentre, idp: appointment?.resourceId, creneau: creneau, date: date, day: day }))
        //console.log(appointment?.resourceId, appointment?.patient?.idCentre)
    }, [date, day, creneau])


    return (
        <View flex={1}>
            <CustomHeader navigation={navigation} mb={5} screen={SCREENS.PROFILE} />
            <ScrollView px={4} >
                <VStack space={4}>
                    <Stack>
                        <CardInfo
                            lieu={'Clinique FOUDA'}
                            patient={appointment?.patient?.name + " " + appointment?.patient?.surname}
                            motif={appointment?.motif}
                            infos={"23 ans, 85Kg, Homme"}
                            status={appointment?.status}
                            date={appointment?.displayedDate}
                        />
                    </Stack>
                    <VStack style={{ ...styles.secondCard }} px={3} space={2}>
                        <HStack style={{ ...styles.secondCardSection1 }}>
                            <VStack style={{ ...styles.masquerBox }}>
                                <Box style={{ ...styles.boxFilter }}>
                                    <Image source={filter} alt="" style={{ ...styles.imgMask }} />
                                </Box>
                                <Text>Masquer</Text>
                            </VStack>
                            <Text style={{
                                color: colors.yellow,
                            }}>Choisir un autre centre</Text>
                        </HStack>
                        <HStack style={{ ...styles.secondCardSection2 }}>
                            <VStack style={{
                                width: "33%",
                            }}>
                                <Text>A partir du:</Text>
                                <Pressable onPress={handleOpenDatePicker}>
                                    <Box style={{ ...styles.datePicker }}>
                                        <Text style={{ fontSize: 14 }}>{date}</Text>
                                    </Box>
                                </Pressable>
                                {showDate && <DateTimePicker
                                    testID="dateTimePicker"
                                    customStyles={{
                                        datePicker: { backgroundColor: '"black' }
                                    }}
                                    value={new Date()}
                                    mode="date"
                                    display="default"
                                    collapsable
                                    onChange={(e, s) => {
                                        setShowDate(false)
                                        setDate(moment(s).format("YYYY-MM-DD"))
                                        dispatch(getDispo({
                                            idCentre: appointment?.patient?.idCentre,
                                            idp: appointment?.resourceId,
                                            date: moment(s).format("YYYY-MM-DD")
                                        }))
                                    }}
                                    accentColor={colors.primary}
                                    style={{ backgroundColor: colors.primary }}
                                />}
                            </VStack>
                            <VStack style={{
                                width: "30%"
                            }}>
                                <Text>Tous les:</Text>
                                <Select
                                    shadow={2}
                                    accessibilityLabel=""
                                    placeholder=""
                                    borderRadius={10}
                                    style={{ ...styles.select }}
                                    fontSize={14}
                                    dropdownIcon={<Image source={arrowDown} style={{ ...styles.dropDownIcon }} alt="" />}
                                    _light={{ _hover: { bg: "coolGray.200" }, _focus: { bg: "coolGray.200:alpha.70" } }}
                                    _dark={{
                                        bg: "coolGray.800", _hover: { bg: "coolGray.900" },
                                        _focus: { bg: "coolGray.900:alpha.70" }
                                    }}
                                    selectedValue={day}
                                    onValueChange={itemValue => setDay(() => {
                                        dispatch(getDispo({
                                            idCentre: appointment?.patient?.idCentre,
                                            idp: appointment?.resourceId,
                                            date: date,
                                            day: itemValue,
                                        }))
                                        return itemValue
                                    })}>
                                    {dayOfWeek.map((d) => <Select.Item key={d} shadow={2} label={d} value={goFromDayToNumber(d)} />)}
                                </Select>
                            </VStack>
                            <VStack style={{
                                width: "30%"
                            }}>
                                <Text>Créneau:</Text>
                                <Select
                                    shadow={2}
                                    accessibilityLabel=""
                                    placeholder=""
                                    borderRadius={10}
                                    style={{
                                        height: 30,
                                        width: 60,
                                        fontSize: 14
                                    }}
                                    dropdownIcon={<Image source={arrowDown} style={{ ...styles.dropDownIcon }} alt="" />}
                                    _light={{ _hover: { bg: "coolGray.200" }, _focus: { bg: "coolGray.200:alpha.70" } }}
                                    _dark={{
                                        bg: "coolGray.800", _hover: { bg: "coolGray.900" },
                                        _focus: { bg: "coolGray.900:alpha.70" }
                                    }}
                                    selectedValue={creneau}
                                    onValueChange={itemValue => setCreneau(() => {
                                        dispatch(getDispo({
                                            idCentre: appointment?.patient?.idCentre,
                                            idp: appointment?.resourceId,
                                            date: date,
                                            day: day,
                                            creneau: itemValue
                                        }))
                                        return itemValue
                                    })}>
                                    {creneauxOfDay.map(e => <Select.Item key={e} shadow={2} label={e} value={e} />)}
                                </Select>
                            </VStack>
                        </HStack>
                        <Box style={{ ...styles.dividerBox }}>
                            <Divider width={"90%"} color={colors.normal_gray} />
                        </Box>
                        <Text style={{ ...styles.nextDispoLabel }}>Prochaines disponibilités</Text>
                        <Text style={{ ...styles.rdvDayLabel }}>jour du rendez-vous</Text>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            <HStack alignItems={'center'}>
                                {generateKeyTab(dispos)?.map((d, index) =>
                                    <Pressable key={index} onPress={() => handleSelectDay(d)}>
                                        <Box
                                            ml={index !== 0 ? 2 : 0}
                                            style={{
                                                ...styles.jourRdvBox,
                                                borderColor: selectedDay === d ? colors.trans_primary : colors.text_grey_hint,
                                                backgroundColor: selectedDay === d ? colors.trans_primary : 'transparent',
                                            }}
                                        >
                                            <Text style={{ color: colors.black, }}>
                                                {d}
                                            </Text>
                                        </Box>
                                    </Pressable>
                                )}
                            </HStack>
                        </ScrollView>
                        <Text style={{ ...styles.rdvHoureLabel }}>Heure du rendez-vous</Text>
                        {selectedHours?.length > 0 ?
                            <HStack alignItems={'center'} justifyContent={"center"} mb={5}>
                                <Box mr={1.5} style={{ ...styles.arrowScrollView }}><Icon
                                    as={MaterialIcons}
                                    name='keyboard-arrow-left'
                                    size={'lg'}
                                />
                                </Box>
                                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                                    <HStack alignItems={"center"}>
                                        {selectedHours?.map((d, index) =>
                                            <Pressable key={index} onPress={() => setSelectedHour(d?.start)}>
                                                <Box
                                                    ml={index !== 0 ? 2 : 0}
                                                    style={{
                                                        ...styles.hourRdvBox,
                                                        borderColor: selectedHour === d?.start ? colors.trans_primary : colors.text_grey_hint,
                                                        backgroundColor: selectedHour === d?.start ? colors.trans_primary : 'transparent',
                                                    }}
                                                >
                                                    <Text style={{ color: selectedHour === d?.start ? colors.primary : colors.black, }}>
                                                        {d?.start}
                                                    </Text>
                                                </Box>
                                            </Pressable>
                                        )}
                                    </HStack>
                                </ScrollView>
                                <Box ml={1.5} style={{ ...styles.arrowScrollView }}>
                                    <Icon
                                        as={MaterialIcons}
                                        name='keyboard-arrow-right'
                                        size={'lg'}
                                    />
                                </Box>
                            </HStack>
                            : <Text style={{ color: selectedDay ? "red" : colors.primary }}>{selectedDay ? "Aucun creneau libre pour ce jour" : "choisissez un jour de rdv"}</Text>}
                    </VStack>
                </VStack>
            </ScrollView >
            <VStack width={"100%"} style={{
                width: '100%',
                padding: 10,
                top: 0
            }}>
                <Button style={{
                    height: 50,
                    width: '100%',
                    borderRadius: 10,
                    borderColor: colors.primary,
                }} >
                    <Text color={colors.white} style={{
                        fontSize: 18
                    }}>Valider</Text>
                </Button>
            </VStack>
        </View >
    )
}