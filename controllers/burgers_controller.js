var db = require("../models");

module.exports = function (app) {

    app.get("/", function (req, res) {
       
        db.Burger.findAll({
            include: [{  // inner join Customer model
                model: db.Customer,
                required: true
            }]
        }).then(function (data) {
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
            {
                devoured: true,
                CustomerId: req.body.CustomerId
            },
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

        // Find a row that matches the query, or create the row if none is found 
        db.Customer.findOrCreate({ where: { customer_name: req.body.customer_name } }).then(function (result) {
            // return the id of the customer found or created
            res.json(result[0].dataValues.id)
        });
    });

}
