const Car = require('mongoose').model('Car');
const faker = require('faker');

module.exports = {
	addCarView: (req, res) => {
		res.render('admin/addCar');

	},
	createCar: (req, res) => {
		let carData = req.body;
		console.log(carData);
		if (!carData.carBrand || !carData.carModel || !carData.carYear || !carData.carPoster) {
			res.locals.globalError = 'Invalid car data. Please fill all fields.';
			res.render('admin/addCar', carData);
		}
		carData.dateOfCreation = Date.now();

		Car.create(carData).then(() => {
			res.redirect('/');
		});

	},
	generateData: (req, res, next) => {
		for (let i = 0; i < 30; i++) {
			var car = new Car();

			car.carBrand = faker.company.companyName();
			car.carModel = faker.commerce.productName();
			car.carYear = faker.date.between('2000-01-01', '2018-01-01').getFullYear();
			car.carPoster = faker.image.transport();
			car.price = faker.commerce.price();
			car.dateOfCreation = faker.date.between('2018-04-01', '2018-08-01');

			car.save(function (err) {
				if (err) throw err;
			});
		}
		res.redirect('/addCar');
	},
	editCarView: (req, res) => {
		let carId=req.params.id;
		console.log('CarId '+carId);
		
		Car.findById(carId).then((car) => {
			console.log('founded car'+car);
			
			res.render('admin/editCar', car);
		});

	},
	editCar: (req, res) => {
		let carData = req.body;
		console.log('car data for edited car '+ carData);
		if (!carData.carBrand || !carData.carModel || !carData.carYear || !carData.carPoster) {
			res.locals.globalError = 'Invalid car data. Please fill all fields.';
			res.render('admin/editCar', carData);
		}

		carData.dateOfCreation = Date.now();

		Car.create(carData).then(() => {
			res.redirect('/');
		});

	},
};