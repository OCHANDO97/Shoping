import { StyleSheet, Text, View, Modal, TouchableOpacity,Alert } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Input from "../Input";
import { ContexInput } from "../../context/ContexInput";
import { AuthContext } from "../../context/AuthContext";
import { URL } from "../../URL/URL";
import AppLoader from "../AppLoader";

const Registar = () => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [validarNombre, setValidarNombre] = useState(null);
  const [validarApellidos, setValidarApellidos] = useState(null);
  const [validarCorreo, setValidarCorreo] = useState(null);
  const [validarPassword, setValidarPassword] = useState(null);
  const [errorNombre, setErrorNombre] = useState("");
  const [errorApellidos, setErrorApellidos] = useState("");
  const [errorCorreo, setErrorCorreo] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [ingresar, setIngresar] = useState(false);
  const { registrarUsuario, showModalRegistrar, setShowModalRegistrar } =
    useContext(ContexInput);
  const { loginPending, setLoginPending } = useContext(AuthContext);
  const [listaUsuarios, setListaUsuarios] = useState([]);

 
  
  const comprobarCorreoRepetido = (email) => {
    let correoExclusivo = true; 

      listaUsuarios.forEach((e) => {
        if (e.correo === email) {
         correoExclusivo = false;
        }        
      })
      return correoExclusivo;

  }

  useEffect(() => {
    let validaNombre = /^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let validaEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if (!validaNombre.test(nombre)) {
      setValidarNombre(true);
      setErrorNombre("introduzca nombre correcto");
    } else {
      setValidarNombre(false);
    }

    if (!validaNombre.test(apellidos)) {
      setValidarApellidos(true);
      setErrorApellidos("introduzca apellido correcto");
    } else {
      setValidarApellidos(false);
    }

    if (!validaEmail.test(correo)) {
      setValidarCorreo(true);
      setErrorCorreo("correo invalido");
    } else {
      setValidarCorreo(false);
    }

    if (password.length < 6) {
      setValidarPassword(true);
      setErrorPassword("la contraseña tiene que ser mayor a 6 caracteres");
    } else {
      setValidarPassword(false);
    }

    fetch(URL+"api/usuarios").then((res) => {
      return res.json();
    })
    .then((daataa) => {
      setListaUsuarios(daataa);
    })
    .catch((err) => {
      console.log(err);
    });

  }, [nombre, correo, apellidos, password]);

  const datos = () => {

    setLoginPending(true);
    if (
      !validarNombre &&
      !validarApellidos &&
      !validarCorreo &&
      !validarPassword
    )
    
    {
      if (comprobarCorreoRepetido(correo)) {
        registrarUsuario(nombre, apellidos, correo, password);
        setShowModalRegistrar(false);
        setNombre("");
        setApellidos("");
        setCorreo("");
        setPassword("");
        setLoginPending(false);
        
      } else {

        Alert.alert("error", "correo ya existe", [
          {
            text: "ok",
            style: "destructive",
          },
       
        ]);
        setLoginPending(false);
        setCorreo("");
     
      }
     

    } else {

      setIngresar(true);
      setLoginPending(false);
    }
    
  };

  return (
    <Modal visible={showModalRegistrar}>
      {loginPending ? <AppLoader /> : null}

      <View style={styles.container}>
        <Text style={styles.title}> Introduce datos para registrarte</Text>
        <Input
          style={styles.inputData}
          placeholder="Nombre"
          onChangeText={setNombre}
        />
        {validarNombre && <Text style={styles.textoError}>{errorNombre}</Text>}
        <Input
          style={styles.inputData}
          placeholder="Apellidos"
          onChangeText={setApellidos}
          value={apellidos}
        />
        {validarApellidos && < Text style={styles.textoError}>{errorApellidos}</Text>}

        <Input
          style={styles.inputData}
          placeholder="Correo"
          onChangeText={setCorreo}
          value={correo} />
        {validarCorreo && <Text style={styles.textoError}>{errorCorreo}</Text>}

        <Input
          style={styles.inputData}
          placeholder="Contraseña"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        {validarPassword && <Text style={styles.textoError}>{errorPassword}</Text>}

        <TouchableOpacity
          style={styles.botIngresar}
          onPress={() => datos()}>
          <Text>Registrar</Text>
        </TouchableOpacity>

        {ingresar && 
           <Text style={styles.textoError}>error al ingresar datos</Text>}

        
        <TouchableOpacity
          style={styles.botVolver}
          onPress={() => setShowModalRegistrar(false)}
        >
          <Text>Volver</Text>
        </TouchableOpacity>
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
    fontSize: 36,
    fontWeight: "bold",
    color: 'white',
    bottom: 80,
    textAlign: 'center'
  },
  botIngresar: {
    backgroundColor: "#C4C4C4",
    padding: 10,
    borderRadius: 15,
    width: 100,
    alignItems: 'center',
  },
  botVolver: {
    backgroundColor: "#C4C4C4",
    padding: 10,
    borderRadius: 15,
    top: 20,
    width: 100,
    alignItems: 'center',
  },
  inputData: {
    borderRadius: 5,
    color: 'white'
  },
  textoError: {
    color: 'red',
    fontSize: 20
  }

})
export default Registar;
