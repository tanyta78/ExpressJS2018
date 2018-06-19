const controllers = require('../controllers');
const auth = require('./auth');

module.exports = (app) => {
	app.get('/', controllers.home.index);
	app.get('/index', controllers.home.index);

	app.get('/article/create', auth.isAuthenticated, controllers.article.createGet);
	app.post('/article/create', auth.isAuthenticated, controllers.article.createPost);

	app.get('/article/all', controllers.article.allGet);
	app.get('/article/details/:id', controllers.article.detailsGet);
	app.get('/article/history/:id', controllers.article.historyGet);
	app.get('/article/last',controllers.article.lastGet);

	app.get('/article/edit/:id',auth.isAuthenticated,controllers.article.editGet);
	app.post('/article/edit/:id',auth.isAuthenticated,controllers.article.editPost);

	app.get('/article/lock/:id',auth.isInRole('Admin'),controllers.article.lockGet);
	app.get('/article/unlock/:id',auth.isInRole('Admin'),controllers.article.unlockGet);

	app.get('/user/register', controllers.user.registerGet);
	app.post('/user/register', controllers.user.registerPost);

	app.get('/user/login', controllers.user.loginGet);
	app.post('/user/login', controllers.user.loginPost);

	app.get('/user/logout', controllers.user.logout);

	app.post('/article/search',controllers.article.search);

	app.all('*', (req, res) => {
		res.status(404);
		res.send('404 Not Found');
		res.end();
	});
};