import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { URL } from "../URL/URL";
import Card from "../components/Card";
import Icon from "react-native-vector-icons/FontAwesome";
import { RadioButton } from "react-native-paper";

const MainMenu = ({ navigation }) => {
  const {
    cerrarSesion,
    dataUsers,
    dataLista,
    eliminarProLista,
    cestaProductosVacia,
    setCestaProductosVacia,
    temaColor,
    setTemaColor,
  } = useContext(AuthContext);

  const [categorias, setCategorias] = useState([]);
  const [cestaProductos, setCestaProductos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [productosUnicos, setProductosUnicos] = useState([]);
  const [showModalTema, setShowModalTema] = useState(false);
  
  useEffect(() => {
    fetch(URL + "api/categorias")
      .then((res) => {
        return res.json();
      })
      .then((daataa) => {
        setCategorias(daataa);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (dataLista.productos === undefined) {
    } else {
      if (dataLista.productos.length > 0) {
        setCestaProductosVacia(false);
      } else {
        setCestaProductosVacia(true);
      }
    }

  
    if (dataLista.nombreLista === undefined) {
      setMensaje("debe selecionar una lista o crearla");
    } else {
      setMensaje("Compra Finalizada ");
    }

    fetch(
      URL +
        "api/listasConProductos/" +
        dataUsers.id +
        "/" +
        dataLista.nombreLista
    )
      .then((res) => {
        return res.json();
      })
      .then((daataa) => {
        setCestaProductos(daataa);
      })
      .catch((err) => {
        console.log(err);
      });

    cestaProductos.map((e) => {
      setProductosUnicos(e.productos);
    });
  }, [cestaProductos, dataLista.productos]);

 

  const handleAddProductos = (id, nombreCategory) => {
    if (dataLista.nombreLista === undefined) {
      Alert.alert("error", "no tienes lista creada o elegida", [
        {
          text: "ok",
          onPress: () =>
            navigation.navigate("Lists", {
              idUsuario: dataUsers.id,
            }),
          style: "destructive",
        },
      ]);
    } else {
      navigation.navigate("ProductList", {
        idCategoria: id,
        nombreCategory,
      });
    }
  };

  const validarTema = () => {
    setShowModalTema(!showModalTema);
    setTemaColor(!temaColor);
  } 

  return (
    <ScrollView>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModalTema}       
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.viewTema}> 
              <Text style={styles.textTema}>Modo Oscuro</Text>
                <RadioButton
                  value="oscuro"
                  status={temaColor === false ? "checked" : "unchecked" }
                  onPress={() => validarTema()}
                />
               </View >

               <View style={styles.viewTema}> 
              <Text style={styles.textTema}>Modo Claro</Text>

                <RadioButton
                
                  value="claro"
                  status={temaColor === true ? "checked" : "unchecked"}
                  onPress={() => validarTema() }
                />

                </View>
    
            </View>
          </View>
        </Modal>
      </View>

      <View style={temaColor ? styles.containerClaro : styles.container}>
        <TouchableOpacity
          style={styles.listas}
          onPress={() =>
            navigation.navigate("Lists", {
              idUsuario: dataUsers.id,
            })
          }
        >
          <Text style={temaColor ?  styles.listasTextCLaro : styles.listasText}>Listas</Text>
        </TouchableOpacity>
        <Text style={temaColor ?  styles.nombreListaClaro :styles.nombreLista}>{dataLista.nombreLista}</Text>

        <TouchableOpacity
          style={temaColor ? styles.butCerrarClaro:styles.butCerrar}
          onPress={() => cerrarSesion()}
        >
          <Text>Cerrar Sesion</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={temaColor ? styles.butCerrarClaro:styles.butCerrar}
          onPress={() => setShowModalTema(true)}
        >
          <Text>Tema</Text>
        </TouchableOpacity>

        {cestaProductosVacia ? (
          <View style={styles.compraFinalizada}>
            <Text style={temaColor ? styles.textCompraClaro: styles.textCompra}>{mensaje} </Text>
            <Image
              style={styles.logoCompra}
              source={require("../assets/pantallaPrincipal.png")}
            />
          </View>
        ) : (
          <View style={styles.contenedorProductos}>
            {productosUnicos.map((e,index) => {
              return (
                <TouchableOpacity 
                key={index}
                  onPress={() => eliminarProLista(e.listas_con_productos.id)}
                >
                  <Card style={temaColor ? {backgroundColor: "#95A5A6" } : null }>
                    <Text
                     
                      style={styles.textProducto}
                     >
                      {e.nombreProducto}
                     </Text> 
                    <Image
                     
                      style={styles.logoProducto}
                      source={{ uri: URL + e.imagen }}
                    />
                  </Card>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <View style={styles.contenedorCategoria}>
          {categorias.map((e, index) => {
            return (
              <TouchableOpacity
              key={index}
                style={styles.listCategorias}
                onPress={() => handleAddProductos(e.id, e.nombreCategory)}
              >
                <Text  style={temaColor ? styles.textCategoriasClaro: styles.textCategorias}>
                  {e.nombreCategory}
                </Text>
                <Icon style={temaColor ? styles.iconClaro: styles.icon} name="arrow-right" />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 50,
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#202620",
  },
  containerClaro: {
    top: 50,
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#C0CCCD",
  },
  listas: {
    top: 20,
  },
  listasText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 40,
  },
  listasTextCLaro: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 40,
  },
  nombreLista: {
    top: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 26,
    left: 10,
  },
  nombreListaClaro: {
    top: 20,
    color: "#000",
    fontWeight: "bold",
    fontSize: 26,
    left: 10,
  },
  butCerrar: {
    padding: 5,
    left: 260,
    width: 120,
    height: 30,
    backgroundColor: "#C4C4C4",
    borderRadius: 5,
    alignItems: "center",
    bottom: 50,
    marginTop: 5,
  },
  butCerrarClaro: {
    padding: 5,
    left: 260,
    width: 120,
    height: 30,
    backgroundColor: "white",
    borderRadius: 5,
    alignItems: "center",
    bottom: 50,
    marginTop: 5,
  },
  compraFinalizada: {
    alignItems: "center",
    top: 40,
  },
  textCompra: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  textCompraClaro: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
  },
  logoCompra: {
    top: 10,
    width: 75,
    height: 75,
  },
  listCategorias: {
    alignItems: "center",
    backgroundColor: "#33793A",
    padding: 5,
    marginVertical: 4,
    borderRadius: 8,
    height: 40,
    width: 240,
    left: 80,
  },
  textCategorias: {
    color: "#FFF",
    fontSize: 20,
    padding: 3,
    fontWeight: "bold",
  },
  textCategoriasClaro: {
    color: "#000",
    fontSize: 20,
    padding: 3,
    fontWeight: "bold",
  },
  contenedorCategoria: {
    top: 70,
    marginBottom: 250,
  },
  textProducto: {
    top: 40,
    fontSize: 12,
  },
  logoProducto: {
    bottom: 33,
    width: 50,
    height: 50,
  },
  contenedorProductos: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  icon: {
    color: "#fff",
    fontSize: 20,
    left: 100,
    bottom: 20,
  },
  iconClaro: {
    color: "#000",
    fontSize: 20,
    left: 100,
    bottom: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  viewTema: {
    flexDirection: "row",
  },
  textTema: {
    top: 8,
  }
});

export default MainMenu;
