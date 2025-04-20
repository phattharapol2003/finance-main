import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import PlaceCard from "./PlaceCard";
import { PLACES } from '../data/places';

const financePlacesData = [
  {
    id: 1,
    name: "วัดมังกรกมลาวาส     (วัดเล่งเน่ยยี่)",
    status: "เปิด 06:00 ปิด 17:00",
    rating: 2,
    description:
      "วัดมังกรกมลาวาส เรียกสั้นๆว่า วัดมังกร หรือวัดเล่งเน่ยยี่ ตั้งอยู่ย่านเจริญกรุง กรุงเทพฯ เป็นวัดที่มีชื่อเสียงมากสำหรับชาวไทยเชื้อสายจีนและชาวต่างชาติ นิยมไปกราบไหว้ เทพเจ้าแห่งโชคลาภ 'ไฉ่ซิ้งเอี๊ยะ' เพื่อแก้ปีชง และทำบุญสะเดาะเคราะห์",
    images: [
      require("../assets/finance/1_1.jpg"),
      require("../assets/finance/1_2.jpg"),
      require("../assets/finance/1_3.jpg"),
      require("../assets/finance/1_4.jpg"),
    ],
  },
  {
    id: 2,
    name: "ศาลหลักเมือง",
    status: "เปิด 06:30 ปิด 18:30",
    rating: 2,
    description:
      "เป็นสถานที่ศักดิ์สิทธิ์ที่สร้างขึ้นพร้อมกับการตั้งเมือง เพื่อเป็นศูนย์กลางทางจิตใจและเสริมสร้างความมั่นคงของบ้านเมือง",
    images: [
      require("../assets/finance/2_1.jpg"),
      require("../assets/finance/2_2.jpg"),
      require("../assets/finance/2_3.jpg"),
      require("../assets/finance/2_4.jpg"),
    ],
  },
  {
    id: 3,
    name: "วัดหงส์รัตนารามราชวรวิหาร",
    status: "เปิด 09:00 ปิด 17:00",
    rating: 2,
    description:
      "เป็นวัดเก่าแก่ย่านฝั่งธนฯ ใกล้พระราชวังเดิมและวัดอรุณฯ มีความเกี่ยวข้องกับ สมเด็จพระเจ้าตากสินมหาราช ขอพรความเจริญรุ่งเรือง โชคลาภ เลื่อนตำแหน่ง กับ พระทองคำ และ หลวงพ่อแสน",
    images: [
      require("../assets/finance/3_1.jpg"),
      require("../assets/finance/3_2.jpeg"),
      require("../assets/finance/3_3.jpg"),
      require("../assets/finance/3_4.jpeg"),
    ],
  },
  {
    id: 4,
    name: "วัดอรุณราชวราราม      (วัดแจ้ง)",
    status: "เปิด 08:00 ปิด 18:00",
    rating: 2,
    description:
      "เป็นวัดที่มีชื่อเสียงและงดงามในกรุงเทพฯ นอกจากการชมพระปรางค์แล้ว ผู้คนนิยมมาขอพรด้าน การเงิน ความมั่งคั่ง การลงทุน และธุรกิจ รวมถึง เสริมอำนาจวาสนา บารมี และความสำเร็จในชีวิต",
    images: [
      require("../assets/finance/4_1.jpg"),
      require("../assets/finance/4_2.jpeg"),
      require("../assets/finance/4_3.jpg"),
      require("../assets/finance/4_4.jpg"),
    ],
  },
];

// ✅ เปลี่ยนชื่อ component ให้ตรงกับ export
const FinancePlaces = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>การเงิน</Text>
      {PLACES.map((place) => (
        <PlaceCard key={place.id} data={place} navigation={navigation} />
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

