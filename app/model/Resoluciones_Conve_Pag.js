// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;
// set up a mongoose model and pass it using module.exports
var Resoluciones_Conve_PagSchema = new Schema({

    Resolucion_No: {
        type: String

    },
    No_de_Convenio: {
        type: String

    },
    Referencia: {
        type: String


    },
    Nombre: {
        type: String


    },
    Valor: {
        type: String


    },
    Fecha: {
        type: String


    },
    No_de_Cuotas: {
        type: String


    },
    Auditory: {
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }

});

Resoluciones_Conve_PagSchema.plugin(mongoosePaginate);

Resoluciones_Conve_PagSchema.methods.addResoluciones_Conve_Pag = function(cb) {
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

Resoluciones_Conve_PagSchema.statics.findResoluciones_Conve_Pag = function(cb) {
    return this.model('Resoluciones convenio de pago').find({}, cb);
};

Resoluciones_Conve_PagSchema.statics.deleteResoluciones_Conve_Pag = function(id, cb) {
    return this.model('Resoluciones convenio de pago').findByIdAndRemove(id, cb);
};




module.exports = mongoose.model('Resoluciones convenio de pago', Resoluciones_Conve_PagSchema);