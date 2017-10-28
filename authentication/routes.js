var App = require("ms-core");
var url = require('url');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var passport = require("./passport");
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
				const domain = parseDomain(returnUrl);
		    const expiresIn = 60 * 60 * 24 * 180; // 180 days
		    const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
		    res.cookie('id_token', token, {domain: domain, maxAge: 1000 * expiresIn, httpOnly: true });
		    res.redirect(returnUrl);

				App.Communicator.sendMessage(
					"USER_LOGIN",
					"DATA_SYNC",
					{ "data": req.user }
				);
		  }
		);

		App.Express.get(baseUrl + '/logout',
		  function(req, res, next){
				var returnUrl = req.query.url || req.hostname || "/";
				res.clearCookie('id_token');
		    res.redirect(returnUrl);
		    return;
		  }
		);

		App.Express.get(baseUrl + '/validation/user',
			expressJwt({
				secret: auth.jwt.secret,
				credentialsRequired: true,
				getToken: function(req){
					return req.cookies.id_token || null;
				}
			}),
			function(req, res, next){
				const user = req.user || null;
				res.send(user);
			}
		);
};

function parseDomain(urlToParse){
	var hostname = url.parse(urlToParse).hostname;
	var separate = hostname.split('.');
	separate.shift();
	var currentdomain = separate.join('.');
	return currentdomain;
}
