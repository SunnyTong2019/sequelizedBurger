var db = require("../models");

module.exports = function (app) {

    app.get("/", function (req, res) {
        db.Burger.findAll({}).then(function (data) {
            res.render("index", { burgers: data });
        });
    });


    app.post("/api/burgers", function (req, res) {
        db.Burger.create({ burger_name: req.body.burger }).then(function (result) {
            res.json({ id: result.insertId });
        });
    });


    app.put("/api/burgers/:id", function (req, res) {
        db.Burger.update(
            { devoured: true },
            { where: { id: req.params.id } }
        ).then(function (result) {
            if (result.changedRows == 0) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
    });

}
