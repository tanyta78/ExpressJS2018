const express = require('express');

const port = 2323;

const app = express();

require('./config/dbConfig')
	.then(() => {
		app.listen(port,()=>	console.log('Im listening on ' + port));
	})
	.catch(() => {
		console.log('Failed to load DB');
	});
