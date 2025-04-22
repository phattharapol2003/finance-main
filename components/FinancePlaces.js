import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import FinanceCard from "./FinanceCard";
import { PLACES } from '../data/Moneyplaces';

const FinancePlaces = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ความรัก</Text>
      {PLACES.map((place) => (
        <FinanceCard key={place.id} data={place} navigation={navigation} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 20,
  },
});
// ✅ export default ให้ตรงชื่อ component
export default FinancePlaces;

