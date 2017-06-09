var App = require("ms-core");
var passport = require("./passport");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var auth = require("./../config.js").auth;
const baseUrl = "/authentication";

var sessionData = { secret: 'secret session key', cookie: { maxAge: 60000 }};

module.exports = function() {
		App.Express.use(cookieParser());
		App.Express.use(passport.initialize());
		App.Express.use(session(sessionData));

		App.Express.use(baseUrl + '/login/google', function(req, res, next){
			const returnUrl = req.query.url;
			if(returnUrl){
				req.session.returnUrl = returnUrl;
			}
			next();
		});

		App.Express.get(baseUrl + '/login/google',
			passport.authenticate('google', { scope: ['email profile'], session: false })
		);

		App.Express.get(baseUrl + '/login/google/return',
		  passport.authenticate('google', { failureRedirect: '/', session: false }),
		  (req, res) => {
				const returnUrl = req.session.returnUrl || "/";
		    const expiresIn = 60 * 60 * 24 * 180; // 180 days
		    const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
		    res.cookie('id_token', token, { domain:'herokuapp.com', maxAge: 1000 * expiresIn, httpOnly: true });
		    res.redirect(returnUrl);
		  }
		);

};
