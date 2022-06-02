import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import Input from '../components/Input';
import { AuthContext } from '../context/AuthContext';
const NameList = ({ route, navigation }) => {

  const { idUsuario } = route.params;
  const [nombreLista, setNombreLista] = useState("");
  const { crearNombreLista, temaColor,dataUsers } = useContext(AuthContext);


  const validarNombreLista = (nombreLista,idUsuario) => {
    if (nombreLista === undefined || nombreLista === "") {
      Alert.alert("error",
      "introduzca un dato", [{
        text:"ok",
      style:"destructive"
  }])
    } else {
      crearNombreLista(nombreLista, idUsuario);
      setNombreLista("");
       
        navigation.navigate("Lists", {
          idUsuario: dataUsers.id,
        })

    }

  }

  return (
    <View style={temaColor ? styles.containerClaro :styles.container}>
      <View style={styles.input}>
        <Input placeholder="Nombre de Lista" onChangeText={setNombreLista} value={nombreLista} />
        <TouchableOpacity onPress={() => validarNombreLista(nombreLista,idUsuario) }
          style={styles.button}
        >
          <Text style={styles.saveText}>Crear lista</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#202620",
  },
  containerClaro: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#C0CCCD",
  },
  input: {
    width: 300,
    backgroundColor: 'green',
    top: 200,
    alignItems: 'center',
    left: 45,
    padding: 10,
    borderRadius: 10
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    width: 110,
    alignItems: 'center',
  },
  saveText: {
    fontSize: 16,
    fontWeight: 'bold',
  }

})

export default NameList
