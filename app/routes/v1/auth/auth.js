// *************************************************+
// APIS FOR AUTHENTICATION MANAGEMENT 
// *************************************************+

var express = require('express');
var router = express.Router();
var User = require('../../../model/User');
var app = express();
var jwt = require('jsonwebtoken');
require('dotenv').config();
app.set('secret', process.env.JWT_SECRET);


router.post('/authenticate', function (req, res) {
    User.findOne({
        Username: req.body.Username
    }).exec(function (err, user) {
            if (err)
                throw err;
            if (!user) {
                console.log(user)
                res.status(403).send({
                    success: false,
                    message: 'Username or password wrong.'
                });
            } else if (user) {
                user.comparePassword(req.body.Password, function (err, isMatch) {
                    if (err) throw err;
                    if (isMatch) {
                        var token = jwt.sign({
                            _id: user._id,
                            Username: user.Username,
                            FirstName: user.FirstName,
                            LastName: user.LastName,
                            Email: user.Email,
                            Identification: user.Identification
                        },
                        app.get('secret'));
                        res.status(200).send({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });

                    } else {
                        res.status(401).send({
                            success: false,
                            message: 'Username or password wrong.'
                        });
                    }
                });

            }
        });

});
router.get('/current', function (req, res) {

    var token = req.headers['x-access-token'];

    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('secret'), function (err, decoded) {

            if (err) {
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                return res.status(200).send({
                    success: true,
                    message: decoded
                });
            }
        });

    } else {
    //if there is no token
    //return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }

});


module.exports = router;