const express = require("express");
const router = express.Router();
const db = require("../database/db");
const productos = db.productos;

router.get("/productos/:categoriaId", (req, res) => {
    productos
      .findAll({
        where: { categoriaId: req.params.categoriaId },
      })
      .then((result) => {
        res.json(result);
      }).catch((err) => {
        console.log(err);
      });
  });

module.exports = router;
  