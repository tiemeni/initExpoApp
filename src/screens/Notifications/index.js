import { Box, Text, View, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import NotificationsCard from '../../components/NotificationsCard';
import styles from './styles';
import { notifications } from '../../utils/helper';
import { IsLoadingComponent } from '../MesRdv';

const Notifications = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    })

    if (loading) {
        return <VStack mt={5}>
            <IsLoadingComponent />
        </VStack>
    }

    return (
        <View style={styles.container}>
            <Text mb={5} style={styles.headerTitle}>Notifications</Text>
            <ScrollView overScrollMode='never' showsVerticalScrollIndicator={false}>
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
            </ScrollView>
        </View>
    )
}

export default Notifications