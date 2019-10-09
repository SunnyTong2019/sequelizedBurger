module.exports = function (sequelize, DataTypes) {
    var Burger = sequelize.define("burger", {
        burger_name: DataTypes.STRING,
        devoured: DataTypes.BOOLEAN
    });
    return Burger;
}