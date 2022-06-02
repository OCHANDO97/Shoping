import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useState, useEffect,useContext } from "react";
import { AuthProvider } from "./context/AuthContext";
import {InputProvider} from "./context/ContexInput";
import Navigation from './components/Navigation';
export default function App() {

  return (
    <AuthProvider >
      <InputProvider>
        <Navigation /> 
     </InputProvider>
    </AuthProvider>  
  );
}



