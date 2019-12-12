// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;
// set up a mongoose model and pass it using module.exports
var Resoluciones_VigenSchema = new Schema({

    Resoluciones_No: {
        type: String

    },
    Nombre: {
        type: String

    },
    Referencia: {
        type: String

    },
    Matricula: {
        type: String


    },
    Direccion: {
        type: String


    },
    Valor: {
        type: String


    },
    Auditory: {
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }

});

Resoluciones_VigenSchema.plugin(mongoosePaginate);

Resoluciones_VigenSchema.methods.addResoluciones_Vigen = function(cb) {
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

Resoluciones_VigenSchema.statics.findResoluciones_Vigen = function(cb) {
    return this.model('Resoluciones Vigencia').find({}, cb);
};

Resoluciones_VigenSchema.statics.deleteResoluciones_Vigen = function(id, cb) {
    return this.model('Resoluciones Vigencia').findByIdAndRemove(id, cb);
};




module.exports = mongoose.model('ResolucionesVigen', Resoluciones_VigenSchema);