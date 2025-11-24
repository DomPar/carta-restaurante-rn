import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapSection() {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 48.8584,
                    longitude: 2.2945,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker
                    coordinate={{ latitude: 48.8584, longitude: 2.2945 }}
                    title="Camper Café"
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 80,
        borderRadius: 8,
        overflow: "hidden",
        marginLeft: 8,
    },
    map: {
        flex: 1,
    },
});
