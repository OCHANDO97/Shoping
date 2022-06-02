import React, {createContext, useEffect, useState} from 'react';
import {URL} from '../URL/URL';

export const ContexInput = createContext();

export const InputProvider = ({children}) => {


    const [showModalRegistrar, setShowModalRegistrar] = useState(false);
    const [showModalIngresar, setShowModalIngresar] = useState(false);


    const registrarUsuario = (nombre,apellidos,correo,password) => {

        fetch(URL+'api/usuarios',{
            method: 'POST',
            body: JSON.stringify({
                nombre,
                apellidos,
                correo,
                password
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log(response);
        });
    }





    return (
        <ContexInput.Provider value= {{
            showModalRegistrar,
            setShowModalRegistrar,
            registrarUsuario,
            showModalIngresar, 
            setShowModalIngresar,
            
        }} >
            {children}
        </ContexInput.Provider>
    )


}