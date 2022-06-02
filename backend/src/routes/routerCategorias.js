const express = require("express");
const router = express.Router();
const db = require("../database/db");
const categorias = db.categorias;

//devuelve todas las categorias

router.get("/categorias", (req, res) => {
    categorias.findAll({})
    .then((result) => {
      res.json(result);
    }).catch((err) => {
      console.log(err);
    });
  });


module.exports = router;
