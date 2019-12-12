var express = require('express');
var router = express.Router();
var MandamientosPago = require('../../../model/Mandamientos_Pago');
var app = express();
var AuthMiddleware = require('../../../middleware/middleware');

router.get('/', AuthMiddleware, function (req, res) {
    var pagination = {
        'Page': parseInt(req.query.page),
        'Limit': parseInt(req.query.limit),
    };

    let query = {};


    MandamientosPago.paginate(query, {
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

    var mandamientos_Pago = new MandamientosPago({
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

    mandamientos_Pago.addMandamientos_Pago(function(err, created) {
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        } else {

            res.status(200).send({
                success: true,
                message: "Mandamiento de pago ha sido guardado correctamente"
            });
        }
    });

});


router.put('/update/:id', AuthMiddleware,  function(req, res) {
    var mandamientoPagoId = req.params.id;
    var update = req.body;
    MandamientosPago.findByIdAndUpdate(mandamientoPagoId, update, {
        new: true
    }, (err) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: "Error en la peticion"
            });
        } else {
                res.status(200).send({
                    success: true,
                    message: "Mandamiento de pago actulizado"
                });
            
        }
    });
});



router.delete('/:id', AuthMiddleware,  function(req, res) {
    var mandamientosPagoId = req.params.id;

    MandamientosPago.findByIdAndRemove(mandamientosPagoId, (err) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            })
        } else {
            res.status(200).send({
                success: true,
                message: "Mandamiento de pago eliminado"
            })
        }

    });

});


module.exports = router;