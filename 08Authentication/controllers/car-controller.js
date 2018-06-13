const Car = require('mongoose').model('Car');
const User = require('mongoose').model('User');
const RentalInfo = require('mongoose').model('RentalInfo');

module.exports = {
	viewAllCars: (req, res) => {
		Car.find({})
			.sort('-dateOfCreation')
			.then(cars => {
				console.log('All cars' + cars);

				res.render('cars/viewAll', { cars });
			});

	},
	viewAllCarsPerPage: (req, res, next) => {
		let perPage = 10;
		let current = Number(req.query.page) || 1;

		let prevPage = current - 1;
		let nextPage = current + 1;

		Car
			.find({})
			.where('rented')
			.equals(false)
			.sort('-dateOfCreation')
			.skip((perPage * current) - perPage)
			.limit(perPage)
			.then(data => {
				if (prevPage < 0) prevPage = 0;

				Car.count().then(count => {
					let style = (count - current * perPage) < perPage ? 'disabled' : '';

					let page = {
						prevPage,
						nextPage,
						style
					};
					res.render('cars/viewAllPerPage', {
						cars: data,
						page
					});
				});
			})
			.catch(err => next(err));
	},
	getDetails: (req, res, next) => {
		if (!req.user) {
			res.redirect('/users/login');
			return;
		}
		let carId = req.params.id;

		Car.findById(carId).then(foundedCar => {
			res.render('cars/details', foundedCar);
		});
	},
	rent: (req, res) => {
		let userId = req.user.id;
		let carId = req.params.id;

		Car.findById(carId).then(foundedCar => {
			foundedCar.rented = true;
			foundedCar.save().then(() => {
				let rentalObj = {
					car: carId,
					renter: userId,
					rentalDate: req.body.rentalDate,
					days: req.body.days
				};

				RentalInfo.create(rentalObj).then(() => {
					res.redirect('/');
				});

			}).catch(err => console.log(err));
		}).catch(err => console.log(err));


	},
	search: (req, res) => {

		let filters = req.query;
	
		//TO DO pagination for search results 
		let searchedCriteria = {};
		if (filters.carBrand && filters.carBrand !== undefined) searchedCriteria.carBrand = filters.carBrand;
		if (filters.carModel && filters.carModel !== undefined) searchedCriteria.carModel = filters.carModel;
		if (filters.carYear && filters.carYear !== undefined) searchedCriteria.carYear = filters.carYear;
		let minPrice = filters.minPrice === undefined ? 0 : Number(filters.minPrice);
		let maxPrice = filters.maxPrice === undefined ? 1000000 : Number(filters.maxPrice);
		searchedCriteria.price = { $gt: minPrice, $lt: maxPrice };
		if (filters.carId !== undefined) searchedCriteria.id = filters.carId;
		if(filters.rented !== undefined) searchedCriteria.rented=filters.rented;
		console.log(searchedCriteria);
		console.log(searchedCriteria.price);

		Car.find({})
			.where('carBrand').equals(`${searchedCriteria.carBrand}`)
			.where('carModel').equals(`${searchedCriteria.carModel}`)
			.where('carYear').equals(`${searchedCriteria.carYear}`)
			.where('price').lt(maxPrice).gt(minPrice)
			.then((result) => {
				console.log(result);

				res.render('cars/searchResult', {result});
			});

	}
};