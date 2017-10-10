module.exports = {
	enableSecurity: false,
	port: 5000,
	cacheEnabled: false,
	cacheDuration: 3600000,
	db_connectionString: 'mongodb://user-service-user:user-service-user@ds015636.mlab.com:15636/heroku_q9zz0x8s',
	auth: {
		jwt: {
			secret: process.env.JWT_SECRET || 'React Starter Kit'
		},
	  google: {
	    id: process.env.GOOGLE_CLIENT_ID || '13824586724-fhh3e76je16ce10gvk9ucb66eu2oig8p.apps.googleusercontent.com',
	    secret: process.env.GOOGLE_CLIENT_SECRET || 'lJlqp7HNvrSMJJbkzGLk43Aa',
	  }
	},
	communicator:{
		path: process.env.COMMUNICATOR_PATH || "",
		token: process.env.COMMUNICATOR_TOKEN || ""
	},
	service: {
		name: "uptiverse-authentication",
		host: process.env.SERVICE_URL || ""
	},
	pulse: {
		shouldRegister: true,
		path:"/api/pulse"
	}
};
