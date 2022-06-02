import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import {useContext } from "react";
import Registrar from "../components/modales/Registrar";
import Ingresar from "../components/modales/Ingresar";
import { ContexInput } from "../context/ContexInput";

const AccessMenu = () => {
  const { setShowModalRegistrar, setShowModalIngresar } = useContext(ContexInput);

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>
        Crear tu lista de la compra de forma sencilla
      </Text>
      <Image
        style={styles.logo}
        source={require("../assets/mainScreenImg.png")}
      />
      <View style={styles.buttonsCont}>
        <TouchableOpacity
          style={styles.butRegistrar}
          onPress={() => setShowModalRegistrar(true)}
        >
          <Text>Registrar con E-mail</Text>
        </TouchableOpacity>
        <Registrar />
        <TouchableOpacity
          style={styles.butIngresar}
          onPress={() => setShowModalIngresar(true)}
        >
          <Text>Ya tengo cuenta</Text>
        </TouchableOpacity>
        <Ingresar />
      </View>
      <Text style={styles.textPrivacidad}>
        Al utilizar esta aplicacion, aceptas nuestros Terminos de uso y
        Politicas de privacidad
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 45,
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#202620",
    alignItems: "center",
    justifyContent: "space-between",
  },

  butRegistrar: {
    alignItems: "center",
    backgroundColor: "#C4C4C4",
    borderRadius: 5,
    padding: 10,
    width: 150,
    marginVertical: 10
  },

  butIngresar: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#C4C4C4",
    borderRadius: 5,
    width: 150
  },
  logo: {
    width: 150,
    height: 150,
  },

  textPrivacidad: {
    bottom: 50,
    color: "#C4C4C4",
    fontSize: 12,
    marginHorizontal: 15,
    textAlign: "center"
  },
  textTitle: {
    top: 25,
    color: "#C4C4C4",
    fontSize: 40,
    fontWeight: "bold",
  },
  buttonsCont: {
   top: -80
  }
});

export default AccessMenu;
