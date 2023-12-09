const personController  = (db) => {
    return {

        getSQLCreateTable () {
            _sql = `
                CREATE TABLE IF NOT EXISTS example (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    example_field TEXT,
                )
            `
            return _sql;
        },

        create(req, res) {
            res.send('func - create');
        },

        readall(req, res) {
            res.send('func - readall');
        },
    
        readbyid(req, res) {
            res.send('func - readbyid');
        },

        update(req, res) {
            res.send('func - update');
        },

        delete(req, res) {
            res.send('func - delete');
        }
    }

};

module.exports = personController;