const User = require('../models/user.model');

async function getUserByUsername(userName) {
    let user = await User.findOne({ username: userName, isDeleted: false}, function(err, user) {
        if (err) return err;
        return user;
    });

    return user;
};

async function addUser(user) {
    return await User.create({
        username: user.username,
        password: user.password,
        isDeleted: user.isDeleted,
        name: user.name,
        emai: user.email
    }, (err, nuser) => {
        if(err) return err;
        return nuser;
    });
};

