const bcrypt = require('bcrypt');

const loginController = (db) => {
    return {
        async read(req, res) {
            try {
                const { email, password } = req.body;
                const query = 'SELECT id, password FROM user WHERE email = ?;';
                
                db.get(query, [email], async (err, row) => {
                    if (err) {
                        return res.status(500).send(err.message);
                    }
                    if (!row) {
                        return res.status(404).send('Usuário não encontrado.');
                    }

                    const hashedPasswordFromDatabase = row.password;

                    // Comparar a senha fornecida com a senha no banco de dados
                    const isPasswordValid = await bcrypt.compare(password, hashedPasswordFromDatabase);

                    if (isPasswordValid) {
                        // Senha válida, você pode retornar informações do usuário, como o ID
                        res.json({ id: row.id });
                    } else {
                        // Senha inválida
                        res.status(401).send('Senha incorreta.');
                    }
                });
            } catch (error) {
                return res.status(500).send('Erro ao tentar fazer login.');
            }
        }
    }
};

module.exports = loginController;