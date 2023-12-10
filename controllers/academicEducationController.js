const academicEducationController = (db) => {
    return {

        getSQLCreateTable () {
            // degree: Para especificar o grau obtido durante o curso.
            // description: Uma breve descrição do curso ou da instituição.
            // location: A localização da instituição.
            // current: Um campo booleano para indicar se o curso está atualmente em andamento.
            // gpa (GPA - Grade Point Average): Para incluir o desempenho acadêmico do estudante.
            // thesis: Caso o curso envolva um projeto final ou tese.
            // awards: Prêmios ou reconhecimentos recebidos durante o curso.
            _sql = `
                CREATE TABLE IF NOT EXISTS academiceducation (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    userid INTEGER NOT NULL,
                    institutename VARCHAR(255) NOT NULL,
                    coursename VARCHAR(255) NOT NULL,
                    degree VARCHAR(255),
                    description VARCHAR(255),
                    location VARCHAR(255),
                    startdate DATE,
                    enddate DATE,
                    current BOOLEAN,
                    gpa FLOAT,
                    thesis VARCHAR(255),
                    awards VARCHAR(255),
                    FOREIGN KEY (userid) REFERENCES user(id)
                );
            `
            return _sql;
        },

        create(req, res) {
            const {
                userid,
                institutename,
                coursename,
                degree,
                description,
                location,
                startdate,
                enddate,
                current,
                gpa,
                thesis,
                awards
            } = req.body;

            // Verificar se os campos obrigatórios estão presentes
            if (!userid || !institutename || !coursename) {
                const missingFields = [
                    !userid && 'userid',
                    !institutename && 'institutename',
                    !coursename && 'coursename'
                ].filter(Boolean);

                return res.status(400).send(
                    'Campos obrigatórios ausentes: ' + missingFields.join(', ')
                );
            }

            // Construir a consulta SQL com base na presença de enddate e current
            let query;
            let params;

            if (enddate && current) {
                return res.status(400).send('Ambos enddate e current não podem estar presentes ao mesmo tempo.');
            } else if (current) {
                query = `
                    INSERT INTO academiceducation (userid, institutename, coursename, degree, description, location, startdate, current, gpa, thesis, awards)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                params = [userid, institutename, coursename, degree, description, location, startdate, true, gpa, thesis, awards];
            } else {
                query = `
                    INSERT INTO academiceducation (userid, institutename, coursename, degree, description, location, startdate, enddate, gpa, thesis, awards)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                params = [userid, institutename, coursename, degree, description, location, startdate, enddate, gpa, thesis, awards];
            }

            // Executar a consulta SQL
            db.run(query, params, function (err) {
                if (err) {
                    return res.status(500).send(err.message);
                }

                res.status(201).send(`Educação acadêmica ${this.lastID} criada com sucesso.`);
            });
        },

        readall(req, res) {
            const userId = req.params.userid;

            const query = 'SELECT * FROM academiceducation';
            
            db.all(query, [userId], (err, rows) => {
                if (err) {
                    return res.status(500).send(err.message);
                }

                res.json(rows);
            });
        },
    
        readbyid(req, res) {
            const educationId = req.params.id;

            if (!educationId) {
                return res.status(400).send('ID do usuário ou ID da educação acadêmica não fornecido.');
            }

            const query = 'SELECT * FROM academiceducation WHERE id = ?';

            db.get(query, [educationId], (err, row) => {
                if (err) { return res.status(500).send(err.message); }
                if (!row) { return res.status(404).send('Educação acadêmica não encontrada.'); }
                res.json(row);
            });
        },

        update(req, res) {
            const educationId = req.params.id;
            const { institutename, coursename, startdate, enddate } = req.body;

            if (!educationId || !institutename || !coursename) {
                return res.status(400).send('Campos obrigatórios ausentes.');
            }

            const query = `
                UPDATE academiceducation
                SET
                    institutename = ?,
                    coursename = ?,
                    startdate = ?,
                    enddate = ?
                WHERE id = ?
            `;

            db.run(
                query,
                [institutename, coursename, startdate, enddate, educationId],
                function (err) {
                    if (err) {
                        return res.status(500).send(err.message);
                    }

                    res.send(`Educação acadêmica ${educationId} atualizada com sucesso.`);
                }
            );
        },

        delete(req, res) {
            const educationId = req.params.id;

            if (!educationId) {
                return res.status(400).send('Campos obrigatórios ausentes.');
            }

            const query = 'DELETE FROM academiceducation WHERE id = ?;';

            db.run(
                query,
                [educationId],
                function (err) {
                    if (err) {
                        return res.status(500).send(err.message);
                    }

                    res.send(`Educação acadêmica ${educationId} excluída com sucesso.`);
                }
            );
        }
    }

};

module.exports = academicEducationController;