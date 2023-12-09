const bcrypt = require('bcrypt');

const userController = (db) => {
    return {

        getSQLCreateTable() {
            _sql = `
                CREATE TABLE IF NOT EXISTS user (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username VARCHAR(255) NOT NULL,
                    name VARCHAR(255) NOT NULL,
                    lastname VARCHAR(255) NOT NULL,
                    birthdate DATE,
                    quickdescription VARCHAR(255),
                    operationradius VARCHAR(255),
                    url_img_background VARCHAR(255),
                    url_img_user VARCHAR(255),
                    email VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL
                );
            `
            return _sql;
        },

        async create(req, res) {
            const {
                username,
                name,
                lastname,
                birthdate,
                quickdescription,
                operationradius,
                url_img_background,
                url_img_user,
                email,
                password
            } = req.body;

            // Verificar se os campos obrigatórios estão presentes
            if (!username || !name || !lastname || !email || !password) {
                return res.status(400).send('Campos obrigatórios ausentes.');
            }

            try {
                // Gerar o hash da senha
                // O segundo parâmetro é o custo do hash (quanto maior, mais seguro, mas mais lento)
                const hashedPassword = await bcrypt.hash(password, 10); 

                const query = `
                    INSERT INTO user (
                        username, name, lastname, birthdate, quickdescription,
                        operationradius, url_img_background, url_img_user,
                        email, password
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;

                db.run(
                    query,
                    [
                        username,
                        name,
                        lastname,
                        birthdate,
                        quickdescription,
                        operationradius,
                        url_img_background,
                        url_img_user,
                        email,
                        hashedPassword // Salvar o hash da senha no banco de dados
                    ],
                    function (err) {
                        if (err) {
                            return res.status(500).send(err.message);
                        }

                        res.status(201).send(`Usuário ${this.lastID} criado com sucesso.`);
                    }
                );
            } catch (error) {
                return res.status(500).send('Erro ao criar hash da senha.');
            }
        },

        readall(req, res) {
            const query = 'SELECT * FROM user';

            db.all(query, [], (err, rows) => {
                if (err) {
                    return res.status(500).send(err.message);
                }

                res.json(rows);
            });
        },

        readbyid(req, res) {
            const userId = req.params.id;
            const query = 'SELECT * FROM user WHERE id = ?';

            db.get(query, [userId], (err, row) => {
                if (err) {
                    return res.status(500).send(err.message);
                }

                if (!row) {
                    return res.status(404).send('Usuário não encontrado.');
                }

                res.json(row);
            });
        },

        update(req, res) {
            const userId = req.params.id;
            const {
                username,
                name,
                lastname,
                birthdate,
                quickdescription,
                operationradius,
                url_img_background,
                url_img_user,
                email,
                password
            } = req.body;

            // Verificar se os campos obrigatórios estão presentes
            if (!username || !name || !lastname || !email || !password) {
                return res.status(400).send('Campos obrigatórios ausentes.');
            }

            const query = `
                UPDATE user
                SET
                    username = ?,
                    name = ?,
                    lastname = ?,
                    birthdate = ?,
                    quickdescription = ?,
                    operationradius = ?,
                    url_img_background = ?,
                    url_img_user = ?,
                    email = ?,
                    password = ?
                WHERE id = ?
            `;

            db.run(
                query,
                [
                    username,
                    name,
                    lastname,
                    birthdate,
                    quickdescription,
                    operationradius,
                    url_img_background,
                    url_img_user,
                    email,
                    password,
                    userId
                ],
                function (err) {
                    if (err) {
                        return res.status(500).send(err.message);
                    }

                    if (this.changes === 0) {
                        return res.status(404).send('Usuário não encontrado.');
                    }

                    res.send(`Usuário ${userId} atualizado com sucesso.`);
                }
            );
        },

        delete(req, res) {
            const userId = req.params.id;
            const query = 'DELETE FROM user WHERE id = ?';

            db.run(query, [userId], function (err) {
                if (err) {
                    return res.status(500).send(err.message);
                }

                if (this.changes === 0) {
                    return res.status(404).send('Usuário não encontrado.');
                }

                res.send(`Usuário ${userId} removido com sucesso.`);
            });
        }
    
    };
};

module.exports = userController;
