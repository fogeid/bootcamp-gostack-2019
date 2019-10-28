const express = require('express');

const server = express();

server.use(express.json());

// Query Params = ?teste=1
// Router Params = /user/1
// Request Body = { 'nome': 'Diego', 'email': 'diego.silva@aluno.ic.ufmt.br' }
// CRUD - Create, Read, Update, Delete

const users = ['Diego', 'Rafael', 'Lauro', 'Ronaldo'];

// Middleware GLOBAL de log
server.use((req, res, next) => {
  console.time('Request');
  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd('Request');
});

// Middleware LOCAL de log de error
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required' });
  };

  return next();
};

// Middleware LOCAL de log de error
function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!user) {
    return res.status(400).json({ error: 'User does not required' });
  };

  req.user = user;

  return next();
};

// Retorna todos os usuários
server.get('/users', (req, res) => {
  return res.json(users);
});

// Retorna apenas um usuário
server.get('/users/:index', checkUserInArray, (req, res) => {
  return res.json(req.user);
});

// Cria um usuário
server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

// Editar um usuário
server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

// Deletar um usuário
server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.json();
});

server.listen(3000);
