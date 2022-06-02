import React, {createContext, useEffect, useState} from 'react';
import {URL} from '../URL/URL';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

const [islogueado, setIslogueado] = useState(false);
const [loginPending,setLoginPending] = useState(false);
const [errorIngresar,setErrorIngresar] = useState(false);
const [dataUsers,setDataUsers] = useState([]);
const [dataLista,setDataLista] = useState([]);
const [updateMisListas, setUpdateMisListas] = useState(false);
const [cestaProductosVacia, setCestaProductosVacia] = useState(true);
const [temaColor, setTemaColor] = useState(false);




    const ingresarUsuario =  (correo,password) => {
        setLoginPending(true);
        
       fetch(URL+'api/login',{
            method: 'POST',
            body: JSON.stringify({
                correo,
                password
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
        .then((data) => {          
            if (data.correo === "" || data.error === "invalid username or password") {
                setIslogueado(false); 
                setLoginPending(false);
                setErrorIngresar(true);              
            } else {
                setIslogueado(true);
                setLoginPending(false);
                setDataUsers(data)
            }
        })
        .catch((error) => console.error('Error:', error))

    };

   
    const cerrarSesion = () => {       
         setIslogueado(false);
        //  setDataLista([]);
        //  setCestaProductosVacia(true);
        //  setErrorIngresar(false);
    }

    const crearNombreLista = (nombreLista,usuarioId) => {
       fetch(URL+'api/listasNombre',{
            method: 'POST',
            body: JSON.stringify({
                nombreLista,
                usuarioId,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
        .then((data) => {          
           console.log(data);
           setUpdateMisListas(true);
        })
        .catch((error) => console.error('Error:', error))

    }

 
    const addProductLista = (listaProductoId,productoId) => {

        fetch(URL+'api/addProductos',{
            method: 'POST',
            body: JSON.stringify({
                listaProductoId,
                productoId,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
        .then((data) => {
           setUpdateMisListas(false);
           console.log(data);

        })
        .catch((error) => console.error('Error:', error))

    };

    const eliminarProLista = (id) => {

           fetch(URL+'api/addProductos/'+id, 
            { method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            } 
        }).then((res) => res.json())
            .then((data) => {          
                    console.log(data);
            }).catch((error) => console.error('Error:', error))
        
        
    }

    
  



    return (

        <AuthContext.Provider value={{ 
            islogueado,
            ingresarUsuario,
            setIslogueado,
            cerrarSesion,
            loginPending,
            setLoginPending,
            errorIngresar,
            dataUsers,
            crearNombreLista,
            dataLista,
            setDataLista,
            addProductLista,
            eliminarProLista,
            updateMisListas, 
            setUpdateMisListas,
            cestaProductosVacia, 
            setCestaProductosVacia,
            setErrorIngresar,
            temaColor, 
            setTemaColor,
           
           
           
        }} >
            {children}
        </AuthContext.Provider>
    )

    

}

