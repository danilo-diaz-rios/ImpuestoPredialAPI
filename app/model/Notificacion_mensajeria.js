// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;
// set up a mongoose model and pass it using module.exports
var NmensajeriaSchema = new Schema({

    Empresa_mensajeria : {
        type: String
    },
    Nombre: {
        type: String

    },
    Direccion: {
        type: String
    },
    Firma_recibido : {
        type: String
    },
    Auditory: {
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }

});


NmensajeriaSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Mensajeria', NmensajeriaSchema);