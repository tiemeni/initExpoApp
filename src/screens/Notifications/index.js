import { Box, Text, View, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import NotificationsCard from '../../components/NotificationsCard';
import styles from './styles';
import { notifications } from '../../utils/helper';
import CustomHeader from '../../components/CustomHeader';
import { PROFILE } from '../../constants/screens';
import { SkeletteNotif } from './squeletteNotif';

const Notifications = ({ navigation }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    })

    return (
        <Box flex={1} mb={3}>
            <Box style={styles.container}>
                <Text mb={3} style={styles.headerTitle}>Notifications</Text>
                <ScrollView
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}>
                    {!loading ? <>
                        <Box>
                            <Text mb={3} style={styles.groupTitle}>Aujourd'hui</Text>
                            <VStack>
                                {notifications.map((notif, i) => <NotificationsCard key={notif.id} notification={notif} />)}
                            </VStack>
                        </Box>
                        <Box mb={5}>
                            <Text mb={3} style={styles.groupTitle}>Hier</Text>
                            <VStack>
                                {notifications.map((notif, i) => <NotificationsCard key={notif.id} notification={notif} />)}
                            </VStack>
                        </Box>
                    </> :
                        (
                            <VStack padding={1} space={1} mt={5}>
                                <VStack>
                                    <SkeletteNotif />
                                </VStack>
                                <VStack>
                                    <SkeletteNotif />
                                </VStack>
                                <VStack>
                                    <SkeletteNotif last={true} />
                                </VStack>
                            </VStack>)

                    }

                </ScrollView>
            </Box>
        </Box>
    );
}

export default Notifications