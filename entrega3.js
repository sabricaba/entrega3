const Contenedor = require('./Contenedor');
const express = require('express');

const app = express();
const puerto = 8080;
const productos = new Contenedor("productos.txt");

app.get("/productos", async (req, res) => {
  const result = await productos.getAll()
  res.send(result);
});

app.get("/productoRandom", async (req, res) => {
  const product = await productos.getById(Math.floor(Math.random() * 3+1));
  res.send(product);
});

app.listen(puerto, () => {
  console.log(`servidor escuchando ${puerto}`);
});