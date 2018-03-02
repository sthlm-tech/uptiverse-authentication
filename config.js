module.exports = {
	enableSecurity: false,
	port: 5002,
	cacheEnabled: false,
	cacheDuration: 3600000,
	db_connectionString: process.env.MONGODB_URI || "",
	auth: {
		jwt: {
			secret: process.env.JWT_SECRET || 'React Starter Kit'
		},
	  google: {
	    id: process.env.GOOGLE_CLIENT_ID || '',
	    secret: process.env.GOOGLE_CLIENT_SECRET || '',
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
