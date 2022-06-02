const express = require("express");
const router = express.Router();
const db = require("../database/db");
const usuarios = db.usuarios;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/usuarios", async (req, res) => {
  let passwordHash = await bcrypt.hash(req.body.password, 8);
  usuarios
    .create({
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      correo: req.body.correo,
      password: passwordHash,
    })
    .then((result) => {
      res.json(result);
    }).catch((err) => {
      console.log(err);
    });
});



router.post("/login", async (req, res) => {
  const user = await usuarios.findOne({where:{ correo: req.body.correo }});
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(req.body.password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  } 

  if (!passwordCorrect) {
    return  res
    .status(200)
    .json({ token:"null", id:user.id,correo: user.correo, password: user.password })
  }

  const userForToken = {
    correo: user.correo,
    password: user.password,
    id: user.id,
  };

  
  const token = jwt.sign({ userForToken }, "secretkey", (err, token) => {
     res
    .status(200)
    .json({ token, id: user.id,correo: user.correo, password: user.password })

  });

  
});




router.post("/posts", verifyToken, (req , res) => {

  jwt.verify(req.token, 'secretkey', (error, authData) => {
      if(error){
          res.sendStatus(403);
      }else{
          res.json({
                  mensaje: "Post fue creado",
                  authData
              });
      }
  });
});

router.get("/usuarios", (req, res) => {
  usuarios.findAll({})
  .then((result) => {
    res.json(result);
  }).catch((err) => {
    console.log(err);
  });
});



function verifyToken(req, res, next){
  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader !== 'undefined'){
       const bearerToken = bearerHeader.split(" ")[1];
       req.token = bearerToken;
       next();
  }else{
      res.sendStatus(403);
  }
}





module.exports = router;
