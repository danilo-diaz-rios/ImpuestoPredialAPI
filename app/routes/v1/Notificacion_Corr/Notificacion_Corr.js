var express = require('express');
var router = express.Router();
var Notificacion_Corr = require('../../../model/Notificacion_Corr');
var app = express();


var AuthMiddleware = require('../../../middleware/middleware');

router.get('/', AuthMiddleware, function (req, res) {
    var pagination = {
        'Page': parseInt(req.query.page),
        'Limit': parseInt(req.query.limit),
    };

    let query = {};


    Notificacion_Corr.paginate(query, {
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

router.post('/',AuthMiddleware, function(req, res) {

    var notificacion_Corr = new Notificacion_Corr({
        Ciudad: req.body.Ciudad,
        Nombre: req.body.Nombre,
        Referencia_Catas: req.body.Referencia_Catas,
        Direccion: req.body.Direccion,
        Propietario: req.body.Propietario

    });

    notificacion_Corr.addNotificacion_Corr(function(err, created) {
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        } else {

            res.status(200).send({
                success: created,
                message: "La notificacion de correo ha sido guardado correctamente"
            });
        }
    });

});

router.delete('/:id', AuthMiddleware,  function(req, res) {
    var Notificacion_CorrId = req.params.id;

    Notificacion_Corr.findByIdAndRemove(Notificacion_CorrId, (err, resNotificacion_Corr) => {
        // As always, handle any potential errors:
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            })
        } else {
            res.status(200).send({
                success: true,
                message: "Notificacion de correo eliminada"
            })
        }

    });

});

router.put('/update/:id', AuthMiddleware,  function(req, res) {
    var id = req.params.id;
    var dataUpdate = req.body;
    Notificacion_Corr.findByIdAndUpdate(id, dataUpdate, {
        new: true
    }, (err) => {
        if (err) {
            res.status(500).send({
                message: "Correspondencia no actualizado"
            });
        } else {
                res.status(200).send({
                    success: true,
                    message : "Correspondencia actualizado"
                });
            
        }
    });
});


module.exports = router;