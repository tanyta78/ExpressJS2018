const productApi = require('../api/product')

module.exports = {
	index: async (req, res) => {
		const products = await productApi.getAll();
		const admin =req.user && req.user.roles.includes('Admin');
		res.render('home/index',{products, admin});
	}
};