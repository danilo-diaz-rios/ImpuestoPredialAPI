var express = require('express');
var router = express.Router();
var Solicitud_Abo = require('../../../model/Solicitud_Abo');
var AuthMiddleware = require('../../../middleware/middleware');

var app = express();




router.get('/', AuthMiddleware, function (req, res) {
    var pagination = {
        'Page': parseInt(req.query.page),
        'Limit': parseInt(req.query.limit),
    };

    let query = {};


    Solicitud_Abo.paginate(query, {
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

    var solicitud_Abo = new Solicitud_Abo({
        No_de_Oficio_EXT: req.body.No_de_Oficio_EXT,
        Nombre: req.body.Nombre,
        Asunto: req.body.Asunto,
        Firma_de_Abogado_Solicitante: req.body.Firma_de_Abogado_Solicitante

    });

    solicitud_Abo.addSolicitud_Abo(function(err, created) {
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        } else {

            res.status(200).send({
                success: created,
                message: "La solicitud de abogado ha sido guardado correctamente"
            });
        }
    });

});

router.put('/update/:id', AuthMiddleware,   function(req, res) {
    var id = req.params.id;
    var dataUpdate = req.body;
    Solicitud_Abo.findByIdAndUpdate(id, dataUpdate, {
        new: true
    }, (err) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: "La solicitud de abogado de determinacion no actualizada"
            });
        } else {
                res.status(200).send({
                    success: true,
                    message : "La solicitud de abogado de determinacion actualizada"
                });
            
        }
    });
});


router.delete('/:id', AuthMiddleware,  function(req, res) {
    var Solicitud_AboId = req.params.id;

    Solicitud_Abo.findByIdAndRemove(Solicitud_AboId, (err, resSolicitud_Abo) => {
        // As always, handle any potential errors:
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            })
        } else {
            res.status(200).send({
                success: true,
                message: "Solicitud de abogado eliminada"
            })
        }

    });

});



module.exports = router;