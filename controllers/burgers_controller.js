var express = require("express");
var router = express.Router();
var burger = require("../models/burger");


router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        res.render("index", { burgers: data });
    })
});


router.post("/api/burgers", function (req, res) {
    burger.insertOne(req.body.burger, function (result) {
        res.json({ id: result.insertId });
    })
});


router.put("/api/burgers/:id", function (req, res) {
    burger.updateOne(req.params.id, function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
});

module.exports = router;
