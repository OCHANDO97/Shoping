
const express = require("express");
const router = express.Router();
const db = require("../database/db");
const listaProductos = db.listaProductos;
const productos = db.productos;

router.get("/productosCategoria/:id", (req, res) => {
    productos
        .findAll({
            where: { categoriaId: req.params.id },
            include: [
                { model: productos }
            ]
        })
        .then((result) => {
            res.json(result);
            console.log(result)
        }).catch((err) => {
            console.log(err);
          });
});

module.exports = router