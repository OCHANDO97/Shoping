import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = (props) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    marginBottom: 20,
    backgroundColor: '#33793A'
  },
});

export default Input;