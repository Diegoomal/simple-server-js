const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configuração do CORS
app.use(cors());
app.use(cors({
  origin: 'http://localhost:4200', // ou a origem específica que você deseja permitir
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // se você estiver usando credenciais (como cookies), defina como true
  optionsSuccessStatus: 204,
}));

app.use((req, res, next) => { 
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"); 
  next(); 
}); 

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
app.get(    '/api/user',          userController.readall  );                    // read
app.get(    '/api/user/:id',      userController.readbyid );                    // read
app.post(   '/api/user',          userController.create   );                    // create
app.put(    '/api/user/:id',      userController.update   );                    // update
app.delete( '/api/user/:id',      userController.delete   );                    // delete

const loginController = require('./controllers/loginController')(db);
app.post(    '/api/login',          loginController.read  );                    // read

const addressController = require('./controllers/addressController')(db);
db.run(addressController.getSQLCreateTable());                                  // create table if not exist
app.get(    '/api/address',      addressController.readall  );                  // read
app.get(    '/api/address/:id',  addressController.readbyid );                  // read
app.post(   '/api/address',      addressController.create   );                  // create
app.put(    '/api/address/:id',  addressController.update   );                  // update
app.delete( '/api/address/:id',  addressController.delete   );                  // delete

const professionalExperienceController = require('./controllers/professionaExperienceController')(db);
db.run(professionalExperienceController.getSQLCreateTable());                                   // create table if not exist
app.get(    '/api/professionalexperience',      professionalExperienceController.readall  );    // read
app.get(    '/api/professionalexperience/:id',  professionalExperienceController.readbyid );    // read
app.post(   '/api/professionalexperience',      professionalExperienceController.create   );    // create
app.put(    '/api/professionalexperience/:id',  professionalExperienceController.update   );    // update
app.delete( '/api/professionalexperience/:id',  professionalExperienceController.delete   );    // delete

const academicEducationController = require('./controllers/academicEducationController')(db);
db.run(academicEducationController.getSQLCreateTable());                                        // create table if not exist
app.get(    '/api/academiceducation',      academicEducationController.readall  );              // read
app.get(    '/api/academiceducation/:id',  academicEducationController.readbyid );              // read
app.post(   '/api/academiceducation',      academicEducationController.create   );              // create
app.put(    '/api/academiceducation/:id',  academicEducationController.update   );              // update
app.delete( '/api/academiceducation/:id',  academicEducationController.delete   );              // delete

const professionalContactController = require('./controllers/professionalContactController')(db);
db.run(professionalContactController.getSQLCreateTable());                                      // create table if not exist
app.get(    '/api/professionalcontact',      professionalContactController.readall  );          // read
app.get(    '/api/professionalcontact/:id',  professionalContactController.readbyid );          // read
app.post(   '/api/professionalcontact',      professionalContactController.create   );          // create
app.put(    '/api/professionalcontact/:id',  professionalContactController.update   );          // update
app.delete( '/api/professionalcontact/:id',  professionalContactController.delete   );          // delete


// Iniciar o servidor
const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = server;