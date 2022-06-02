const {Sequelize} = require('sequelize');
const {database} = require('../config/config');

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password, {
        host: database.host,
        dialect: "mysql"
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.usuarios = require('../models/usuarios') ( 
    sequelize,
    Sequelize.DataTypes)

db.listaProductos = require('../models/listaProductos') (
    sequelize,
    Sequelize.DataTypes)

db.categorias = require('../models/categorias') (
    sequelize,
    Sequelize.DataTypes 
)

db.productos = require('../models/productos') (
    sequelize,
    Sequelize.DataTypes 
)

db.itemList = require('../models/itemList') (
    sequelize,
    Sequelize.DataTypes
)

db.usuarios.associate(db);
db.listaProductos.associate(db);
db.categorias.associate(db);
db.productos.associate(db);
module.exports = db;