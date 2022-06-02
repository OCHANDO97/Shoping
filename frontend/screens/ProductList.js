import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect, useContext } from "react";
import { URL } from '../URL/URL';
import { AuthContext } from "../context/AuthContext";


const ProductList = ({ route, navigation }) => {
  const { idCategoria,nombreCategory } = route.params;
  const [productos, setProductos] = useState([]);
  const { dataLista, addProductLista,temaColor } = useContext(AuthContext);


  useEffect(() => {
    fetch(URL + "api/productos/" + idCategoria)
      .then((res) => {
        return res.json();
      })
      .then((daataa) => {
        setProductos(daataa);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <View style={temaColor ? styles.containerClaro :styles.container}>
      <Text style={temaColor ? styles.titleClaro : styles.title}>{nombreCategory}</Text>
      <SafeAreaView style={styles.flatlist}>
        <FlatList
          numColumns={3}
          data={productos}
          renderItem={(itemData) => {
            const { key, id, nombreProducto, imagen } = itemData.item;
            return (
              <TouchableOpacity onPress={() => addProductLista(dataLista.id, id)} >
                <View style={temaColor ? styles.listCategoriasClaro : styles.listCategorias}>
                  <Image style={styles.logoCompra} source={{ uri: URL + imagen }} />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </SafeAreaView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#202620",
    flex: 1
  },
  containerClaro: {
    backgroundColor: "#C0CCCD",
    flex: 1

  },
  logoCompra: {
    top: 30,
    width: 50,
    height: 50,
  },
  listCategorias: {
    backgroundColor: '#DDD',
    width: 100,
    height: 100,
    alignItems: 'center',
    margin: 5,
  },
  listCategoriasClaro: {
    backgroundColor: '#95A5A6',
    width: 100,
    height: 100,
    alignItems: 'center',
    margin: 5,
  },
  flatlist: {
    flexDirection: 'row',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    left: 20,
    color: '#fff'
  },
  titleClaro: {
    fontSize: 24,
    fontWeight: 'bold',
    left: 20,
    color: "#000",

  }

})

export default ProductList