var express = require('express');
var router = express.Router();
var Respuesta_Archi_Deter = require('../../../model/Respuesta_Archi_Deter');
var AuthMiddleware = require('../../../middleware/middleware');

var app = express();




router.get('/', AuthMiddleware, function (req, res) {
    var pagination = {
        'Page': parseInt(req.query.page),
        'Limit': parseInt(req.query.limit),
    };

    let query = {};


    Respuesta_Archi_Deter.paginate(query, {
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

router.post('/', AuthMiddleware, function(req, res) {

    var respuesta_Archi_Deter = new Respuesta_Archi_Deter({
        No_de_Oficio_EXT: req.body.No_de_Oficio_EXT,
        Nombre: req.body.Nombre,
        Asunto: req.body.Asunto,
        Firma_del_Responsable: req.body.Firma_del_Responsable

    });

    respuesta_Archi_Deter.addRespuesta_Archi_Deter(function(err, created) {
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            });
        } else {

            res.status(200).send({
                success: created,
                message: "La respuesta de archivo de determinacion ha sido guardado correctamente"
            });
        }
    });

});


router.put('/update/:id', AuthMiddleware,  function(req, res) {
    var id = req.params.id;
    var dataUpdate = req.body;
    Respuesta_Archi_Deter.findByIdAndUpdate(id, dataUpdate, {
        new: true
    }, (err) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: "Respuesta de archivo de determinacion no actualizada"
            });
        } else {
                res.status(200).send({
                    success: true,
                    message : "Respuesta de archivo de determinacion actualizada"
                });
            
        }
    });
});



router.delete('/:id', AuthMiddleware, function(req, res) {
    var Respuesta_Archi_DeterId = req.params.id;

    Respuesta_Archi_Deter.findByIdAndRemove(Respuesta_Archi_DeterId, (err) => {
        // As always, handle any potential errors:
        if (err) {
            res.status(500).send({
                success: false,
                message: err
            })
        } else {
            res.status(200).send({
                success: true,
                message: "Respuesta de archivo de determinacion eliminada"
            })
        }

    });

});


module.exports = router;