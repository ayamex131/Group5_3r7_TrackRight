import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";

import Intro from "./components/GetStarted/Intro";
import RoleSelection from "./components/GetStarted/RoleSelection";
import Login from "./components/LoginRegister/Login";
import Register from "./components/LoginRegister/Register";
import Owner_initial_profile from "./components/LoginRegister/Owner_initial_profile";

import Recover from "./components/LoginRegister/Recover";
import EmpDash from "./components/Dashboard/EmployeeDashboard/EmpDash";
import OwnDash from "./components/Dashboard/OwnerDashboard/OwnDash";
import supabase from "./config/supabaseClients";
import EmployeeRegister from "./components/LoginRegister/EmployeeRegister";
import EmployeeInitialProfile from "./components/LoginRegister/EmployeeInitialProfile";
import EmployeeProfile from "./components/Dashboard/EmployeeDashboard/EmployeeProfile";
import TimeinScanner from './components/Dashboard/OwnerDashboard/TimeinScanner';


const Stack = createStackNavigator();


console.log(supabase);


export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="RoleSelection" component={RoleSelection} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="EmployeeRegister" component={EmployeeRegister} />
          <Stack.Screen name="EmployeeInitialProfile" component={EmployeeInitialProfile} />

          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Owner_initial_profile" component={Owner_initial_profile} /> 
          

          <Stack.Screen name="Recover" component={Recover} />
          <Stack.Screen name="EmpDash" component={EmpDash} />
          <Stack.Screen name="OwnDash" component={OwnDash} />
          <Stack.Screen name="EmployeeProfile" component={EmployeeProfile} />
          <Stack.Screen name="TimeinScanner" component={TimeinScanner} />

        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}