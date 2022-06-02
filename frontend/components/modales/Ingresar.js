import { StyleSheet, Text, View, Modal, TouchableOpacity,Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Input from "../Input";
import { AuthContext } from "../../context/AuthContext";
import { ContexInput } from "../../context/ContexInput";
import AppLoader from "../AppLoader";
import Icon from 'react-native-vector-icons/FontAwesome'


const Ingresar = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const { ingresarUsuario, loginPending, errorIngresar,setErrorIngresar } = useContext(AuthContext);
  const { showModalIngresar, setShowModalIngresar } = useContext(ContexInput);
  return (
    <Modal visible={showModalIngresar}>
      {loginPending ? <AppLoader /> : null}

      <View style={styles.container}>
        <Text style={styles.title}> Iniciar Sesión</Text>

        <View style={styles.inputs}>
          <View style={styles.inputCont}>
            <Input
              style={styles.inputData}
              placeholder="correo"
              onChangeText={setCorreo}
              value={correo} />
            <Icon style={styles.icon}
              name="envelope"
            />
          </View>
          <View style={styles.inputCont}>
            <Input
              style={styles.inputData}
              placeholder="contraseña"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
            />
            <Icon style={styles.icon}
              name="unlock"
            />
          </View>
        </View>

        <View style={styles.inputCont}>
          <TouchableOpacity
            style={styles.botIngresar}
            onPress={() => ingresarUsuario(correo, password)}>
            <Text>Ingresar</Text>
          </TouchableOpacity>
          {errorIngresar &&    
          Alert.alert("error",
          "correo o contraseña incorrecto", [{
            text:"ok",
            onPress: () => setErrorIngresar(false),
          style:"destructive"
      }])
          
      
      }
          <TouchableOpacity
            style={styles.botNoTengo}
            onPress={() => setShowModalIngresar(false)}
          >
            <Text>No tengo cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "#202620",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: 'white',
    bottom: 120,
  },
  botIngresar: {
    position: "absolute",
    backgroundColor: "#C4C4C4",
    padding: 10,
    top: 30,
    borderRadius: 5,
    width: 140,
    alignItems: 'center',

  },
  botNoTengo: {
    position: "absolute",
    backgroundColor: "#C4C4C4",
    padding: 10,
    top: 50,
    borderRadius: 5,
    width: 140,
    marginTop: 40,
    alignItems: 'center',

  },
  inputData: {
    borderRadius: 5,
    color: 'white',

  },
  inputCont: {
    flexDirection: "row",
    justifyContent: 'center'
  },
  icon: {
    color: "#fff",
    fontSize: 20,
    right: 30,
    top: 10
  },
  inputs: {
    left: 10,
    bottom: 20
  },
  


})


export default Ingresar;