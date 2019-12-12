var express = require('express');
var router = express.Router();
var Notificacion_Emba = require('../../../model/Notificacion_Emba');
var AuthMiddleware = require('../../../middleware/middleware');

var app = express();

router.get('/', AuthMiddleware, function (req, res) {
    var pagination = {
        'Page': parseInt(req.query.page),
        'Limit': parseInt(req.query.limit),
    };

    let query = {};


    Notificacion_Emba.paginate(query, {
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

router.post('/',AuthMiddleware,  function(req, res) {

    var notificacion_Emba = new Notificacion_Emba({
        Expediente: req.body.Expediente,
        Resolucion_No: req.body.Resolucion_No,
        Nombre: req.body.Nombre,
        Matricula: req.body.Matricula,
        Referencia: req.body.Referencia

    });

    notificacion_Emba.addNotificacion_Emba(function(err) {
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        } else {

            res.status(200).send({
                success: true,
                message: "La notificacion de embargo ha sido guardado correctamente"
            });
        }
    });

});


router.put('/update/:id', AuthMiddleware,   function(req, res) {
    var id = req.params.id;
    var dataUpdate = req.body;
    Notificacion_Emba.findByIdAndUpdate(id, dataUpdate, {
        new: true
    }, (err) => {
        if (err) {
            res.status(500).send({
                message: "Notificacion de embargo no actualizado"
            });
        } else {
                res.status(200).send({
                    success: true,
                    message : "Notificacion de embargo actualizada"
                });
            
        }
    });
});

router.delete('/:id', AuthMiddleware, function(req, res) {
    var id = req.params.id;

    Notificacion_Emba.findByIdAndRemove(id, (err) => {
        // As always, handle any potential errors:
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            })
        } else {
            res.status(200).send({
                success: true,
                message: "Notificacion de embargo eliminada"
            })
        }

    });

});




module.exports = router;