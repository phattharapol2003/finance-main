import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FinancePlaces from "./components/FinancePlaces";
import { ThemeProvider } from "./components/ThemeContext";
import Review from "./components/Review";
import PlaceDetail from "./components/PlaceDetail";
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="FinancePlaces" component={FinancePlaces} />
            <Stack.Screen
              name="PlaceDetail"
              component={PlaceDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Review"
              component={Review}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
