const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
	app.get('/', controllers.home.index);
	// app.get('/about', restrictedPages.hasRole('Admin'), controllers.home.about);
	
	app.get('/users/register', controllers.user.registerGet);
	app.post('/users/register', controllers.user.registerPost);
	app.post('/users/logout', controllers.user.logout);
	app.get('/users/login', controllers.user.loginGet);
	app.post('/users/login', controllers.user.loginPost);

	app.get('/users/:id',controllers.user.getRentalHistory);

	app.get('/addCar',restrictedPages.hasRole('Admin'),controllers.admin.addCarView);
	app.post('/addCar',restrictedPages.hasRole('Admin'),controllers.admin.createCar);

	app.get('/editCar/:id',restrictedPages.hasRole('Admin'),controllers.admin.editCarView);
	app.post('/editCar/:id',restrictedPages.hasRole('Admin'),controllers.admin.editCar);

	app.get('/generate-fake-data',restrictedPages.hasRole('Admin'),controllers.admin.generateData);

	//app.get('/viewAll',controllers.car.viewAllCars);
	//with pagination
	app.get('/viewAll',controllers.car.viewAllCarsPerPage);

	app.get('/getDetails/:id',controllers.car.getDetails);

	app.post('/rentACar/:id',controllers.car.rent);

	app.get('/search',controllers.car.search);

	app.all('*', (req, res) => {
		res.status(404);
		res.send('404 Not Found');
		res.end();
	});
};