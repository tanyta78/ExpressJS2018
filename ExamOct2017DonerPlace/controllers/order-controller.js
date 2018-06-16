const productApi = require('../api/product');
const orderApi = require('../api/order');


module.exports = {
	createGet: async (req, res) => {
		const id = req.params.id;
		const product = await productApi.getById(id);
		res.render('order/create', product);
	},
	createPost: async (req, res) => {
		const data = req.body;
		data.creator = req.user._id;
		try {
			await orderApi.create(data);
			return res.redirect('/');
		} catch (err) {
			console.log(err);
			return res.render('order/create', { globalError: err.message })
		}
	},
	status: async (req, res) => {
		try {
			const orders = await orderApi.getByUserId(req.user._id);
			
			res.render('order/status', { orders });
		} catch (err) {
			console.log(err);
			return res.render('/', { globalError: err.message })
		}

	},
	details: async (req, res) => {
		try {
			const order = await orderApi.getById(req.params.id);
			res.render('order/details',order);
		} catch (err) {
			console.log(err);
			return res.render('/', { globalError: err.message })
		}


	}
};