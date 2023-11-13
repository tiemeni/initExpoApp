import { Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import NotificationsCard from "../../components/NotificationsCard";
import styles from "./styles";
import { SkeletteNotif } from "./squeletteNotif";
import { connect, useDispatch } from "react-redux";
import {
  getUserNotifications,
  markAsReaded,
} from "../../redux/notifications/actions";
import { Alert, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Notification1 } from "iconsax-react-native";
import colors from "../../constants/colours";

const AlternativeComponent = ({ isLoading }) => {
  return isLoading ? (
    <VStack padding={1} space={1}>
      <View>
        <SkeletteNotif />
      </View>
      <View>
        <SkeletteNotif />
      </View>
      <View>
        <SkeletteNotif />
      </View>
    </VStack>
  ) : (
    <View style={styles.emptyNotif}>
      <Notification1 color={colors.text_grey_hint} size={80} />
      <Text style={styles.emptyMsg}>
        Vous n'avez aucune notification pour l'instant
      </Text>
    </View>
  );
};

const Notifications = ({ ...props }) => {
  const { iduser, error, message, isLoading, notifications } = props;
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [loading, setLoading] = useState(isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(markAsReaded(iduser));
    dispatch(getUserNotifications(iduser));
  }, []);

  useEffect(() => {
    setNotificationsList(notifications);
  }, [notifications]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (error) Alert.alert("Erreur", message);
  }, [error]);

  return (
    <View style={styles.container}>
      <Text mb={3} style={styles.headerTitle} fontWeight={600}>
        Notifications
      </Text>
      <View style={styles.flashList}>
        <FlashList
          estimatedItemSize={20}
          data={notificationsList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<AlternativeComponent isLoading={loading} />}
          renderItem={({ item }) => <NotificationsCard notification={item} />}
        />
      </View>
    </View>
  );
};

const mapStateToProps = ({ Notifications, UserReducer }) => ({
  notifications: Notifications.notifications,
  isLoading: Notifications.isLoading,
  error: Notifications.error,
  renderKey: Notifications.renderKey,
  message: Notifications.message,
  iduser: UserReducer.userInfos.user._id,
});

export default connect(mapStateToProps)(Notifications);
