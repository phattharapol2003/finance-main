import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

const Review = ({ route, navigation }) => {
  const { placeName } = route.params;
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');

  const handlePost = () => {
    console.log({
      placeName,
      rating,
      reviewText,
      selectedDay,
      selectedDuration,
    });
    navigation.goBack(); // หรือจะให้กลับไปหน้า PlaceDetail ก็ได้
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>{placeName}</Text>
      <Text style={styles.label}>ให้คะแนน</Text>
      <AirbnbRating
        count={5}
        defaultRating={rating}
        size={30}
        showRating={false}
        onFinishRating={(val) => setRating(val)}
      />

      <TextInput
        style={styles.input}
        placeholder="บอกเล่าประสบการณ์ให้เราฟังหน่อย"
        value={reviewText}
        onChangeText={setReviewText}
        multiline
      />

      <Text style={styles.label}>คุณเดินทางไปในช่วงใด</Text>
      <View style={styles.buttonRow}>
        {['วันธรรมดา', 'วันเสาร์-อาทิตย์', 'วันหยุดนักขัตฤกษ์'].map((d) => (
          <TouchableOpacity
            key={d}
            style={[
              styles.optionButton,
              selectedDay === d && styles.selectedButton,
            ]}
            onPress={() => setSelectedDay(d)}
          >
            <Text>{d}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>คุณรอนานเท่าใด</Text>
      <View style={styles.buttonRow}>
        {['ไม่น่ารอ', 'ไม่เกิน 10 นาที', '10 - 30 นาที', '30 - 60 นาที', 'มากกว่า 1 ชม.'].map((t) => (
          <TouchableOpacity
            key={t}
            style={[
              styles.optionButton,
              selectedDuration === t && styles.selectedButton,
            ]}
            onPress={() => setSelectedDuration(t)}
          >
            <Text>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.postButton} onPress={handlePost}>
        <Text style={styles.postButtonText}>โพสต์</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  label: { marginTop: 15, marginBottom: 5, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 10,
  },
  optionButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 4,
  },
  selectedButton: {
    backgroundColor: '#F3BAC0',
  },
  postButton: {
    marginTop: 20,
    backgroundColor: '#F3BAC0',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Review;
