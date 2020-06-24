import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import mapStyles from "./utils/mapStyles";

export default function App() {
  const map = useRef(null);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getLocation = async () => {
    const { granted } = await Location.requestPermissionsAsync();
    if (!granted) return;
    const {
      coords: { latitude, longitude },
    } = await Location.getLastKnownPositionAsync();
    setLocation({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    map.current.animateCamera(
      {
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      1
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        ref={map}
        provider="google"
        showsUserLocation
        showsCompass
        showsMyLocationButton
        initialRegion={location}
        style={styles.mapStyle}
        onRegionChange={(newLocaction) => {
          setLocation(newLocaction);
        }}
        customMapStyle={mapStyles}
      >
        <Marker coordinate={location} />
      </MapView>
      <View style={styles.details}>
        <Text style={styles.label}>Latitude: {location.latitude}</Text>
        <Text style={styles.label}>Longitude: {location.longitude}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    flex: 0.7,
  },
  details: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  label: {
    height: 80,
    width: 200,
    padding: 20,
    margin: 5,
    backgroundColor: "darkcyan",
    color: "#fff",
  },
});
