const passport = require('passport');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

// set up options for jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

console.log(JwtStrategy);

// create jwt strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    // see if user ID in payload exists in DB
    User.findById(payload.sub, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

// tell passport to use this strategy
passport.use(jwtLogin);