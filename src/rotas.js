const express = require("express");
const {
  cadastrarUsuario,
  login,
} = require("./controladores/usuarioControlador");
const checaToken = require("./intermediarios/checaToken");

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", login);

rotas.use(checaToken);

module.exports = rotas;
