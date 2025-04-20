import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { Icon } from "@rneui/themed";
import { PLACES } from "../data/places";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { Platform } from "react-native";

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const PlaceDetail = ({ route, navigation }) => {
  const { placeId } = route.params;
  const place = PLACES.find((p) => p.id === placeId);
  if (!place) {
    return (
      <View style={styles.container}>
        <Text>ไม่พบข้อมูลสถานที่</Text>
      </View>
    );
  }

  const [distance, setDistance] = useState("");

  useEffect(() => {
    const fetchDistance = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const userLat = location.coords.latitude;
      const userLon = location.coords.longitude;

      if (place.latitude && place.longitude) {
        const dist = getDistanceFromLatLonInKm(
          userLat,
          userLon,
          place.latitude,
          place.longitude
        );
        setDistance(dist.toFixed(1) + " กม.");
      }
    };

    fetchDistance();
  }, []);

  const scrollRef = useRef(null);
  const sectionRefs = {
    map: useRef(null),
    offerings: useRef(null),
    mantra: useRef(null),
  };

  const scrollToSection = (key) => {
    sectionRefs[key].current?.measureLayout(
      scrollRef.current,
      (x, y) => scrollRef.current.scrollTo({ y, animated: true }),
      () => {}
    );
  };

  const openMap = () => {
    const query = encodeURIComponent(place.name);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView ref={scrollRef} style={styles.container}>
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>{place.name}</Text>
        <TouchableOpacity
          style={styles.reviewButton}
          onPress={() => navigation.navigate("Review", { placeId })}
        >
          <Text style={styles.reviewButtonText}>รีวิว</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaInfoRow}>
          <View style={styles.statusDistanceRow}>
            <Text style={styles.status}>{place.status}</Text>
            {distance ? <Text style={styles.distance}>{distance}</Text> : null}
          </View>
        </View>
        <View style={styles.ratingRow}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Icon
              key={i}
              name="star"
              type="feather"
              size={18}
              color={i <= place.rating ? "#FFA500" : "#ccc"}
            />
          ))}
        </View>
      </View>

      <View style={styles.tagsRow}>
        {[
          { key: "map", label: "เส้นทาง" },
          { key: "offerings", label: "ของบูชา" },
          { key: "mantra", label: "คาถา" },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tagButton}
            onPress={() => scrollToSection(item.key)}
          >
            <Text style={styles.tagText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.imagesSection}>
        <Image source={place.images[0]} style={styles.mainImageLarge} />
        <View style={styles.grid4Images}>
          {place.images.slice(1, 5).map((img, index) => (
            <Image key={index} source={img} style={styles.gridImage} />
          ))}
        </View>
      </View>

      <Text style={styles.description}>{place.description}</Text>
      <Text style={styles.description}>
        <Icon name="map-pin" type="feather" size={16} /> {place.address}
      </Text>

      {place.latitude && place.longitude && (
        <View ref={sectionRefs.map} style={styles.mapContainer}>
          <TouchableOpacity onPress={openMap} activeOpacity={0.9} style={{ flex: 1 }}>
            <MapView
              provider={PROVIDER_DEFAULT}
              style={styles.mapStyle}
              region={{
                latitude: place.latitude,
                longitude: place.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              pointerEvents="none"
            >
              <Marker
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
                }}
                title={place.name}
              />
            </MapView>
          </TouchableOpacity>
        </View>
      )}

      {["directions", "buses", "pier", "open", "locationNote"].map((field, idx) => (
        <Text key={idx} style={styles.description}>
          <Icon
            name={{
              directions: "map",
              buses: "truck",
              pier: "navigation",
              open: "clock",
              locationNote: "info",
            }[field]}
            type="feather"
            size={16}
          /> {place[field]}
        </Text>
      ))}

      <View ref={sectionRefs.offerings}>
        <Text style={styles.subTitle}>ของบูชา</Text>
        {place.offerings.map((item, idx) => (
          <Text key={idx} style={styles.description}>• {item}</Text>
        ))}
      </View>

      <View ref={sectionRefs.mantra}>
        <Text style={styles.subTitle}>คาถา</Text>
        {place.mantras.map((line, idx) => (
          <Text key={idx} style={styles.description}>{line}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerBar: {
    backgroundColor: "#FDD9E2",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerText: { fontSize: 24, fontWeight: "bold", color: "#333" },
  reviewButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  reviewButtonText: { fontWeight: "bold", color: "#333" },
  metaRow: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },
  metaInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  statusDistanceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: { fontSize: 13, fontWeight: "600", color: "#00CC99", marginRight: 12 },
  distance: { fontSize: 13, color: "#333" },
  ratingRow: { flexDirection: "row", marginBottom: 6 },
  tagsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 10,
    marginBottom: 16,
  },
  tagButton: {
    backgroundColor: "#F7EDF1",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tagText: { fontSize: 13, fontWeight: "500", color: "#000" },
  imagesSection: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  mainImageLarge: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 12,
  },
  grid4Images: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridImage: {
    width: "48%",
    height: 100,
    borderRadius: 12,
    marginBottom: 10,
  },
  description: {
    paddingHorizontal: 16,
    fontSize: 13,
    lineHeight: 20,
    color: "#333",
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 24,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#EEE",
    backgroundColor: "#F7EDF1",
    color: "#000",
  },
  mapContainer: {
    marginHorizontal: 16,
    marginTop: 8,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
  },
  mapStyle: {
    flex: 1,
    borderRadius: 12,
  },
});

export default PlaceDetail;