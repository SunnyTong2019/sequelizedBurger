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
            { devoured: true,
              CustomerId: req.body.CustomerId },
            { where: { id: req.params.id } }
        ).then(function (result) {
            // result is an array containing a number 1
            if (result[0] !== 1) {
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        });
    });
    
    app.post("/api/customers", function (req, res) {
        db.Customer.create(req.body).then(function (result) {
            // return the id of the newly created customer
            res.json(result.dataValues.id)
        });
    });

}
