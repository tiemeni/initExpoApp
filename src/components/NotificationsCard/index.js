import { Text, Box, HStack } from "native-base";
import styles from "./styles";
import {EmojiNormal, EmojiSad, EmojiHappy} from 'iconsax-react-native'
import colors from "../../constants/colours";

const NotificationsCard = ({ notification }) => {
    return (
        <Box mb={3} style={styles.card}>
            <HStack style={styles.footerLink}>
                <Box mb={2} bgColor={notification.bg} style={styles.headLabel}>
                    <Text color={notification.color} style={styles.label}>{notification.triggeredBy}</Text>
                </Box>
                <Text style={styles.footerDate}>{notification.date}</Text>
            </HStack>
            <Box mb={3} style={styles.content}>
                <Text mb={1} style={styles.contentTitle}>{notification.title}</Text>
                <Text style={styles.contentBody}>
                    {notification.content}
                </Text>
                {notification.status === 'completed' &&
                    <HStack mt={2} style={styles.userReact} space={5}>
                        <Box style={styles.emoji}><EmojiSad color={colors.danger} size={60}  variant="Bulk"/></Box>
                        <Box style={styles.emoji}><EmojiNormal color={colors.primary} size={60} variant="Bulk" /></Box>
                        <Box style={styles.emoji}><EmojiHappy color={colors.success} size={60}  variant="Bulk"/></Box>
                    </HStack>}
            </Box>
            <Box style={styles.footerLink}>
                <Text style={styles.footerText}>Afficher les détails</Text>
            </Box>
        </Box>
    )
}

export default NotificationsCard;