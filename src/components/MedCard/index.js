import { React } from 'react';
import { Box, HStack, Text, VStack, Icon, Pressable, Avatar } from 'native-base';
import { Entypo, Fontisto } from '@expo/vector-icons';
import colors from "../../constants/colours";
import styles from "./style";
import { Image } from 'react-native';
import * as SCREENS from "../../constants/screens";
import { useNavigation } from '@react-navigation/native';
import { isSpecialist, searchByName } from '../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { setIdCentre, setShouldSeeBehind } from '../../redux/commons/action';
import { getMotifs, getSpecialities, setRDVForm } from '../../redux/RDV/actions';




const MedCard = ({ praticien }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const professions = useSelector(state => state.Profession.professions)

    return (
        <VStack space={3} flex={1} style={styles.medBox}>
            <Box style={styles.medPic}>
            </Box>

            <VStack>
                <HStack mt={1}>
                    <Icon
                        color={colors.primary}
                        as={<Fontisto name="doctor" />}
                        size='md'
                        style={styles.icon}
                    />
                    <Text style={styles.medName}>Dr {praticien.name}</Text>
                </HStack>
                <HStack mt={4}>
                    <Icon
                        color={colors.text_grey_hint}
                        as={<Entypo name="location-pin" />}
                        size='md'
                        style={styles.icon}
                    />
                    <Text style={styles.location}>{praticien?.affectation[0]?.label ?? "Abscence de Clinque"}</Text>
                </HStack>
                <HStack mt={2}>
                    <Icon
                        color={colors.secondary}
                        as={<Entypo name="wallet" />}
                        size='md'
                        style={styles.icon}
                    />
                    <Text style={styles.tarif}>A partir de {praticien.cost ?? "5000"} Fcfa</Text>
                </HStack>

                <Pressable
                    style={styles.rdvBtn}
                    onPress={() => {
                        dispatch(setShouldSeeBehind(true))
                        dispatch(setRDVForm(
                            {
                                motif: null,
                                praticien: null,
                                profession: praticien?.job ? searchByName(professions, "Specialiste") : searchByName(professions, "Generaliste"),
                                period: {
                                    day: null,
                                    time: null
                                }
                            }
                        ))
                        praticien?.job && dispatch(getSpecialities(searchByName(professions, "Specialiste")))
                        praticien?.job && dispatch(getMotifs({ id: searchByName(professions, "Generaliste") }))
                        praticien?.job && dispatch(setIdCentre(praticien?.idCentre))
                        praticien?.job && navigation.navigate(SCREENS.MAKE_APPOINTMENT_SCREEN,
                            {
                                idp: praticien?._id,
                                isSpecialist: !!praticien?.job,
                                idSpeciality: praticien?.job,
                                affectation: praticien?.affectation,
                            }
                        )
                    }
                    }>
                    <Text color={colors.white}>Prendre un RDV</Text>
                </Pressable>
            </VStack>
        </VStack>
    )
}

export default MedCard;