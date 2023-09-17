const express = require("express");
const {
  cadastrarUsuario,
  login,
  detalharUsuario,
  atualizarUsuario,
  listarCategorias,
} = require("./controladores/usuarioControlador");
const checaToken = require("./intermediarios/checaToken");

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", login);

rotas.use(checaToken);

rotas.get("/usuario", detalharUsuario);
rotas.put("/usuario", atualizarUsuario);

rotas.get("/categoria", listarCategorias);

module.exports = rotas;
