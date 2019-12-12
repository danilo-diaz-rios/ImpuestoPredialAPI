var express = require('express');
var router = express.Router();
var Resoluciones_Vigen = require('../../../model/Resoluciones_Vigen');
var AuthMiddleware = require('../../../middleware/middleware');

var app = express();


router.get('/', AuthMiddleware,  function (req, res) {
    var pagination = {
        'Page': parseInt(req.query.page),
        'Limit': parseInt(req.query.limit),
    };

    let query = {};


    Resoluciones_Vigen.paginate(query, {
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
router.post('/', AuthMiddleware, function(req, res) {

    var resoluciones_Vigen = new Resoluciones_Vigen({
        Resoluciones_No: req.body.Resoluciones_No,
        Nombre: req.body.Nombre,
        Referencia: req.body.Referencia,
        Matricula: req.body.Matricula,
        Direccion: req.body.Direccion,
        Valor: req.body.Valor

    });

    resoluciones_Vigen.addResoluciones_Vigen(function(err) {
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        } else {

            res.status(200).send({
                success: true,
                message: "La resolucion ha sido guardado correctamente"
            });
        }
    });

});



router.put('/update/:id', AuthMiddleware, function(req, res) {
    var id = req.params.id;
    var dataUpdate = req.body;
    Resoluciones_Vigen.findByIdAndUpdate(id, dataUpdate, {
        new: true
    }, (err) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: "Resoluciones de vigentes no actualizado"
            });
        } else {
                res.status(200).send({
                    success: true,
                    message : "Resoluciones de vigentes actualizado"
                });
            
        }
    });
});



router.delete('/:id', AuthMiddleware, function(req, res) {
    var id = req.params.id;

    Resoluciones_Vigen.findByIdAndRemove(id, (err) => {
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