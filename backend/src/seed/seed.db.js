const models = require('../database/db');
const categoriData = require('../seed/data/categoria.json');
const productosData = require('../seed/data/productos.json');

const insertDatosDB = async () => {
    try {
        await models.categorias.bulkCreate(categoriData,{
            validate: true,
            ignoreDuplicates: true  
        });

        await models.productos.bulkCreate(productosData,{
            validate: true,
            ignoreDuplicates: true 
        });
        console.log("datos correctos");
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = {insertDatosDB};