var connection = require("./connection");

var orm = {
    selectAll: function (table, cb) {
        connection.query("SELECT * FROM ??", table, function (err, result) {
            if (err) { throw err; }
            cb(result);
        });
    },

    insertOne: function (table, colName, colValue, cb) {
        connection.query("INSERT INTO ?? (??) VALUES (?)", [table, colName, colValue], function (err, result) {
            if (err) { throw err; }
            cb(result);
        });
    },

    updateOne: function (table, colName, colValue, id, cb) {
        connection.query("UPDATE ?? SET ?? = ? WHERE id = ?", [table, colName, colValue, id], function (err, result) {
            if (err) { throw err; }
            cb(result);
        });
    }
}

module.exports = orm;

