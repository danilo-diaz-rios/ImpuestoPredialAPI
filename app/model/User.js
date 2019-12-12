// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = 10;

// set up a mongoose model and pass it using module.exports
var UserSchema = new Schema({

    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },

    Identification: {
        type: String,
        required: true,
        unique: true
    },

    Email: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Auditory: {
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }

});

UserSchema.plugin(mongoosePaginate);

UserSchema.pre('save', function (next) {
    var user = this;


    // only hash the password if it has been modified (or is new)
    if (!user.isModified('Password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.Password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.Password = hash;
            next();
        });
    });
});


UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.Password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


UserSchema.methods.addUser = function (cb) {
    var date = new Date(Date.now());
    //Temporal solution for datetime offset
    Date.prototype.addHours = function (h) {
        this.setTime(this.getTime() + (h * 60 * 60 * 1000));
        return this;
    };

    this.Auditory.createdAt = date.addHours(-5);

    this.save((err, savedUser) => {
        if (err) return cb(err);
        var created = true;
        cb(null, created, savedUser);

    });
};

UserSchema.statics.changeUsersPassword = function (id, cb) {
    return this.model('User').findByIdAndUpdate(id, {
        new: false
    }, cb);
};

UserSchema.statics.deleteUser = function (id, cb) {
    return this.model('User').findByIdAndRemove(id, cb);
};


module.exports = mongoose.model('User', UserSchema);