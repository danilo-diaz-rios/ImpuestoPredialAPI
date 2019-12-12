// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;
// set up a mongoose model and pass it using module.exports
var Solicitud_AboSchema = new Schema({

    No_de_Oficio_EXT: {
        type: String

    },
    Nombre: {
        type: String


    },
    Asunto: {
        type: String


    },
    Firma_de_Abogado_Solicitante: {
        type: String


    },
    Auditory: {
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }

});

Solicitud_AboSchema.plugin(mongoosePaginate);

Solicitud_AboSchema.methods.addSolicitud_Abo = function(cb) {
    var date = new Date(Date.now());
    //Temporal solution for datetime offset
    Date.prototype.addHours = function(h) {
        this.setTime(this.getTime() + (h * 60 * 60 * 1000));
        return this;
    }

    this.Auditory.createdAt = date.addHours(-5);

    this.save(err => {
        if (err) return cb(err);
        var created = true;
        cb(null, created);

    });
};

Solicitud_AboSchema.statics.findSolicitud_Abo = function(cb) {
    return this.model('Solicitud de abogado').find({}, cb);
};

Solicitud_AboSchema.statics.deleteSolicitud_Abo = function(id, cb) {
    return this.model('Solicitud de abogado').findByIdAndRemove(id, cb);
};




module.exports = mongoose.model('Solicitud de abogado', Solicitud_AboSchema);