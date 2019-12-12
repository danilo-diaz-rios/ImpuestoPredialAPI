var express = require('express');
var router = express.Router();
var Mensajeria = require('../../../model/Notificacion_mensajeria');
var AuthMiddleware = require('../../../middleware/middleware');
var app = express();


router.get('/', AuthMiddleware,  function (req, res) {
    var pagination = {
        'Page': parseInt(req.query.page),
        'Limit': parseInt(req.query.limit),
    };

    let query = {};


    Mensajeria.paginate(query, {
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



//CREATE
router.post('/', AuthMiddleware,  function(req, res) {

    var notificacion = new Mensajeria({
        Empresa_mensajeria: req.body.Empresa_mensajeria,
        Nombre: req.body.Nombre,
        Direccion: req.body.Direccion,
        Firma_recibido: req.body.Firma_recibido

    });

    notificacion.save(function(err, created) {
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        } else {

            res.status(200).send({
                success: true,
                message: "notificacion de mensajeria ha sido guardada correctamente"
            });
        }
    });

});


router.put('/update/:id',AuthMiddleware,   function(req, res) {
    var id = req.params.id;
    var dataUpdate = req.body;
    Mensajeria.findByIdAndUpdate(id, dataUpdate, {
        new: true
    }, (err) => {
        if (err) {
            res.status(500).send({
                message: "Notifiacion de mensajeria no actualizada"
            });
        } else {
                res.status(200).send({
                    success: true,
                    message : "Notificacion de mensajeria actualizada"
                });
            
        }
    });
});


//DELETE
router.delete('/:id', AuthMiddleware, function(req, res) {
    var notificacionId = req.params.id;

    Mensajeria.findByIdAndRemove(notificacionId, (err) => {
        // As always, handle any potential errors:
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            })
        } else {
            res.status(200).send({
                success: true,
                message: "Notificacion eliminada"
            })
        }

    });

});







module.exports = router;