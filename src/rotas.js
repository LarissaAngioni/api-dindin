const express = require("express");
const { cadastrarUsuario } = require("./controladores/usuarioControlador");

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);

module.exports = rotas;
