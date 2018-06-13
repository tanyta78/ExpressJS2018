const http = require('http');
const port = 3000;
const handlers=require('./handlers');

let env = process.env.NODE_ENV || 'development';
const config = require('./config/config');
const database = require('./config/database.config');

database(config[env]);

http.createServer((req, res) => {
	for(let handler of handlers){
		if(!handler(req,res)){
			break;
		}
	}
}).listen(port);