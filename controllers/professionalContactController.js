const professionalContactController = (db) => {
    return {

        getSQLCreateTable () {
            _sql = `
                CREATE TABLE IF NOT EXISTS professionalcontact (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    userid INTEGER NOT NULL,
                    professional_email VARCHAR(255) NOT NULL,
                    professional_phone VARCHAR(20),
                    professional_address VARCHAR(255),
                    linkedin_profile VARCHAR(255),
                    github_profile VARCHAR(255),
                    company_website VARCHAR(255),
                    skype_id VARCHAR(50),
                    other_messaging_tool VARCHAR(255),
                    FOREIGN KEY (userid) REFERENCES user(id)
                );
            `
            return _sql;
        },

        create(req, res) {
            const { 
                userid,
                professional_email,
                professional_phone,
                professional_address,
                linkedin_profile,
                github_profile,
                company_website,
                skype_id,
                other_messaging_tool
            } = req.body;

            // Verificar se os campos obrigatórios estão presentes
            if (!userid || !professional_email) {
                return res.status(400).send('Campos obrigatórios ausentes.');
            }

            // Construir a consulta SQL
            const query = `
                INSERT INTO professionalcontact (
                    userid,
                    professional_email,
                    professional_phone,
                    professional_address,
                    linkedin_profile,
                    github_profile,
                    company_website,
                    skype_id,
                    other_messaging_tool
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;

            // Parâmetros da consulta SQL
            const params = [
                userid,
                professional_email,
                professional_phone,
                professional_address,
                linkedin_profile,
                github_profile,
                company_website,
                skype_id,
                other_messaging_tool
            ];

            // Executar a consulta SQL
            db.run(query, params, function (err) {
                if (err) {
                    return res.status(500).send(err.message);
                }

                res.status(201).send(`Informações de contato profissional ${this.lastID} criadas com sucesso.`);
            });
        },

        readall(req, res) {
            const query = `SELECT * FROM professionalcontact;`;

            db.all(query, (err, rows) => {
                if (err) {
                    return res.status(500).send(err.message);
                }

                res.json(rows);
            });
        },
    
        readbyid(req, res) {
            const professionaContactid = req.params.id;

            const query = `
                SELECT * FROM professionalcontact
                WHERE userid = ?;
            `;

            db.all(query, [professionaContactid], (err, rows) => {
                if (err) { return res.status(500).send(err.message); }
                res.json(rows);
            });
        },

        update(req, res) {

            const contactId = req.params.id;
            const {
                professional_email,
                professional_phone,
                professional_address,
                linkedin_profile,
                github_profile,
                company_website,
                skype_id,
                other_messaging_tool
            } = req.body;
        
            // Verificar se os campos obrigatórios estão presentes
            if (!professional_email) {
                return res.status(400).send('O e-mail profissional é obrigatório.');
            }
        
            const updateQuery = `
                UPDATE professionalcontact
                SET
                    professional_email = ?,
                    professional_phone = ?,
                    professional_address = ?,
                    linkedin_profile = ?,
                    github_profile = ?,
                    company_website = ?,
                    skype_id = ?,
                    other_messaging_tool = ?
                WHERE
                    id = ?
            `;
        
            db.run(
                updateQuery,
                [
                    professional_email,
                    professional_phone,
                    professional_address,
                    linkedin_profile,
                    github_profile,
                    company_website,
                    skype_id,
                    other_messaging_tool,
                    contactId
                ],
                function (err) {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    res.send(`Contato profissional com ID ${contactId} atualizado com sucesso.`);
                }
            );
        
        },

        delete(req, res) {
            const contactId = req.params.id;

            const deleteQuery = `
                DELETE FROM professionalcontact
                WHERE id = ?
            `;

            db.run(
                deleteQuery,
                [contactId],
                function (err) {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    res.send(`Contato profissional com ID ${contactId} excluído com sucesso.`);
                }
            );
        }
    }

};

module.exports = professionalContactController;