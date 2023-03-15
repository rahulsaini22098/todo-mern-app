const db = require("../models");
const User = db.users;
const UserPermission = db.userpermissions;
const express = require("express");
const router = express.Router();

const jsonwebtoken = require("jsonwebtoken");
const JWT_SECRET = "goK!pusp6ThEsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";


router.post("/", async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
                password: req.body.password,
            },
            // include: [{
            //     model: db.userpermissions,
            //     as: 'userpermission'
            // }]
        });



        console.log('user - ', user.id);

        if (!user) {
            res.status(400).send({message: 'Invalid User'});
        }

        const permission = await UserPermission.findOne({
            where: {
                userid: user.id,
            },
        });

        console.log('permission - ', permission);

        console.log('email - ', user.email);
        console.log('admin - ', permission.isadmin);
        console.log('acl - ', permission.taskacl);

        const token = jsonwebtoken.sign({
            email: user.email,
            isAdmin: permission.isadmin,
            taskACL: permission.taskacl,
        }, JWT_SECRET);


        res.send({token});
    } catch (error) {
        console.log(error)
        res.send(error);
    }
});

module.exports = router;