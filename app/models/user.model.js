var mongoose = require('mongoose');
const bcrypt = require('bcrypt')

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    isDeleted: Boolean,
    name: String,
    email: String
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.CompareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);