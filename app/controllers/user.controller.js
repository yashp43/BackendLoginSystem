const express = require('express');
const userService = require('../services/user.service');
const router = express.Router();
const authorize = require('../_helper/authorize');
const User = require('../models/user.model');

router.post('/signup', addUser);

async function addUser(req, res, next) {
    try{
        const { body } = req;
        const { password } = body;
        let { username, email, name } = body;
        if(!email) {
            return res.send({
                success: false,
                message: 'Error, email cannot be blank'
            });
        }

        if(!password) {
            return res.send({
                success: false,
                message: 'Error, password cannot be blank'
            });
        }

        if(username) {
            let temp = await userService.getUserByUsername(username);
            if(temp) return res.status(400).send('User already Exist');
        } else {
            return res.send({
                success: false,
                message: 'Error, Username cannot be blank'
            });
        }

        let newUser = new User();
        newUser = {
            username,
            password,
            isDeleted: false,
            name,
            email
        };
        newUser.password = User.generateHash(password);
        let addUser = await userService.addUser(newUser);
        return res.status(200).json(addUser);
    } catch(err) {
        console.log(err);
    }
};
