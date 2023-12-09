const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurar o middleware bodyParser
app.use(bodyParser.json());

// Configurar a conexão com o banco de dados SQLite
const db = new sqlite3.Database('database.db');

// Criar tabela se não existir
db.run(`
  CREATE TABLE IF NOT EXISTS people (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    name TEXT,
    birthdate TEXT,
    quickdescription TEXT,
    address TEXT
  )
`);

const personController = require('./controllers/personController');

app.get(    '/api/person',      personController.getAll);   // read
app.get(    '/api/person/:id',  personController.getById);  // read
app.post(   '/api/person',      personController.doNew);    // create
app.put(    '/api/person',      personController.doUpdate); // update
app.delete( '/api/person',      personController.doDelete); // delete


// // Rota para obter todas as pessoas
// app.get('/api/people', (req, res) => {
//   db.all('SELECT * FROM people', (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json(rows);
//   });
// });

// // Rota para obter uma pessoa pelo ID
// app.get('/api/people/:id', (req, res) => {
//   const { id } = req.params;
//   db.get('SELECT * FROM people WHERE id = ?', [id], (err, row) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     if (!row) {
//       res.status(404).json({ error: 'Person not found' });
//       return;
//     }
//     res.json(row);
//   });
// });

// // Rota para adicionar uma nova pessoa
// app.post('/api/people', (req, res) => {
//   const { username, name, birthdate, quickdescription, address } = req.body;
//   const query = 'INSERT INTO people (username, name, birthdate, quickdescription, address) VALUES (?, ?, ?, ?, ?)';
//   db.run(query, [username, name, birthdate, quickdescription, address], (err) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({ message: 'Person added successfully' });
//   });
// });

// // Rota para atualizar uma pessoa pelo ID
// app.put('/api/people/:id', (req, res) => {
//   const { id } = req.params;
//   const { username, name, birthdate, quickdescription, address } = req.body;
//   const query = 'UPDATE people SET username=?, name=?, birthdate=?, quickdescription=?, address=? WHERE id=?';
//   db.run(query, [username, name, birthdate, quickdescription, address, id], (err) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({ message: 'Person updated successfully' });
//   });
// });

// // Rota para excluir uma pessoa pelo ID
// app.delete('/api/people/:id', (req, res) => {
//   const { id } = req.params;
//   const query = 'DELETE FROM people WHERE id=?';
//   db.run(query, [id], (err) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({ message: 'Person deleted successfully' });
//   });
// });

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});