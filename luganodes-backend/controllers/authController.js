const users = require("../models/userAuth");
const bcrypt = require("bcrypt")
const config = require("../config");
const jwt = require("jsonwebtoken")

exports.signup = (req, res) => {

    let result = {};
    let status = 201;
    const { username, password } = req.body;
    const user = new users({ username: username, password: password });

    user.save((err, user) => {
        if (!err) {
            result.status = status;
            result.message = "Your signup was successful. Go to Login Page";
        } else {
            status = 500;
            result.status = status;
            result.message = err;
        }
        res.status(status).send(result);
    });
}



exports.signin = (req, res) => {

    let result = {};
    let status = 200;
    const username = req.body.username;
    const password = req.body.password;
    console.log(password);
    users.findOne({ username }, (err, user) => {
        if (!err && user) {
            bcrypt.compare(password, user.password).then(match => {
                if (match) {
                    status = 200;
                    const payload = { userid: user.username };
                    const options = { expiresIn: "20d" };
                    const secret = config.secret;
                    console.log(secret);
                    var token = jwt.sign(payload, secret, options);
                    result.status = status;
                    result.message = "You have successfully logged in. You will be redirected to your user-page";
                    result.token = token;
                    result.username = user.username;
                }
                else {
                    status = 401;
                    result.status = status;
                    result.errorMessage = "Passwords didn't match";
                }
                res.status(status).send(result);
            }).catch(err => {
                console.log("here " + user.password);
                status = 500;
                result.status = status;
                result.error = err;
                console.log(err.message);
                res.status(status).send(result);
            });
        }
        else {
            status = 404;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
        }
    })
}

