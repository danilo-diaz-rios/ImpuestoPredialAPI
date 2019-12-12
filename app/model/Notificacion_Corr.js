// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;
// set up a mongoose model and pass it using module.exports
var Notificacion_CorrSchema = new Schema({

    Ciudad: {
        type: String

    },
    Fecha: {
        type: String

    },
    Nombre: {
        type: String

    },
    Referencia_Catas: {
        type: String


    },
    Direccion: {
        type: String


    },
    Propietario: {
        type: String


    },
    Auditory: {
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }

});

Notificacion_CorrSchema.plugin(mongoosePaginate);

Notificacion_CorrSchema.methods.addNotificacion_Corr = function(cb) {
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

Notificacion_CorrSchema.statics.findNotificacion_Corr = function(cb) {
    return this.model('Noticicacion de correo').find({}, cb);
};

Notificacion_CorrSchema.statics.deleteNotificacion_Corr = function(id, cb) {
    return this.model('Noticicacion de correo').findByIdAndRemove(id, cb);
};




module.exports = mongoose.model('Noticicacion de correo', Notificacion_CorrSchema);