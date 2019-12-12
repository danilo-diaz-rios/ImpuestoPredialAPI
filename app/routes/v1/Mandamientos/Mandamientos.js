var express = require('express');
var router = express.Router();
var Mandamientos = require('../../../model/Mandamientos');
var app = express();

var AuthMiddleware = require('../../../middleware/middleware');

router.get('/', AuthMiddleware, function (req, res) {
    var pagination = {
        'Page': parseInt(req.query.page),
        'Limit': parseInt(req.query.limit),
    };

    let query = {};


    Mandamientos.paginate(query, {
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

    var mandamientos = new Mandamientos({
        Mandamiento_de_pago_No: req.body.Mandamiento_de_pago_No,
        Ciudad: req.body.Ciudad,
        Expediente: req.body.Expediente,
        ReferenciaC: req.body.ReferenciaC,
        Direccion: req.body.Direccion,
        Propietario: req.body.Propietario,
        Resolucion: req.body.Resolucion,
        Valor: req.body.Valor,
        Notificacion: req.body.Notificacion

    });

    mandamientos.addMandamientos(function(err, created) {
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        } else {

            res.status(200).send({
                success: true,
                message: "Mandamiento ha sido guardado correctamente"
            });
        }
    });

});



router.put('/update/:id',AuthMiddleware,  function(req, res) {
    var mandamientoId = req.params.id;
    var dataUpdate = req.body;
    Mandamientos.findByIdAndUpdate(mandamientoId, dataUpdate, {
        new: true
    }, (err) => {
        if (err) {
            res.status(500).send({
                    success: false,
                    message: "Mandamiento no actualizado"
            });
        } else {
                res.status(200).send({
                    success: true,
                    message : "Mandamiento actualizado"
                });
            
        }
    });
});


router.delete('/:id', AuthMiddleware, function(req, res) {
    var mandamientosId = req.params.id;

    Mandamientos.findByIdAndRemove(mandamientosId, (err) => {
        // As always, handle any potential errors:
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            })
        } else {
            res.status(200).send({
                success: true,
                message: "Mandamiento eliminado"
            })
        }

    });

});



module.exports = router;