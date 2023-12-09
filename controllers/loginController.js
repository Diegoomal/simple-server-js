const loginController = {


    getSQLCreateTable () {
        _sql = `
            CREATE TABLE IF NOT EXISTS people (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT,
            name TEXT,
            birthdate TEXT,
            quickdescription TEXT,
            address TEXT
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

};

module.exports = loginController;