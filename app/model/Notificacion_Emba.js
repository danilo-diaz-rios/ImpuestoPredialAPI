// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;
// set up a mongoose model and pass it using module.exports
var Notificacion_EmbaSchema = new Schema({

    Expediente: {
        type: String

    },
    Resolucion_No: {
        type: String

    },
    Nombre: {
        type: String

    },
    Matricula: {
        type: String


    },
    Referencia: {
        type: String


    },
    Auditory: {
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }

});

Notificacion_EmbaSchema.plugin(mongoosePaginate);

Notificacion_EmbaSchema.methods.addNotificacion_Emba = function(cb) {
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

Notificacion_EmbaSchema.statics.findNotificacion_Emba = function(cb) {
    return this.model('Noticicacion').find({}, cb);
};

Notificacion_EmbaSchema.statics.deleteNotificacion_Emba = function(id, cb) {
    return this.model('Noticicacion').findByIdAndRemove(id, cb);
};




module.exports = mongoose.model('Noticicacion', Notificacion_EmbaSchema);