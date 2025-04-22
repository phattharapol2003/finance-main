import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import FinancePlaces from "./components/FinancePlaces";
import { ThemeProvider } from "./components/FinanceContext";
import FinanceReview from "./components/FinanceReview";
import FinanceDetail from "./components/FinanceDetail";
const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="FinancePlaces" component={FinancePlaces} />
            <Stack.Screen
              name="FinanceDetail"
              component={FinanceDetail}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FinanceReview"
              component={FinanceReview}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
