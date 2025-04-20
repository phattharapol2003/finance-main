import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

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

const PlaceCard = ({ data }) => {
  const navigation = useNavigation();
  const { name, status, rating, description, images } = data;

  const [distance, setDistance] = useState('');

  useEffect(() => {
    const fetchDistance = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;

        let location = await Location.getCurrentPositionAsync({});
        const userLat = location.coords.latitude;
        const userLon = location.coords.longitude;

        if (data.latitude && data.longitude) {
          const dist = getDistanceFromLatLonInKm(
            userLat,
            userLon,
            data.latitude,
            data.longitude
          );
          setDistance(dist.toFixed(1) + ' กม.');
        }
      } catch (error) {
        console.error('Error calculating distance:', error);
      }
    };

    fetchDistance();
  }, []);

  const handleExplore = () => {
    navigation.navigate('PlaceDetail', { placeId: data.id });
  };

  return (
    <View style={styles.card}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
  {images.map((img, idx) => (
    <Image key={idx} source={img} style={styles.image} />
  ))}
</ScrollView>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{name}</Text>
          {distance ? (
            <View style={styles.distanceBadge}>
              <Icon name="map-pin" type="feather" size={14} color="#555" />
              <Text style={styles.distanceText}>{distance}</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.status}>{status}</Text>
        <View style={styles.rating}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Icon
              key={i}
              name="star"
              type="feather"
              size={18}
              color={i <= rating ? '#FFA500' : '#ccc'}
            />
          ))}
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={handleExplore}>
            <Icon name="map-pin" type="feather" size={16} color="#fff" />
            <Text style={styles.buttonText}>สำรวจ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary}>
            <Icon name="share" type="feather" size={16} color="#333" />
            <Text style={styles.buttonTextSecondary}>แชร์</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  imagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginTop: 8, // ← เพิ่มตรงนี้ได้เหมือนกัน
  },
  
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: '#222',
  },
  distanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  distanceText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#333',
  },
  status: {
    fontSize: 13,
    color: '#2E8B57',
    marginTop: 4,
  },
  rating: {
    flexDirection: 'row',
    marginTop: 6,
  },
  description: {
    marginTop: 8,
    fontSize: 13,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 14,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F68BA1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
  },
  buttonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7EDF1',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  buttonTextSecondary: {
    color: '#333',
    fontWeight: '600',
    marginLeft: 6,
  },
  imageScroll: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  image: {
    width: 120,
    height: 90,
    marginRight: 8,
    borderRadius: 10,
  }
  
});

export default PlaceCard;
