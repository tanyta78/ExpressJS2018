const path = require('path');
module.exports={
	development:{
		connectionString:'mongodb://localhost:27017/wikidb' ,
		rootPath: path.normalize(path.join(__dirname, '../')),
		port: process.env.PORT || 3000
	},
	production:{

	}
};