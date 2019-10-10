var db = require("../models");

module.exports = function (app) {

    app.get("/", function (req, res) {
        db.Burger.findAll({
            include: [{
                // required: false --- Burger model left join Customer model
                // If required is set to true, it will be an inner join.
                // We don't need inner join as when a new burger is created, it won't have a customer yet. So we want left join to display all Burgers.
                model: db.Customer,
                required: false
            }],
            order: ['burger_name'] // Order the Burgers sent back to the user in alphabetical order
        }).then(function (data) {
            res.render("index", { burgers: data });
        }).catch(function (err) {
            console.log(err);
        });
    });


    app.post("/api/burgers", function (req, res) {
        db.Burger.create({
            burger_name: req.body.burger
        }).then(function (result) {
            res.json({ id: result.insertId });
        }).catch(function (err) {
            console.log(err);
        });
    });


    app.put("/api/burgers/:id", function (req, res) {
        db.Burger.update(
            {
                devoured: true,
                CustomerId: req.body.CustomerId
            },
            {
                where: { id: req.params.id }
            }).then(function (result) {
                // result is an array containing a number 1
                if (result[0] !== 1) {
                    return res.status(404).end();
                } else {
                    res.status(200).end();
                }
            }).catch(function (err) {
                console.log(err);
            });
    });


    app.post("/api/customers", function (req, res) {
        // findOrCreate --- Find a row that matches the query, or create the row if none is found 
        db.Customer.findOrCreate({
            where: { customer_name: req.body.customer_name }
        }).then(function (result) {
            // return the id of the customer found or created as response
            res.json(result[0].dataValues.id)
        }).catch(function (err) {
            console.log(err);
        });
    });

}
