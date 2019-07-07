import PassportJwt from 'passport-jwt';
import mongoose from 'mongoose';
import { config } from 'dotenv';

const JwtStrategy = PassportJwt.Strategy;
const ExtarctJwt = PassportJwt.ExtractJwt;
const User = mongoose.model('users');
config();

const opts = {};
opts.jwtFromRequest = ExtarctJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

export default function passportConfig(passport) {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
}
