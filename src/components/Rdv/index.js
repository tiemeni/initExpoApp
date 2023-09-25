import { View } from 'react-native'
import React, { memo } from 'react'
import { Avatar, Button, Text } from 'native-base'
import colors from '../../constants/colours'
import styles from './style'
import * as SCREENS from '../../constants/screens'
import { Calendar, DocumentText, Location, Map1, Timer1 } from 'iconsax-react-native'
import { transfomeToSlashDate } from '../../utils/helper'

const Rdv = ({ _id, navigation, date, motif, startTime, praticien, status, localisation }) => {
    return (
        <View style={[styles.container]}>
            <View style={styles.topContainer}>
                <View>
                    <Text fontWeight='600' fontSize={16}>{"Dr. " + praticien}</Text>
                    <Text color={colors.text_grey_hint}>{"Genicologue"}</Text>
                </View>
                <Avatar
                    bg={colors.primary}
                    width={42}
                    height={42}
                    source={{
                        uri: null
                    }}></Avatar>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoView}>
                    <View style={styles.left} space={1}>
                        <DocumentText color={colors.text_grey_hint} size={22} />
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.infoText}>{motif ?? ""}</Text>
                    </View>
                    <View style={styles.left}>
                        <Location color={colors.text_grey_hint} size={22} />
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.infoText}>{"Clinique FOUDA"}</Text>
                    </View>
                </View>
                <View style={styles.infoView}>
                    <View style={styles.left}>
                        <Calendar color={colors.text_grey_hint} size={22} />
                        <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.infoText}>{startTime.split(" à ")[0]}</Text>
                    </View>
                    <View style={styles.left}>
                        <Timer1 color={colors.text_grey_hint} size={22} />
                        <Text style={styles.infoText}>{startTime.split(" à ")[1]}</Text>
                    </View>
                </View>
                <View style={[styles.infoView, { justifyContent: 'space-between', gap: 10, marginTop: 15 }]}>
                    {localisation && <Button style={styles.mapBtn} onPress={() => navigation.navigate(SCREENS.GOOGLE_MAP, { localisation })}>
                        <Map1 color={colors.primary} />
                    </Button>}
                    <Button onPress={() => navigation.navigate(SCREENS.APPOINTMENT_DETAILS_SCREEN, { _id: _id })} style={styles.reportBtn}>
                        <Text style={styles.reportText}>Afficher</Text>
                    </Button>
                </View>
            </View>
        </View >
    )
}

export default memo(Rdv)