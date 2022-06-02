import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { URL } from "../URL/URL";
import { AuthContext } from "../context/AuthContext";
import Icon from 'react-native-vector-icons/FontAwesome';


const Lists = ({ route, navigation }) => {
  const { idUsuario } = route.params;
  const { setDataLista, updateMisListas, setUpdateMisListas, temaColor } =
    useContext(AuthContext);
  const [mislistas, setMisListas] = useState([]);

  useEffect(() => {
    fetch(URL + "api/listasNombre/" + idUsuario)
      .then((res) => {
        return res.json();
      })
      .then((daataa) => {
        setMisListas(daataa);
      })
      .catch((err) => {
        console.log(err);
      });
    setUpdateMisListas(false);
  }, [updateMisListas]);

    

  const envioNombreLista = (objLista) => {
    setDataLista(objLista);
    navigation.navigate("MainMenu");
  };
  
  const eliminarLista = async(id) => {

    await fetch(URL+'api/listasNombre/'+id, 
      { method: 'DELETE',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
      } 
  }).then((res) => res.json())
      .then((data) => {      
         setUpdateMisListas(true);

              console.log(data);
      }).catch((error) => console.error('Error:', error))
  
}

  return (
   
      <View style={temaColor ? styles.containerClaro : styles.container}>
         <ScrollView>
        {mislistas.map((e, index) => {
        let cantidad = null;
          if (e.productos.length > 0) {
             cantidad = (
              <View  style={styles.cantidadProductos}>
             <Text  style={styles.texto}>{e.productos.length} productos </Text>
             </View>)

          } 
        
          return (
            
              <TouchableOpacity
              key={index}
                 style={styles.listsCont}
                onPress={() => envioNombreLista(e)}
              >
              
                      <View style={styles.textIcon}>
                        <Text  style={styles.listName}>{e.nombreLista}</Text>
                       <TouchableOpacity onPress={() => eliminarLista(e.id)} >
                        <Icon style={styles.icon}
                          name="gear"
                        />
                        </TouchableOpacity> 
                      {cantidad}

                      </View>

              </TouchableOpacity>
          );
        })}

            <TouchableOpacity
            onPress={() =>
              navigation.navigate("NameList", {
                idUsuario,
              })
            }
            style={styles.newListButton}
          >
              <Text style={styles.newList}>Nueva Lista</Text>
              <Icon style={styles.iconCircle}
                name="plus-circle"
              />
          </TouchableOpacity>
            </ScrollView>
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#202620",
    paddingLeft: 55,

  },
  containerClaro: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#C0CCCD",
    paddingLeft: 55,
  },
  
  texto: {
    color:'white'
  },
  cantidadProductos:{
    position: 'absolute',
    width: 90,
    height: 20,
    right: 170,
    top:30,
    backgroundColor: 'red'
  },
  listsCont: {

    width: 270,
    height: 90,
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 10,
  },
   textIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
    
  },
  listName: {
    color: 'green',
    fontSize: 16,
    fontWeight: 'bold'
  },
  iconCircle: {
    color: "#000",
    fontSize: 30,
    left: -110,
  },
  newListButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    left:30,
  },
  newList: {
    width: 230,
    backgroundColor: '#33793A',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    borderRadius: 5
  },
  icon: {
    color: "#000",
    fontSize: 30,
  },
});

export default Lists;
