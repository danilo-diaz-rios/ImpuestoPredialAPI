// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;
// set up a mongoose model and pass it using module.exports
var Respuesta_Archi_DeterSchema = new Schema({

    No_de_Oficio_EXT: {
        type: String

    },
    Nombre: {
        type: String


    },
    Asunto: {
        type: String


    },
    Firma_del_Responsable: {
        type: String


    },
    Auditory: {
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }

});

Respuesta_Archi_DeterSchema.plugin(mongoosePaginate);

Respuesta_Archi_DeterSchema.methods.addRespuesta_Archi_Deter = function(cb) {
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

Respuesta_Archi_DeterSchema.statics.findRespuesta_Archi_Deter = function(cb) {
    return this.model('Respuesta de archivo de determinacion').find({}, cb);
};

Respuesta_Archi_DeterSchema.statics.deleteRespuesta_Archi_Deter = function(id, cb) {
    return this.model('Respuesta de archivo de determinacion').findByIdAndRemove(id, cb);
};




module.exports = mongoose.model('Respuesta de archivo de determinacion', Respuesta_Archi_DeterSchema);