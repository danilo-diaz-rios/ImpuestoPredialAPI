var express = require('express');
var router = express.Router();
var Resoluciones_Conve_Pag = require('../../../model/Resoluciones_Conve_Pag');
var AuthMiddleware = require('../../../middleware/middleware');

var app = express();


router.get('/', AuthMiddleware,  function (req, res) {
    var pagination = {
        'Page': parseInt(req.query.page),
        'Limit': parseInt(req.query.limit),
    };

    let query = {};


    Resoluciones_Conve_Pag.paginate(query, {
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

router.post('/', AuthMiddleware,  function(req, res) {

    var resoluciones_Conve_Pag = new Resoluciones_Conve_Pag({
        Resolucion_No: req.body.Resolucion_No,
        No_de_Convenio: req.body.No_de_Convenio,
        Referencia: req.body.Referencia,
        Nombre: req.body.Nombre,
        Valor: req.body.Valor,
        Fecha: req.body.Fecha,
        No_de_Cuotas: req.body.No_de_Cuotas

    });

    resoluciones_Conve_Pag.addResoluciones_Conve_Pag(function(err, created) {
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        } else {

            res.status(200).send({
                success: true,
                message: "La resolucion de convenio de pago ha sido guardado correctamente"
            });
        }
    });

});


router.put('/update/:id', AuthMiddleware,  function(req, res) {
    var id = req.params.id;
    var dataUpdate = req.body;
    Resoluciones_Conve_Pag.findByIdAndUpdate(id, dataUpdate, {
        new: true
    }, (err) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: "Resoluciones de convenio de pago no actualizado"
            });
        } else {
                res.status(200).send({
                    success: true,
                    message : "Resoluciones de convenio de pago actualizado"
                });
            
        }
    });
});



router.delete('/:id', AuthMiddleware, function(req, res) {
    var Resoluciones_Conve_PagId = req.params.id;
    Resoluciones_Conve_Pag.findByIdAndRemove(Resoluciones_Conve_PagId, (err) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            })
        } else {
            res.status(200).send({
                success: true,
                message: "Resolucion de convenio de pago eliminada"
            })
        }

    });

});

module.exports = router;