'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var authService = require('./../services/authenticationService');

module.exports = function (passport) {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "Passphrase for encryption should be 45-50 char long"
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        console.log("jwt_payload is ", jwt_payload);
        var payload = {
                email: jwt_payload.email
            }
        authService.findUser(payload)
        .then( results => {
            if (results != null) 
            callback(null, results);
        })
        .catch( err => {
            callback(err, false);
        })
    }));
};