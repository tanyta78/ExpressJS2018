const Product = require('../models/Product');

module.exports.index = (req, res) => {
	let queryData = req.query;


	// to show product withoth buyers!!! use {buyer:undefined}
	Product.find().populate('category').then((products) => {
		if (queryData.query) {
			products = products.filter(p => p.name.toLowerCase().includes(queryData.query));
		}

		let data = {products:products};

		if(req.query.error){
			data.error = req.query.error;
		}else if(req.query.success){
			data.success=req.query.success;
		}

		res.render('home/index', data);
	});
};