const express = require('express');
const app = express();
const db = require('./database/db');
const seed = require('./seed/seed.db');
const path = require('path');
const cors = require('cors');

app.use(cors());

const PORT = process.env.PORT || 8000;
// si esta a true va volver a crear tablas
db.sequelize.sync({force:false})

// insertamos todos los datos a la DB atraves del
const insertarDatos = async () => {
    try {
        await seed.insertDatosDB();
    } catch (error) {
        throw new Error(`no se ha podido conectar a la base datos\n ${error.message}`);        
        
    }
}

insertarDatos();
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.use(express.static(path.join(__dirname, 'images')));

//  rutas
app.use('/api/',require('./routes/routerCategorias'));
app.use('/api/',require('./routes/routerProductos'));
app.use('/api/',require('./routes/routerUsuarios'));
app.use('/api/',require('./routes/routerListaProducto'));
app.use('/api/', require('./routes/routerProductosPorCat'));


app.listen(PORT, function() {
console.log("funciona");
  
})