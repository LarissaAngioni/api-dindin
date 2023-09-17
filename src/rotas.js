const express = require("express");
const {
  cadastrarUsuario,
  login,
  detalharUsuario,
  atualizarUsuario,
} = require("./controladores/usuarioControlador");
const checaToken = require("./intermediarios/checaToken");

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", login);

rotas.use(checaToken);

rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", atualizarUsuario);

module.exports = rotas;
