var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth2");

var config = require("./../config.js").auth;


passport.use(new GoogleStrategy({
  clientID: config.google.id,
  clientSecret: config.google.secret,
  callbackURL: '/authentication/login/google/return',
  profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  const loginName = 'google';
  const claimType = 'urn:google:access_token';
  const fooBar = async () => {
    if( !profile.email || (profile.email && !profile.email.endsWith('@uptive.se'))){
      done(null);
    }
    else {

      var username = profile.email.split("@")[0];

      if (req.user) {
        done(null, {
          id: req.user.id,
          email: profile.email,
          username: username,
          name: {
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
          },
          profile: profile
        });
      }
      else{
        done(null, {
          id: profile.id,
          email: profile.email,
          username: username,
          name: {
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
          },
          profile: profile
        });
      }
    }
  };


  fooBar().catch(done);
}));

module.exports = passport;
