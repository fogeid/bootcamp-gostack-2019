const express = require("express");

const server = express();

server.use(express.json());

// Query Params = ?teste=1
// Router Params = /user/1
// Request Body = { 'nome': 'Diego', 'email': 'diego.silva@aluno.ic.ufmt.br' }
// CRUD - Create, Read, Update, Delete

const users = ["Diego", "Rafael", "Lauro", "Ronaldo"];

// Retorna todos os usuários
server.get("/users", (req, res) => {
  return res.json(users);
});

// Retorna apenas um usuário
server.get("/users/:index", (req, res) => {
  const { index } = req.params;

  return res.json(users[index]);
});

// Cria um usuário
server.post("/users", (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

// Editar um usuário
server.put("/users/:index", (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

// Deletar um usuário
server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.json();
});

server.listen(3000);
