const personController = {

    create(req, res) {
        res.send('doNew - exemplo resp');
    },

    readall(req, res) {
        res.send('getAll - exemplo resp');
        db.all('SELECT * FROM people', (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json(rows);
        });
    },
  
    readbyid(req, res) {
        res.send('getById - exemplo resp');
    },

    update(req, res) {
        res.send('doUpdate - exemplo resp');
    },

    delete(req, res) {
        res.send('doDelete - exemplo resp');
    }

};

module.exports = personController;