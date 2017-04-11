"use strict";

let db = require('./pghelper');

let escape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

let findAll = (req, res, next) => {

    let values = [];

    let sql = "SELECT SUM(amount) as amount, beer.id, beer.name, alcohol, tags, image, brewery " +
                "FROM beer INNER JOIN deposit on beer.id = deposit.beer_id " +
                "GROUP BY beer.id";

    db.query(sql, values)
        .then(deposits => {
                return res.json({"deposits": deposits});
        })
        .catch(next);
};

let create = (req, res, next) => {
  console.log(req.body);
  console.log('body');
  console.log(req);
  console.log('req');
    let name = req.body.beer_name;
    let beer_id = req.body.beer_id;
    let amount = req.body.amount;
    let values = [name, beer_id, amount];

    let sql = "INSERT INTO deposit (beer, beer_id, amount) VALUES ($1, $2, $3);";

    db.query(sql, values)
        .then(product => res.json(product))
        .catch(next);
};

exports.findAll = findAll;
exports.create = create;
