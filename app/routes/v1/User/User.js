var express = require('express');
var router = express.Router();
var User = require('../../../model/User');
var app = express();
require('dotenv').config();
var AuthMiddleware = require('../../../middleware/middleware');

app.set('secret', process.env.JWT_SECRET);

router.get('/', function (req, res) {
    var pagination = {
        'Page': parseInt(req.query.page),
        'Limit': parseInt(req.query.limit),
    };

    let query = {};


    User.paginate(query, {
        page: pagination.Page,
        limit: pagination.Limit,
        sort: '-Auditory.createdAt'
    }, function (err, result) {
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        } else {
            res.status(200).send({
                success: true,
                message: result
            });

        }
    });

});

router.post('/register', function (req, res) {

    var user = new User({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Username: req.body.Username,
        Password: req.body.Password,
        Identification: req.body.Identification
    });

    user.addUser(function (err, created, user) {
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        } else {
            res.status(200).send({
                success: true,
                message: 'Usuario creado'
            });
        }
    });

});

router.put('/:id',AuthMiddleware, function (req, res) {
    var userId = req.params.id;
    var dataUpdate = req.body;
    User.findByIdAndUpdate(userId, dataUpdate, {
        new: true
    },(err) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: 'Ha ocurrido un error al intentar actualizar el dato.'
            });
        } else {
            res.status(200).send({
                success: true,
                message: 'Usuario actualizado'
            });
        }

    });

});
router.delete('/:id',AuthMiddleware, function (req, res) {
    var userId = req.params.id;

    User.findByIdAndRemove(userId, (err, user) => {
        // As always, handle any potential errors:
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        } else {
            res.status(200).send({
                success: true,
                message: 'Usuario eliminado'
            });
        }
    });
});

module.exports = router;