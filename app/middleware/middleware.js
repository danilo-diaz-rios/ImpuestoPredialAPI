var jwt = require('jsonwebtoken');
var express = require('express');
var app = express();

require('dotenv').config();

app.set('secret', process.env.JWT_SECRET);


// route middleware that will happen on every request
module.exports = function (req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret key
        jwt.verify(token, app.get('secret'), function (err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;

                next();

            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

};