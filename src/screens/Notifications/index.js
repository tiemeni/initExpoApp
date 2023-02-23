import { Box, Text, View, VStack } from 'native-base';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import NotificationsCard from '../../components/NotificationsCard';
import styles from './styles';
import { notifications } from '../../utils/helper';

const Notifications = () => {
    return (
        <View style={styles.container}>
            <Text mb={5} style={styles.headerTitle}>Notifications</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
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