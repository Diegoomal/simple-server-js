const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurar o middleware bodyParser
app.use(bodyParser.json());

// Configurar a conexão com o banco de dados SQLite
const db = new sqlite3.Database('database.db');

const personController = require('./controllers/personController');
db.run(personController.getSQLCreateTable());                                   // create table if not exist
app.get(    '/api/person',      personController.readall  );                    // read
app.get(    '/api/person/:id',  personController.readbyid );                    // read
app.post(   '/api/person',      personController.create   );                    // create
app.put(    '/api/person',      personController.update   );                    // update
app.delete( '/api/person',      personController.delete   );                    // delete

const userController = require('./controllers/userController')(db);
db.run(userController.getSQLCreateTable());                                     // create table if not exist
app.get(    '/api/user',      userController.readall  );                        // read
app.get(    '/api/user/:id',  userController.readbyid );                        // read
app.post(   '/api/user',      userController.create   );                        // create
app.put(    '/api/user/:id',  userController.update   );                        // update
app.delete( '/api/user/:id',  userController.delete   );                        // delete

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});