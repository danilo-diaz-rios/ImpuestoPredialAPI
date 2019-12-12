var express = require('express');
var router = express.Router();
var Resoluciones = require('../../../model/Resoluciones');
var AuthMiddleware = require('../../../middleware/middleware');

var app = express();


router.get('/', AuthMiddleware,  function (req, res) {
    var pagination = {
        'Page': parseInt(req.query.page),
        'Limit': parseInt(req.query.limit),
    };

    let query = {};


    Resoluciones.paginate(query, {
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

    var resoluciones = new Resoluciones({
        Resoluciones_No: req.body.Resoluciones_No,
        No_Expediente: req.body.No_Expediente,
        ReferenciaC: req.body.ReferenciaC,
        Direccion: req.body.Direccion,
        Nombres: req.body.Nombres,
        Valor: req.body.Valor,
        Notificacion: req.body.Notificacion

    });

    resoluciones.addResoluciones(function(err, created) {
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        } else {

            res.status(200).send({
                success: created,
                message: "La resolucion ha sido guardado correctamente"
            });
        }
    });

});

router.put('/update/:id', AuthMiddleware,  function(req, res) {
    var id = req.params.id;
    var dataUpdate = req.body;
    Resoluciones.findByIdAndUpdate(id, dataUpdate, {
        new: true
    }, (err) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: "Resoluciones no ha sido actualizada"
            });
        } else {
                res.status(200).send({
                    success: true,
                    message : "Resoluciones ha sido actualidada correctamente"
                });
            
        }
    });
});



router.delete('/:id', AuthMiddleware, function(req, res) {
    var ResolucionesId = req.params.id;

    Resoluciones.findByIdAndRemove(ResolucionesId, (err) => {
        // As always, handle any potential errors:
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            })
        } else {
            res.status(200).send({
                success: true,
                message: "Resolucion eliminada"
            })
        }

    });

});



module.exports = router;