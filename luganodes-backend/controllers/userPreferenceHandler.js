const config = require("../config");
const userData = require("../models/userData");
const jwt = require("./jsonwebtoken")



exports.setPreferences = (req, res) => {
    let result = {}
    let status = 200
    var token = req.headers.authorization
    var auth = token.split(" ")[1]
    const coin = req.body.coin
    const upper = req.body.upper
    const lower = req.body.lower

    jwt.verify(auth, config.secret, (err, decoded) => {
        const username = decoded.username
        userData.findOne({ username: username }, (err, prefs) => {
            if (prefs) {
                const pref = { coin: coin, upper: upper, lower: lower }
                prefs.update({ username: username }, { $push: { preferences: pref } }, (error) => {
                    // fill error
                })
                result = pref
                res.status(status).send(result)
            }
            else {
                const pref = [{ coin: coin, upper: upper, lower: lower }]
                const userDataObj = new userData({ username: username, preferences: pref })
                userDataObj.save((err, prefs) => {
                    if (!err) {
                        result.status = status;
                        result.result = list;
                    }
                    else {
                        result.status = 500;
                        result.error = err;
                    }
                    res.status(status).send(result);
                })
            }
        })
    })

}