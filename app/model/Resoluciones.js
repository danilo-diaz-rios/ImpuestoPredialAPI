// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;
// set up a mongoose model and pass it using module.exports
var ResolucionesSchema = new Schema({

    Resoluciones_No: {
        type: String

    },
    No_Expediente: {
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
    Nombres: {
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

ResolucionesSchema.plugin(mongoosePaginate);

ResolucionesSchema.methods.addResoluciones = function(cb) {
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

ResolucionesSchema.statics.findResoluciones = function(cb) {
    return this.model('Resoluciones').find({}, cb);
};

ResolucionesSchema.statics.deleteResoluciones = function(id, cb) {
    return this.model('Resoluciones').findByIdAndRemove(id, cb);
};




module.exports = mongoose.model('Resoluciones', ResolucionesSchema);