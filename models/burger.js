var orm = require("../config/orm");

var burger = {
    selectAll: function (cb) {
        orm.selectAll("burgers", function (result) {
            cb(result);
        });
    },

    insertOne: function (userBurger, cb) {
        orm.insertOne("burgers", "burger_name", userBurger
            , function (result) {
                cb(result);
            });
    },

    updateOne: function (burgerID, cb) {
        orm.updateOne("burgers", "devoured", true, burgerID, function (result) {
            cb(result);
        });
    }
};

module.exports = burger;
