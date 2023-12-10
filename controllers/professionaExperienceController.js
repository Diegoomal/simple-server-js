const professionalExperienceController  = (db) => {
    return {

        getSQLCreateTable () {
            _sql = `
                CREATE TABLE IF NOT EXISTS professionalexperience (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    userid INTEGER NOT NULL,
                    position VARCHAR(255) NOT NULL,
                    companyname VARCHAR(255) NOT NULL,
                    description VARCHAR(255) NOT NULL,
                    startdate DATE,
                    enddate DATE,
                    FOREIGN KEY (userid) REFERENCES user(id)
                );
            `
            return _sql;
        },

        create(req, res) {

            const { userid, position, companyname, description, startdate, enddate } = req.body;

            // Verificar se os campos obrigatórios estão presentes
            if (!userid || !position || !companyname || !description ) {
                return res.status(400).send('Campos obrigatórios ausentes.');
            }

            const query = `
                INSERT INTO professionalexperience (userid, position, companyname, description, startdate, enddate)
                VALUES (?, ?, ?, ?, ?, ?)`;

            // Parâmetros da consulta SQL
            const params = enddate
                ? [userid, position, companyname, description, startdate, enddate]
                : [userid, position, companyname, description, startdate];

            // Executar a consulta SQL
            db.run(query, params, function (err) {
                if (err) { return res.status(500).send(err.message); }

                res.status(201).send(`Experiência profissional ${this.lastID} criada com sucesso.`);
            });

        },

        readall(req, res) {
            const query = 'SELECT * FROM professionalexperience';
            db.all(query, [], (err, rows) => {
                if (err) { return res.status(500).send(err.message); }

                res.json(rows);
            });
        },
    
        readbyid(req, res) {
            const experienceId = req.params.id;
            const query = 'SELECT * FROM professionalexperience WHERE id = ?';
            db.get(query, [experienceId], (err, row) => {
                if (err) { return res.status(500).send(err.message); }
                if (!row) { return res.status(404).send('Experiência profissional não encontrada.'); }
                res.json(row);
            });
        },

        update(req, res) {
            const experienceId = req.params.id;
            const { userid, position, companyname, description, startdate, enddate } = req.body;

            // Verificar se os campos obrigatórios estão presentes
            if (!userid || !position || !companyname || !description) { 
                return res.status(400).send('Campos obrigatórios ausentes.'); 
            }

            const query = `
                UPDATE professionalexperience
                SET
                    userid = ?,
                    position = ?,
                    companyname = ?,
                    description = ?,
                    startdate = ?,
                    enddate = ?
                WHERE id = ?
            `;

            db.run(
                query,
                [userid, position, companyname, description, startdate, enddate, experienceId],
                function (err) {
                    if (err) { return res.status(500).send(err.message); }
                    res.send(`Experiência profissional ${experienceId} atualizada com sucesso.`);
                }
            );

        },

        delete(req, res) {
            const experienceId = req.params.id;
            const query = 'DELETE FROM professionalexperience WHERE id = ?';

            db.run(query, [experienceId], function (err) {
                if (err) {
                    return res.status(500).send(err.message);
                }

                if (this.changes === 0) {
                    return res.status(404).send('Experiência profissional não encontrada.');
                }

                res.send(`Experiência profissional ${experienceId} removida com sucesso.`);
            });
        }
    }

};

module.exports = professionalExperienceController;