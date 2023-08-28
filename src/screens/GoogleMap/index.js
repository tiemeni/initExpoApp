import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";

const clinic = { name: "Clinic 1", latitude: 3.8119272, longitude: 11.5120402 };

const RoadMap = ({ route }) => {
    const [origin, setOrigin] = useState(null);
    const [waypoints, setWaypoints] = useState([]);
    const clinic = { name: "your position", latitude: parseFloat(route?.params?.localisation?.latitude), longitude: parseFloat(route?.params?.localisation?.longitude) }

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            console.log("Permission denied");
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setOrigin({ latitude, longitude });

        const customWaypoints = [
            { latitude: latitude + 0.01, longitude: longitude + 0.01 },
            { latitude: latitude + 0.005, longitude: longitude - 0.005 },
            clinic,
        ];
        setWaypoints(customWaypoints);
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: origin ? origin.latitude : clinic.latitude,
                    longitude: origin ? origin.longitude : clinic.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {origin && <Marker coordinate={origin} title="Origin" />}
                <Marker
                    coordinate={{ latitude: clinic.latitude, longitude: clinic.longitude }}
                    title={clinic.name}
                />
                {waypoints.length > 0 && (
                    <MapViewDirections
                        origin={origin}
                        waypoints={waypoints}
                        destination={clinic}
                        apikey="AIzaSyBBSorwkq8kqK0sqwHdGTes3jNBMRcGlTU"
                        strokeWidth={2}
                        strokeColor="blue"
                    />
                )}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default RoadMap;