const userController = (db) => {
    return {

        getSQLCreateTable() {
            _sql = `
                CREATE TABLE IF NOT EXISTS address (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    userid INTEGER NOT NULL,
                    street VARCHAR(255),
                    number VARCHAR(255),
                    complement VARCHAR(255),
                    state VARCHAR(255),
                    city VARCHAR(255),
                    zipcode VARCHAR(255),
                    country VARCHAR(255),
                    latitude VARCHAR(255),
                    longitude VARCHAR(255),
                    addresstype VARCHAR(255),
                    FOREIGN KEY (userid) REFERENCES user(id)
                );    
            `
            return _sql;
        },

        create(req, res) {           
            const {
                userid,
                street,
                number,
                complement,
                state,
                city,
                zipcode,
                country,
                latitude,
                longitude,
                addresstype
            } = req.body;

            // Verificar se os campos obrigatórios estão presentes
            if (!userid || !number || !zipcode) {
                return res.status(400).send('Campos obrigatórios ausentes.');
            }

            const query = `
                INSERT INTO address (userid, street, number, complement, state, city, zipcode, country, latitude, longitude, addresstype)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            db.run(
                query,
                [userid, street, number, complement, state, city, zipcode, country, latitude, longitude, addresstype],
                function (err) {
                    if (err) {
                        return res.status(500).send(err.message);
                    }

                    res.status(201).send(`Endereço ${this.lastID} criado com sucesso.`);
                }
            );
        },

        readall(req, res) {
            const query = 'SELECT * FROM address';

            db.all(query, [], (err, rows) => {
                if (err) {
                    return res.status(500).send(err.message);
                }

                res.json(rows);
            });
        },

        readbyid(req, res) {
            const addressId = req.params.id;
            const query = 'SELECT * FROM address WHERE id = ?';

            db.get(query, [addressId], (err, row) => {
                if (err) {
                    return res.status(500).send(err.message);
                }

                if (!row) {
                    return res.status(404).send('Endereço não encontrado.');
                }

                res.json(row);
            });
        },

        update(req, res) {
            const addressId = req.params.id;
            const {
                street,
                number,
                complement,
                state,
                city,
                zipcode,
                country,
                latitude,
                longitude,
                addresstype
            } = req.body;

            // Verificar se os campos obrigatórios estão presentes
            if (!street || !number || !city || !zipcode) {
                return res.status(400).send('Campos obrigatórios ausentes.');
            }

            const query = `
                UPDATE address
                SET street = ?, number = ?, complement = ?, state = ?, city = ?, zipcode = ?, country = ?, latitude = ?, longitude = ?, addresstype = ?
                WHERE id = ?
            `;

            db.run(
                query,
                [street, number, complement, state, city, zipcode, country, latitude, longitude, addresstype, addressId],
                function (err) {
                    if (err) { return res.status(500).send(err.message); }
                    res.send(`Endereço ${addressId} atualizado com sucesso.`);
                }
            );
        },

        delete(req, res) {
            const addressId = req.params.id;

            const query = 'DELETE FROM address WHERE id = ?';

            db.run(query, [addressId], function (err) {
                if (err) {
                    return res.status(500).send(err.message);
                }

                if (this.changes === 0) {
                    return res.status(404).send('Endereço não encontrado.');
                }

                res.send(`Endereço ${addressId} removido com sucesso.`);
            });
        }
    
    };
};

module.exports = userController;
