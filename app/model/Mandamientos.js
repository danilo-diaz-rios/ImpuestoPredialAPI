// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;
// set up a mongoose model and pass it using module.exports
var MandamientosSchema = new Schema({

    Mandamiento_de_pago_No: {
        type: String

    },
    Ciudad: {
        type: String

    },
    Expediente: {
        type: String

    },
    ReferenciaC: {
        type: String


    },
    Direccion: {
        type: String


    },
    Notificacion: {
        type: Schema.Types.ObjectId,
        ref: 'Mensajeria',
        required: true
    },
    Propietario: {
        type: String


    },
    Resolucion: {
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

MandamientosSchema.plugin(mongoosePaginate);

MandamientosSchema.methods.addMandamientos = function(cb) {
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

MandamientosSchema.statics.findMandamientos = function(cb) {
    return this.model('Mandamientos').find({}, cb);
};

MandamientosSchema.statics.deleteMandamientos = function(id, cb) {
    return this.model('Mandamientos').findByIdAndRemove(id, cb);
};




module.exports = mongoose.model('Mandamientos', MandamientosSchema);